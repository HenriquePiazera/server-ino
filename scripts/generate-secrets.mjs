import { randomBytes } from 'node:crypto'
import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env')
const examplePath = resolve(__dirname, '..', '.env.example')

const authSecret = randomBytes(32).toString('base64')
const encryptionKey = randomBytes(32).toString('base64')
const cronSecret = randomBytes(32).toString('hex')

const template = readFileSync(examplePath, 'utf8')
  .replace(/generate-with-openssl-rand-base64-32/g, authSecret)
  .replace(/generate-with-openssl-rand-hex-32/g, cronSecret)
  .replace(
    /ENCRYPTION_MASTER_KEY="[^"]*"/,
    `ENCRYPTION_MASTER_KEY="${encryptionKey}"`
  )

if (!existsSync(envPath)) {
  writeFileSync(envPath, template, 'utf8')
  console.log('.env criado com secrets gerados.')
} else {
  console.log('.env já existe — secrets não alterados.')
}

console.log('Consulte docs/DEPLOY_META_A.md para deploy em produção.')
