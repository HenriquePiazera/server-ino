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

const SERVICE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SERVICE_PHOTO_SIZE = 5 * 1024 * 1024

export function validateServicePhoto(file: File): string | null {
  if (!SERVICE_IMAGE_TYPES.includes(file.type)) {
    return ERROR_CODES.INVALID_FILE
  }
  if (file.size > MAX_SERVICE_PHOTO_SIZE) {
    return ERROR_CODES.FILE_TOO_LARGE
  }
  return null
}

export async function uploadServicePhoto(
  userId: string,
  serviceId: string,
  file: File
): Promise<{ path: string }> {
  const validationError = validateServicePhoto(file)
  if (validationError) {
    throw new Error(validationError)
  }

  const supabase = getSupabaseAdmin()
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `service-photos/${userId}/${serviceId}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())
  const { error } = await supabase.storage
    .from('attachments')
    .upload(path, buffer, { contentType: file.type, upsert: true })

  if (error) {
    throw new Error(ERROR_CODES.UPLOAD_ERROR)
  }

  return { path }
}

export async function getServicePhotoFromStorage(path: string): Promise<{
  buffer: Buffer
  contentType: string
} | null> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.storage.from('attachments').download(path)
  if (error || !data) return null

  const buffer = Buffer.from(await data.arrayBuffer())
  const ext = path.split('.').pop()?.toLowerCase()
  const contentType =
    ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'

  return { buffer, contentType }
}

export async function deleteFromStorage(path: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  await supabase.storage.from('attachments').remove([path])
}
