import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'
import { ERROR_CODES } from '@/lib/error-codes'

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const MAX_FILE_SIZE = 10 * 1024 * 1024

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Supabase não configurado.')
  }

  return createClient(url, key)
}

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return ERROR_CODES.INVALID_FILE
  }
  if (file.size > MAX_FILE_SIZE) {
    return ERROR_CODES.FILE_TOO_LARGE
  }
  return null
}

export async function uploadToStorage(
  userId: string,
  clientId: string,
  file: File
): Promise<{ path: string }> {
  const validationError = validateFile(file)
  if (validationError) {
    throw new Error(validationError)
  }

  const supabase = getSupabaseAdmin()
  const ext = file.name.split('.').pop() ?? 'bin'
  const path = `${userId}/${clientId}/${Date.now()}-${randomUUID()}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())
  const { error } = await supabase.storage
    .from('attachments')
    .upload(path, buffer, { contentType: file.type, upsert: false })

  if (error) {
    throw new Error(ERROR_CODES.UPLOAD_ERROR)
  }

  return { path }
}

export async function deleteFromStorage(path: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  await supabase.storage.from('attachments').remove([path])
}
