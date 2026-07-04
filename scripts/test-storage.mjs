import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Faltam NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no .env')
  process.exit(1)
}

const supabase = createClient(url, key)

const { data: buckets, error: listError } = await supabase.storage.listBuckets()

if (listError) {
  console.error('Erro ao listar buckets:', listError.message)
  process.exit(1)
}

const attachments = buckets?.find((b) => b.name === 'attachments')

if (!attachments) {
  console.error('Bucket "attachments" não encontrado. Buckets existentes:', buckets?.map((b) => b.name).join(', ') || '(nenhum)')
  process.exit(1)
}

console.log('Storage OK — bucket "attachments" encontrado (público:', attachments.public, ')')

const testPath = `_test/connection-check-${Date.now()}.txt`
const { error: uploadError } = await supabase.storage
  .from('attachments')
  .upload(testPath, Buffer.from('ok'), { contentType: 'text/plain', upsert: false })

if (uploadError) {
  console.error('Erro no upload de teste:', uploadError.message)
  process.exit(1)
}

await supabase.storage.from('attachments').remove([testPath])
console.log('Upload e delete de teste OK.')
