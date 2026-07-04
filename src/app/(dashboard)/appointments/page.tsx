import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CopyReminderButton } from '@/features/appointments/copy-reminder-button'
import { listAppointmentsAction } from '@/features/appointments/actions'

const statusLabels: Record<string, string> = {
  scheduled: 'Agendado',
  awaiting_confirmation: 'Aguardando confirmação',
  confirmed: 'Confirmado',
  completed: 'Realizado',
  canceled: 'Cancelado',
}

export default async function AppointmentsPage() {
  const appointments = await listAppointmentsAction()

  return (
    <div>
      <PageHeader
        title="Agenda"
        description="Seus agendamentos"
        actionHref="/appointments/new"
        actionLabel="Novo agendamento"
      />
      {appointments.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Nenhum agendamento cadastrado.
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {appointments.map((appt) => (
            <li key={appt.id}>
              <Card>
                <CardContent className="space-y-3 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{appt.client_name}</p>
                      <p className="text-muted-foreground text-sm">
                        {new Date(appt.start_time).toLocaleString('pt-BR')} —{' '}
                        {new Date(appt.end_time).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {statusLabels[appt.status] ?? appt.status}
                    </Badge>
                  </div>
                  {appt.status !== 'canceled' ? (
                    <CopyReminderButton appointmentId={appt.id} />
                  ) : null}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
