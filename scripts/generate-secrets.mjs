import { randomBytes } from 'node:crypto'
import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env')
const examplePath = resolve(__dirname, '..', '.env.example')

const authSecret = randomBytes(32).toString('base64')
const encryptionKey = randomBytes(32).toString('base64')

const template = `# Supabase PostgreSQL
# Substitua pela connection string do Supabase (docs/SETUP_SUPABASE.md)
DATABASE_URL="postgresql://postgres:password@localhost:5432/agenda_multipro"

# Auth.js / NextAuth
AUTH_SECRET="${authSecret}"
NEXTAUTH_SECRET="${authSecret}"
NEXTAUTH_URL="http://localhost:3000"

# Criptografia (envelope encryption — KEK global)
ENCRYPTION_MASTER_KEY="${encryptionKey}"

# E-mail (Resend) — placeholder para V2
RESEND_API_KEY="re_placeholder_not_used_in_v1"

# Supabase Storage (Fase 7)
NEXT_PUBLIC_SUPABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=""

# Sentry (opcional)
NEXT_PUBLIC_SENTRY_DSN=""
SENTRY_ORG=""
SENTRY_PROJECT=""
SENTRY_AUTH_TOKEN=""
`

if (!existsSync(envPath)) {
  writeFileSync(envPath, template, 'utf8')
  console.log('.env criado com secrets gerados.')
} else {
  const current = readFileSync(envPath, 'utf8')
  let updated = current

  if (current.includes('dev-only-encryption-key')) {
    updated = updated.replace(
      /ENCRYPTION_MASTER_KEY="[^"]*"/,
      `ENCRYPTION_MASTER_KEY="${encryptionKey}"`
    )
  }
  if (current.includes('dev-only-secret-replace')) {
    updated = updated.replace(
      /AUTH_SECRET="[^"]*"/,
      `AUTH_SECRET="${authSecret}"`
    )
    updated = updated.replace(
      /NEXTAUTH_SECRET="[^"]*"/,
      `NEXTAUTH_SECRET="${authSecret}"`
    )
  }

  if (updated !== current) {
    writeFileSync(envPath, updated, 'utf8')
    console.log('.env atualizado com secrets válidos.')
  } else {
    console.log('.env já existe — secrets não alterados.')
  }
}

writeFileSync(examplePath, template.replace(authSecret, 'generate-with-openssl-rand-base64-32').replace(encryptionKey, 'generate-with-openssl-rand-base64-32'), 'utf8')
console.log('Consulte docs/SETUP_SUPABASE.md para configurar DATABASE_URL.')
