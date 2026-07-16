import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { listPlatformUsersAction } from '@/features/internal/actions'
import { PLAN_LABELS, PLAN_STATUS_LABELS } from '@/lib/labels'

export default async function InternalUsersPage() {
  const users = await listPlatformUsersAction()

  return (
    <div>
      <PageHeader
        title="Usuários"
        description="Lista resumida de profissionais cadastrados"
        backHref="/internal"
      />

      {users.length === 0 ? (
        <Card>
          <CardContent className="text-muted-foreground py-8 text-sm">
            Nenhum usuário cadastrado ainda.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="space-y-3 py-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground break-all text-sm">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {PLAN_LABELS[user.plan] ?? user.plan}
                    </Badge>
                    <Badge variant="outline">
                      {PLAN_STATUS_LABELS[user.plan_status] ?? user.plan_status}
                    </Badge>
                    {user.onboarding_completed_at ? (
                      <Badge>Onboarding ok</Badge>
                    ) : (
                      <Badge variant="outline">Onboarding pendente</Badge>
                    )}
                  </div>
                </div>
                <div className="text-muted-foreground grid gap-2 text-sm sm:grid-cols-3">
                  <span>
                    Cadastro:{' '}
                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </span>
                  <span>{user.clients_count} cliente(s)</span>
                  <span>{user.appointments_count} agendamento(s)</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
