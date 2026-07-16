import { prisma } from '@/lib/prisma'
import { checkPlanLimit } from '@/lib/plan-limits'
import { sendAppointmentNotification } from '@/services/notification.service'

export async function processReminderNotifications(): Promise<{
  processed: number
  sent: number
}> {
  const now = new Date()
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const in23h = new Date(now.getTime() + 23 * 60 * 60 * 1000)

  const appointments = await prisma.appointment.findMany({
    where: {
      status: { in: ['scheduled', 'awaiting_confirmation', 'confirmed'] },
      start_time: { gte: in23h, lte: in24h },
    },
    include: {
      client: true,
      user: { select: { name: true } },
      service: { select: { name: true } },
      confirmations: {
        where: { status: 'pending' },
        orderBy: { sent_at: 'desc' },
        take: 1,
      },
    },
  })

  let sent = 0

  for (const appointment of appointments) {
    const reminderLimit = await checkPlanLimit(
      appointment.user_id,
      'auto_reminders'
    )
    if (!reminderLimit.allowed) continue

    const result = await sendAppointmentNotification({
      type: 'reminder',
      appointment: {
        id: appointment.id,
        start_time: appointment.start_time,
        end_time: appointment.end_time,
        professionalName: appointment.user.name,
        serviceName: appointment.service?.name ?? 'Atendimento',
      },
      client: {
        id: appointment.client.id,
        name: appointment.client.name,
        email: appointment.client.email,
        push_subscription: appointment.client.push_subscription,
      },
      confirmationToken: appointment.confirmations[0]?.token,
    })

    if (result.channel !== 'none') sent++
  }

  return { processed: appointments.length, sent }
}
