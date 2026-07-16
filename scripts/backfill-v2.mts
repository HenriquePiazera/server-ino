import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { randomBytes } from 'crypto'

function slugifyName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}

function generatePublicSlug(name: string): string {
  const base = slugifyName(name) || 'profissional'
  const suffix = randomBytes(3).toString('hex')
  return `${base}-${suffix}`
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const users = await prisma.user.findMany({
    where: { public_slug: null },
    select: { id: true, name: true },
  })

  for (const user of users) {
    let slug = generatePublicSlug(user.name)
    let attempts = 0
    while (attempts < 5) {
      const exists = await prisma.user.findFirst({
        where: { public_slug: slug },
      })
      if (!exists) break
      slug = generatePublicSlug(user.name)
      attempts++
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { public_slug: slug },
    })
    console.log(`Backfilled slug for ${user.id}: ${slug}`)
  }

  const teamMembers = await prisma.teamMember.findMany()
  for (const tm of teamMembers) {
    if (tm.status === ('pending' as never)) {
      await prisma.teamMember.update({
        where: { id: tm.id },
        data: { status: 'invited' },
      })
    }
  }

  console.log('V2 backfill complete.')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
