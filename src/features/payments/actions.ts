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
import { paymentSchema } from '@/schemas/payment.schema'

export type PaymentDTO = {
  id: string
  client_id: string
  client_name: string
  appointment_id: string | null
  amount: number
  payment_method: string
  status: string
  paid_at: string | null
  created_at: string
}

export async function listPaymentsAction(): Promise<PaymentDTO[]> {
  const userId = await requireUserId()
  const payments = await prisma.payment.findMany({
    where: { user_id: userId },
    include: { client: { select: { name: true } } },
    orderBy: { created_at: 'desc' },
  })

  return payments.map((p) => ({
    id: p.id,
    client_id: p.client_id,
    client_name: p.client.name,
    appointment_id: p.appointment_id,
    amount: Number(p.amount),
    payment_method: p.payment_method,
    status: p.status,
    paid_at: p.paid_at?.toISOString() ?? null,
    created_at: p.created_at.toISOString(),
  }))
}

export async function createPaymentAction(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  const userId = await requireUserId()
  const parsed = paymentSchema.safeParse({
    client_id: formData.get('client_id'),
    appointment_id: formData.get('appointment_id') || undefined,
    amount: formData.get('amount'),
    payment_method: formData.get('payment_method'),
    status: formData.get('status') ?? 'pending',
    paid_at: formData.get('paid_at') || undefined,
  })

  if (!parsed.success) return actionError('INVALID_INPUT')

  const client = await prisma.client.findFirst({
    where: { id: parsed.data.client_id, user_id: userId },
  })
  if (!client) return actionError('CLIENT_NOT_FOUND')

  const payment = await prisma.payment.create({
    data: {
      user_id: userId,
      client_id: parsed.data.client_id,
      appointment_id: parsed.data.appointment_id ?? null,
      amount: parsed.data.amount,
      payment_method: parsed.data.payment_method,
      status: parsed.data.status,
      paid_at:
        parsed.data.status === 'paid'
          ? parsed.data.paid_at
            ? new Date(parsed.data.paid_at)
            : new Date()
          : null,
    },
  })

  const hdrs = await headers()
  await logAudit({
    userId,
    operation: 'payment.create',
    entity: 'Payment',
    entityId: payment.id,
    ipAddress: getClientIp(hdrs),
  })

  revalidatePath('/payments')
  return { success: true, data: { id: payment.id } }
}

export async function deletePaymentAction(id: string): Promise<ActionResult> {
  const userId = await requireUserId()
  const existing = await prisma.payment.findFirst({
    where: { id, user_id: userId },
  })
  if (!existing) return actionError('PAYMENT_NOT_FOUND')

  await prisma.payment.delete({ where: { id } })

  const hdrs = await headers()
  await logAudit({
    userId,
    operation: 'payment.delete',
    entity: 'Payment',
    entityId: id,
    ipAddress: getClientIp(hdrs),
  })

  revalidatePath('/payments')
  return { success: true }
}
