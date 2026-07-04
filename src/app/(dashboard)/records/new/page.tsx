import { redirect } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { listClientsAction } from '@/features/clients/actions'
import { listAppointmentsAction } from '@/features/appointments/actions'
import { createRecordAction } from '@/features/records/actions'
import { SubmitButton } from '@/components/forms/submit-button'

export default async function NewRecordPage() {
  const [clients, appointments] = await Promise.all([
    listClientsAction(),
    listAppointmentsAction(),
  ])

  return (
    <div>
      <PageHeader title="Novo registro" />
      <Card>
        <CardContent className="pt-6">
          <form
            action={async (formData) => {
              'use server'
              const result = await createRecordAction(formData)
              if (result.success) redirect('/records')
              redirect('/records/new?error=1')
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="client_id">Cliente *</Label>
              <select
                id="client_id"
                name="client_id"
                required
                className="border-input bg-background flex min-h-11 w-full rounded-md border px-3 text-sm"
              >
                <option value="">Selecione</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment_id">Agendamento *</Label>
              <select
                id="appointment_id"
                name="appointment_id"
                required
                className="border-input bg-background flex min-h-11 w-full rounded-md border px-3 text-sm"
              >
                <option value="">Selecione</option>
                {appointments
                  .filter((a) => a.status !== 'canceled')
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.client_name} —{' '}
                      {new Date(a.start_time).toLocaleString('pt-BR')}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Descreva o que foi realizado no atendimento..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evolution">Evolução</Label>
              <Textarea
                id="evolution"
                name="evolution"
                placeholder="Registre a evolução do cliente..."
                rows={3}
              />
            </div>
            <SubmitButton>Salvar registro</SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
