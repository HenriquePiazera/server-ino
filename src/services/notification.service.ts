import {
  sendCancellationEmail,
  sendConfirmationEmail,
  sendReminderEmail,
  sendRescheduleEmail,
} from '@/services/email.service'
import { getAppBaseUrlSync } from '@/lib/app-url'
import { sendPushNotification } from '@/services/push.service'

export type NotificationType =
  | 'confirmation'
  | 'reminder'
  | 'cancellation'
  | 'reschedule'

type AppointmentInfo = {
  id: string
  start_time: Date
  end_time: Date
  professionalName: string
  serviceName: string
}

type ClientInfo = {
  id: string
  name: string
  email: string | null
  push_subscription: string | null
}

export async function sendAppointmentNotification(input: {
  type: NotificationType
  appointment: AppointmentInfo
  client: ClientInfo
  confirmationToken?: string
}): Promise<{ channel: 'push' | 'email' | 'none' }> {
  const baseUrl = getAppBaseUrlSync()
  const confirmUrl = input.confirmationToken
    ? `${baseUrl}/confirm/${input.confirmationToken}`
    : undefined

  const pushPayload = buildPushPayload(input.type, input.appointment, confirmUrl)

  if (input.client.push_subscription) {
    try {
      const sent = await sendPushNotification(
        input.client.push_subscription,
        pushPayload
      )
      if (sent) return { channel: 'push' }
    } catch {
      // fallback to email
    }
  }

  if (input.client.email) {
    const emailHandlers = {
      confirmation: () =>
        sendConfirmationEmail({
          to: input.client.email!,
          clientName: input.client.name,
          professionalName: input.appointment.professionalName,
          serviceName: input.appointment.serviceName,
          startTime: input.appointment.start_time,
          confirmUrl: confirmUrl!,
        }),
      reminder: () =>
        sendReminderEmail({
          to: input.client.email!,
          clientName: input.client.name,
          professionalName: input.appointment.professionalName,
          serviceName: input.appointment.serviceName,
          startTime: input.appointment.start_time,
          confirmUrl,
        }),
      cancellation: () =>
        sendCancellationEmail({
          to: input.client.email!,
          clientName: input.client.name,
          professionalName: input.appointment.professionalName,
          serviceName: input.appointment.serviceName,
          startTime: input.appointment.start_time,
        }),
      reschedule: () =>
        sendRescheduleEmail({
          to: input.client.email!,
          clientName: input.client.name,
          professionalName: input.appointment.professionalName,
          serviceName: input.appointment.serviceName,
          startTime: input.appointment.start_time,
          confirmUrl,
        }),
    }

    const result = await emailHandlers[input.type]()
    if (result.sent) return { channel: 'email' }
  }

  return { channel: 'none' }
}

function buildPushPayload(
  type: NotificationType,
  appointment: AppointmentInfo,
  confirmUrl?: string
) {
  const dateStr = appointment.start_time.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const titles: Record<NotificationType, string> = {
    confirmation: 'Confirme seu agendamento',
    reminder: 'Lembrete de atendimento',
    cancellation: 'Agendamento cancelado',
    reschedule: 'Horário alterado',
  }

  const bodies: Record<NotificationType, string> = {
    confirmation: `${appointment.serviceName} com ${appointment.professionalName} — ${dateStr}`,
    reminder: `Amanhã: ${appointment.serviceName} às ${dateStr}`,
    cancellation: `${appointment.serviceName} em ${dateStr} foi cancelado`,
    reschedule: `Novo horário: ${appointment.serviceName} — ${dateStr}`,
  }

  return {
    title: titles[type],
    body: bodies[type],
    url: confirmUrl ?? '/',
  }
}
