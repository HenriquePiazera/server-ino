import { redirect } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { listClientsAction } from '@/features/clients/actions'
import { createAppointmentAction } from '@/features/appointments/actions'
import { SubmitButton } from '@/components/forms/submit-button'

export default async function NewAppointmentPage() {
  const clients = await listClientsAction()

  return (
    <div>
      <PageHeader title="Novo agendamento" />
      <Card>
        <CardContent className="pt-6">
          <form
            action={async (formData) => {
              'use server'
              const result = await createAppointmentAction(formData)
              if (result.success) redirect('/appointments')
              redirect('/appointments/new?error=1')
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
              <Label htmlFor="start_time">Início *</Label>
              <Input
                id="start_time"
                name="start_time"
                type="datetime-local"
                required
                className="min-h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_time">Fim *</Label>
              <Input
                id="end_time"
                name="end_time"
                type="datetime-local"
                required
                className="min-h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buffer_minutes">Buffer após atendimento (min)</Label>
              <select
                id="buffer_minutes"
                name="buffer_minutes"
                defaultValue="0"
                className="border-input bg-background flex min-h-11 w-full rounded-md border px-3 text-sm"
              >
                <option value="0">0 min</option>
                <option value="10">10 min</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea id="notes" name="notes" rows={2} />
            </div>
            <SubmitButton>Salvar agendamento</SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
