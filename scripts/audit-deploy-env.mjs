import fs from 'node:fs'

const keys = [
  { key: 'DATABASE_URL', required: true },
  { key: 'AUTH_SECRET', required: true },
  { key: 'NEXTAUTH_SECRET', required: true },
  { key: 'NEXTAUTH_URL', required: true, prodHint: 'HTTPS público' },
  { key: 'ENCRYPTION_MASTER_KEY', required: true, sensitive: true },
  { key: 'BILLING_ENABLED', required: true },
  { key: 'CRON_SECRET', required: true, prodOnly: true },
  { key: 'NEXT_PUBLIC_SUPABASE_URL', required: true, prodOnly: true },
  { key: 'SUPABASE_SERVICE_ROLE_KEY', required: true, prodOnly: true },
  { key: 'PLATFORM_OWNER_EMAILS', required: true, prodOnly: true },
  { key: 'RESEND_API_KEY', required: false, label: 'Recomendado' },
  { key: 'RESEND_FROM_EMAIL', required: false, label: 'Recomendado' },
  { key: 'VAPID_PUBLIC_KEY', required: false, label: 'Push' },
  { key: 'VAPID_PRIVATE_KEY', required: false, label: 'Push' },
  { key: 'VAPID_SUBJECT', required: false, label: 'Push' },
  { key: 'BETA_ALLOWED_EMAILS', required: false, label: 'Opcional' },
  { key: 'NEXT_PUBLIC_SENTRY_DSN', required: false, label: 'Opcional' },
]

const raw = fs.readFileSync('.env', 'utf8')
const env = {}
for (const line of raw.split(/\r?\n/)) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eq = trimmed.indexOf('=')
  if (eq <= 0) continue
  const key = trimmed.slice(0, eq).trim()
  let value = trimmed.slice(eq + 1).trim()
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  }
  env[key] = value
}

function status(key) {
  const value = env[key]
  if (!value) return 'VAZIO'
  if (/placeholder|generate-with|\[PASSWORD\]|\[PROJECT_REF\]/i.test(value)) return 'PLACEHOLDER'
  if (key === 'NEXTAUTH_URL' && value.includes('localhost')) return 'LOCALHOST'
  return 'OK'
}

console.log('=== Auditoria .env (sem expor valores) ===\n')

const missingProd = []
const warnings = []
const ready = []

for (const item of keys) {
  const s = status(item.key)
  const tag = item.label ?? (item.required ? 'Obrigatório' : 'Opcional')
  console.log(`${item.key}: ${s} [${tag}]`)

  if (s === 'VAZIO' || s === 'PLACEHOLDER') {
    if (item.required || item.prodOnly) missingProd.push(item.key)
  } else if (s === 'LOCALHOST' && item.key === 'NEXTAUTH_URL') {
    warnings.push('NEXTAUTH_URL ainda é localhost — trocar na Vercel')
  } else if (s === 'OK') {
    ready.push(item.key)
  }
}

const pushOk = ['VAPID_PUBLIC_KEY', 'VAPID_PRIVATE_KEY', 'VAPID_SUBJECT'].every(
  (k) => status(k) === 'OK'
)
const resendOk = status('RESEND_API_KEY') === 'OK'

console.log('\n=== Resumo deploy ===')
console.log(`Prontas localmente: ${ready.length}/${keys.length} variáveis`)
console.log(`Resend: ${resendOk ? 'OK' : 'falta ou placeholder'}`)
console.log(`Push VAPID: ${pushOk ? 'OK' : 'incompleto'}`)
console.log(`CRON_SECRET: ${status('CRON_SECRET') === 'OK' ? 'OK' : 'FALTA — lembretes automáticos'}`)

if (missingProd.length) {
  console.log('\n⚠ Configurar na Vercel (Production):')
  for (const k of [...new Set(missingProd)]) console.log(`  - ${k}`)
}
if (warnings.length) {
  console.log('\n⚠ Ajustes para produção:')
  for (const w of warnings) console.log(`  - ${w}`)
}
