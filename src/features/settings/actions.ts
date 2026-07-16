'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { logAudit } from '@/lib/audit'
import {
  actionError,
  getClientIp,
  requireUserId,
  type ActionResult,
} from '@/lib/session'
import { z } from 'zod'
import QRCode from 'qrcode'
import { getAppBaseUrl } from '@/lib/app-url'
import { ensurePublicSlug } from '@/features/public-booking/actions'

const publicProfileSchema = z.object({
  public_bio: z.string().max(500).optional(),
  public_photo_url: z.string().url().optional().or(z.literal('')),
})

export type AccountSettingsDTO = {
  name: string
  email: string
  plan: string
  plan_status: string
  trial_ends_at: string | null
  created_at: string
  onboarding_completed_at: string | null
  public_slug: string | null
  public_bio: string | null
  public_photo_url: string | null
  public_url: string | null
}

export async function getAccountSettingsAction(): Promise<AccountSettingsDTO> {
  const userId = await requireUserId()
  const publicSlug = await ensurePublicSlug(userId)

  const user = await prisma.user.findFirstOrThrow({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      plan: true,
      plan_status: true,
      trial_ends_at: true,
      created_at: true,
      onboarding_completed_at: true,
      public_slug: true,
      public_bio: true,
      public_photo_url: true,
    },
  })

  const baseUrl = await getAppBaseUrl()
  const publicUrl = `${baseUrl}/p/${publicSlug}`

  return {
    name: user.name,
    email: user.email,
    plan: user.plan,
    plan_status: user.plan_status,
    trial_ends_at: user.trial_ends_at?.toISOString() ?? null,
    created_at: user.created_at.toISOString(),
    onboarding_completed_at: user.onboarding_completed_at?.toISOString() ?? null,
    public_slug: publicSlug,
    public_bio: user.public_bio,
    public_photo_url: user.public_photo_url,
    public_url: publicUrl,
  }
}

export async function updatePublicProfileAction(
  formData: FormData
): Promise<ActionResult> {
  const userId = await requireUserId()
  const parsed = publicProfileSchema.safeParse({
    public_bio: formData.get('public_bio') || undefined,
    public_photo_url: formData.get('public_photo_url') || undefined,
  })

  if (!parsed.success) return actionError('INVALID_INPUT')

  await prisma.user.update({
    where: { id: userId },
    data: {
      public_bio: parsed.data.public_bio ?? null,
      public_photo_url: parsed.data.public_photo_url || null,
    },
  })

  const hdrs = await headers()
  await logAudit({
    userId,
    operation: 'user.update_public_profile',
    entity: 'User',
    entityId: userId,
    ipAddress: getClientIp(hdrs),
  })

  revalidatePath('/settings')
  revalidatePath('/settings/public')
  return { success: true }
}

export async function generatePublicQrCodeAction(): Promise<
  ActionResult<{ dataUrl: string }>
> {
  const userId = await requireUserId()
  const publicSlug = await ensurePublicSlug(userId)

  const baseUrl = await getAppBaseUrl()
  const url = `${baseUrl}/p/${publicSlug}`
  const dataUrl = await QRCode.toDataURL(url, { width: 280, margin: 2 })

  return { success: true, data: { dataUrl } }
}
