import Link from 'next/link'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getPlatformMetricsAction } from '@/features/internal/actions'
import { PLAN_LABELS, PLAN_STATUS_LABELS } from '@/lib/labels'

function MetricCard({
  title,
  value,
  hint,
}: {
  title: string
  value: string | number
  hint?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{value}</p>
        {hint ? <p className="text-muted-foreground mt-1 text-sm">{hint}</p> : null}
      </CardContent>
    </Card>
  )
}

export default async function InternalDashboardPage() {
  const metrics = await getPlatformMetricsAction()

  const npsLabel =
    metrics.nps_score === null
      ? 'Sem respostas'
      : `${metrics.nps_score > 0 ? '+' : ''}${metrics.nps_score}`

  return (
    <div>
      <PageHeader
        title="Visão geral"
        description="Métricas de uso do SaaS"
        backHref="/dashboard"
        actionHref="/internal/feedbacks"
        actionLabel="Ver feedbacks"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Total de cadastros" value={metrics.total_users} />
        <MetricCard
          title="Ativos (7 dias)"
          value={metrics.active_users_7d}
          hint="Logins registrados no período"
        />
        <MetricCard
          title="Ativos (30 dias)"
          value={metrics.active_users_30d}
          hint="Logins registrados no período"
        />
        <MetricCard
          title="Onboarding concluído"
          value={metrics.onboarding_completed}
          hint={
            metrics.total_users > 0
              ? `${Math.round((metrics.onboarding_completed / metrics.total_users) * 100)}% dos cadastros`
              : undefined
          }
        />
        <MetricCard
          title="NPS"
          value={npsLabel}
          hint={
            metrics.nps_responses > 0
              ? `${metrics.nps_responses} resposta(s)`
              : 'Colete feedbacks em /feedback'
          }
        />
        <MetricCard title="Feedbacks recebidos" value={metrics.total_feedbacks} />
        <MetricCard
          title="Novos esta semana"
          value={metrics.new_users_this_week}
          hint={`Semana anterior: ${metrics.new_users_last_week}`}
        />
        <MetricCard title="Clientes (total)" value={metrics.total_clients} />
        <MetricCard title="Agendamentos (total)" value={metrics.total_appointments} />
        <MetricCard title="Pagamentos (total)" value={metrics.total_payments} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usuários por plano</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(metrics.users_by_plan).length === 0 ? (
              <p className="text-muted-foreground text-sm">Nenhum cadastro ainda.</p>
            ) : (
              Object.entries(metrics.users_by_plan).map(([plan, count]) => (
                <div
                  key={plan}
                  className="flex min-h-11 items-center justify-between text-sm"
                >
                  <span>{PLAN_LABELS[plan] ?? plan}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status de assinatura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(metrics.users_by_plan_status).length === 0 ? (
              <p className="text-muted-foreground text-sm">Nenhum cadastro ainda.</p>
            ) : (
              Object.entries(metrics.users_by_plan_status).map(([status, count]) => (
                <div
                  key={status}
                  className="flex min-h-11 items-center justify-between text-sm"
                >
                  <span>{PLAN_STATUS_LABELS[status] ?? status}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Link
          href="/internal/users"
          className="text-primary text-sm hover:underline"
        >
          Ver lista de usuários →
        </Link>
      </div>
    </div>
  )
}
