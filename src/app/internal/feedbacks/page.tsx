import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FeedbackStatusSelect } from '@/components/internal/feedback-status-select'
import { listPlatformFeedbacksAction } from '@/features/internal/actions'
import {
  FEEDBACK_CATEGORY_LABELS,
  FEEDBACK_STATUS_LABELS,
} from '@/lib/labels'

export default async function InternalFeedbacksPage() {
  const feedbacks = await listPlatformFeedbacksAction()

  const npsScores = feedbacks
    .map((feedback) => feedback.nps_score)
    .filter((score): score is number => score !== null)

  const promoters = npsScores.filter((score) => score >= 9).length
  const passives = npsScores.filter((score) => score >= 7 && score <= 8).length
  const detractors = npsScores.filter((score) => score <= 6).length

  return (
    <div>
      <PageHeader
        title="Feedbacks"
        description="NPS e mensagens enviadas pelos usuários"
        backHref="/internal"
      />

      {npsScores.length > 0 ? (
        <div className="mb-6 grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="py-4">
              <p className="text-muted-foreground text-xs sm:text-sm">Promotores (9–10)</p>
              <p className="text-xl font-semibold sm:text-2xl">{promoters}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-muted-foreground text-xs sm:text-sm">Neutros (7–8)</p>
              <p className="text-xl font-semibold sm:text-2xl">{passives}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-muted-foreground text-xs sm:text-sm">Detratores (0–6)</p>
              <p className="text-xl font-semibold sm:text-2xl">{detractors}</p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {feedbacks.length === 0 ? (
        <Card>
          <CardContent className="text-muted-foreground py-8 text-sm">
            Nenhum feedback recebido ainda. Compartilhe o link /feedback com os
            usuários em validação.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id}>
              <CardContent className="space-y-3 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium">{feedback.user_name}</p>
                    <p className="text-muted-foreground break-all text-sm">
                      {feedback.user_email}
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {new Date(feedback.created_at).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 overflow-x-auto">
                    {feedback.nps_score !== null ? (
                      <Badge>NPS {feedback.nps_score}</Badge>
                    ) : null}
                    <Badge variant="secondary">
                      {FEEDBACK_CATEGORY_LABELS[feedback.category] ??
                        feedback.category}
                    </Badge>
                    <Badge variant="outline">
                      {FEEDBACK_STATUS_LABELS[feedback.status] ?? feedback.status}
                    </Badge>
                    {feedback.can_contact ? (
                      <Badge variant="outline">Pode contatar</Badge>
                    ) : (
                      <Badge variant="outline">Anônimo</Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{feedback.message}</p>
                <div className="max-w-xs">
                  <FeedbackStatusSelect
                    feedbackId={feedback.id}
                    currentStatus={feedback.status}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
