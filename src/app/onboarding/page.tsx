import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  getOnboardingStateAction,
  advanceOnboardingAction,
  completeOnboardingAction,
} from '@/features/onboarding/actions'
import { createClientAction } from '@/features/clients/actions'
import { createAppointmentAction } from '@/features/appointments/actions'
import { createRecordAction } from '@/features/records/actions'
import { SubmitButton } from '@/components/forms/submit-button'

export default async function OnboardingPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const state = await getOnboardingStateAction()
  if (state.completed) redirect('/dashboard')

  const step = state.step

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center p-4">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo(a)!</CardTitle>
          <CardDescription>
            Passo {Math.min(step + 1, 3)} de 3 — configure sua conta em minutos
          </CardDescription>
          <div className="bg-muted mt-4 h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full transition-all"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          {step === 0 ? (
            <form
              action={async (formData) => {
                'use server'
                const result = await createClientAction(formData)
                if (result.success) {
                  await advanceOnboardingAction(1)
                  redirect('/onboarding')
                }
              }}
              className="space-y-4"
            >
              <p className="text-sm font-medium">Passo 1 — Cadastrar primeiro cliente</p>
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input id="name" name="name" required className="min-h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input id="phone" name="phone" required className="min-h-11" />
              </div>
              <SubmitButton>Continuar</SubmitButton>
            </form>
          ) : null}

          {step === 1 ? (
            <form
              action={async (formData) => {
                'use server'
                const { listClientsAction } = await import('@/features/clients/actions')
                const clients = await listClientsAction()
                if (clients.length === 0) redirect('/onboarding')
                formData.set('client_id', clients[0].id)
                const result = await createAppointmentAction(formData)
                if (result.success) {
                  await advanceOnboardingAction(2)
                  redirect('/onboarding')
                }
              }}
              className="space-y-4"
            >
              <p className="text-sm font-medium">Passo 2 — Criar primeiro agendamento</p>
              <div className="space-y-2">
                <Label htmlFor="start_time">Data e hora de início *</Label>
                <Input
                  id="start_time"
                  name="start_time"
                  type="datetime-local"
                  required
                  className="min-h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_time">Data e hora de fim *</Label>
                <Input
                  id="end_time"
                  name="end_time"
                  type="datetime-local"
                  required
                  className="min-h-11"
                />
              </div>
              <input type="hidden" name="buffer_minutes" value="0" />
              <SubmitButton>Continuar</SubmitButton>
            </form>
          ) : null}

          {step >= 2 ? (
            <form
              action={async (formData) => {
                'use server'
                const { listClientsAction } = await import('@/features/clients/actions')
                const { listAppointmentsAction } = await import('@/features/appointments/actions')
                const clients = await listClientsAction()
                const appointments = await listAppointmentsAction()
                if (!clients.length || !appointments.length) redirect('/onboarding')
                formData.set('client_id', clients[0].id)
                formData.set('appointment_id', appointments[0].id)
                const result = await createRecordAction(formData)
                if (result.success) {
                  await completeOnboardingAction()
                }
              }}
              className="space-y-4"
            >
              <p className="text-sm font-medium">Passo 3 — Registrar primeiro atendimento</p>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Ex: Avaliação inicial — cliente relatou..."
                  rows={4}
                />
              </div>
              <SubmitButton>Concluir onboarding</SubmitButton>
            </form>
          ) : null}

          {step > 0 && step < 2 ? (
            <form action={completeOnboardingAction} className="mt-4">
              <Button type="submit" variant="ghost" className="min-h-11 w-full">
                Pular e ir ao painel
              </Button>
            </form>
          ) : null}
        </CardContent>
      </Card>
    </main>
  )
}
