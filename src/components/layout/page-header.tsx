import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function PageHeader({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string
  description?: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        ) : null}
      </div>
      {actionHref && actionLabel ? (
        <Button asChild className="min-h-11">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  )
}
