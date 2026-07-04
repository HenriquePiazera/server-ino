import Link from 'next/link'
import { auth } from '@/auth'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { listClientsAction } from '@/features/clients/actions'
import { listAppointmentsAction } from '@/features/appointments/actions'
import { listPaymentsAction } from '@/features/payments/actions'

export default async function DashboardPage() {
  const session = await auth()
  const [clients, appointments, payments] = await Promise.all([
    listClientsAction(),
    listAppointmentsAction(),
    listPaymentsAction(),
  ])

  const upcoming = appointments.filter(
    (a) => a.status !== 'canceled' && new Date(a.start_time) >= new Date()
  )

  const paidTotal = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div>
      <PageHeader
        title={`Olá, ${session?.user?.name?.split(' ')[0] ?? 'profissional'}`}
        description="Resumo do seu dia"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{clients.length}</p>
            <Link href="/clients" className="text-primary mt-2 inline-block text-sm hover:underline">
              Ver clientes
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Próximos agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{upcoming.length}</p>
            <Link href="/appointments" className="text-primary mt-2 inline-block text-sm hover:underline">
              Ver agenda
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recebido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {paidTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <Link href="/payments" className="text-primary mt-2 inline-block text-sm hover:underline">
              Ver financeiro
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
