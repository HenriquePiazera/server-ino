import Link from 'next/link'
import { Logo } from '@/components/layout/logo'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { isPlatformOwnerEmail } from '@/lib/platform-owner'
import { BottomNav } from '@/components/layout/bottom-nav'
import { SidebarNav } from '@/components/layout/sidebar-nav'
import { ShellHeader } from '@/components/layout/shell-header'
import { logoutAction } from '@/features/auth/actions'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BRAND } from '@/lib/brand'

function DashboardHeaderActions({
  userName,
  tone = 'light',
}: {
  userName: string
  tone?: 'light' | 'dark'
}) {
  const onDark = tone === 'dark'
  const ghostClass = onDark
    ? 'h-9 px-1.5 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground sm:px-2'
    : 'h-9 px-2 text-muted-foreground sm:px-3'
  const settingsClass = onDark
    ? 'h-9 px-1.5 border border-sidebar-border bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/90 sm:px-2'
    : 'h-9 px-2 sm:px-3'

  return (
    <div className="flex items-center gap-0.5 sm:gap-2">
      <span
        className={cn(
          'hidden max-w-[8rem] truncate text-sm lg:inline',
          onDark ? 'text-sidebar-muted' : 'text-muted-foreground'
        )}
      >
        {userName}
      </span>
      <Button asChild variant="ghost" size="sm" className={ghostClass}>
        <Link href="/feedback">Feedback</Link>
      </Button>
      <Button asChild variant={onDark ? 'ghost' : 'secondary'} size="sm" className={settingsClass}>
        <Link href="/settings">Config</Link>
      </Button>
      <Button asChild variant="ghost" size="sm" className={ghostClass}>
        <Link href="/account">Conta</Link>
      </Button>
      <form action={logoutAction}>
        <Button type="submit" variant="ghost" size="sm" className={ghostClass}>
          Sair
        </Button>
      </form>
    </div>
  )
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const showInternalLink = isPlatformOwnerEmail(session.user.email)
  const userName = session.user.name ?? 'Usuário'

  return (
    <div className={cn(BRAND.surface, 'md:flex')}>
      <SidebarNav
        userName={userName}
        showInternalLink={showInternalLink}
      />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <ShellHeader className="md:hidden" tone="sidebar">
          <Logo href="/dashboard" variant="header" />
          <DashboardHeaderActions userName={userName} tone="dark" />
        </ShellHeader>

        <ShellHeader className="hidden md:block">
          <div aria-hidden className="flex-1" />
          <DashboardHeaderActions userName={userName} />
        </ShellHeader>

        <div className={BRAND.content}>{children}</div>
        <BottomNav />
      </div>
    </div>
  )
}
