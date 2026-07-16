import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnvFile() {
  const envPath = resolve(root, '.env')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

loadEnvFile()

const mode = process.argv.includes('--production') ? 'production' : 'local'
const errors = []
const warnings = []

function requireVar(name, { placeholder = false } = {}) {
  const value = process.env[name]?.trim()
  if (!value) {
    errors.push(`❌ ${name} — obrigatório`)
    return
  }
  if (placeholder && value.includes('placeholder')) {
    errors.push(`❌ ${name} — ainda está com valor placeholder`)
  }
}

function warnIfMissing(name, hint) {
  const value = process.env[name]?.trim()
  if (!value) {
    warnings.push(`⚠️  ${name} — ${hint}`)
  }
}

function warnIfPlaceholder(name) {
  const value = process.env[name]?.trim()
  if (!value || value.includes('placeholder')) {
    warnings.push(`⚠️  ${name} — notificações por e-mail desativadas`)
  }
}

requireVar('DATABASE_URL')
requireVar('AUTH_SECRET')
requireVar('NEXTAUTH_SECRET')
requireVar('ENCRYPTION_MASTER_KEY')

if (mode === 'production') {
  requireVar('NEXTAUTH_URL')
  requireVar('CRON_SECRET')
  requireVar('NEXT_PUBLIC_SUPABASE_URL')
  requireVar('SUPABASE_SERVICE_ROLE_KEY')
  requireVar('PLATFORM_OWNER_EMAILS')

  const url = process.env.NEXTAUTH_URL ?? ''
  if (url.includes('localhost')) {
    errors.push('❌ NEXTAUTH_URL — use a URL pública HTTPS em produção')
  }

  if (process.env.BILLING_ENABLED === 'true') {
    warnings.push('⚠️  BILLING_ENABLED=true — cobrança ligada sem gateway configurado')
  }

  warnIfPlaceholder('RESEND_API_KEY')
  warnIfMissing('VAPID_PUBLIC_KEY', 'push PWA desativado')
  warnIfMissing('VAPID_PRIVATE_KEY', 'push PWA desativado')
  warnIfMissing('VAPID_SUBJECT', 'push PWA desativado')
  warnIfMissing('NEXT_PUBLIC_SENTRY_DSN', 'monitoramento de erros desativado')
} else {
  warnIfMissing('NEXTAUTH_URL', 'padrão localhost:3000')
  warnIfPlaceholder('RESEND_API_KEY')
}

console.log(`\nValidação de ambiente (${mode})\n`)

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ Variáveis essenciais OK\n')
  process.exit(0)
}

for (const item of errors) console.log(item)
for (const item of warnings) console.log(item)
console.log('')

if (errors.length > 0) {
  console.log(`Falhou com ${errors.length} erro(s).\n`)
  process.exit(1)
}

console.log('Avisos apenas — pode continuar para beta.\n')
