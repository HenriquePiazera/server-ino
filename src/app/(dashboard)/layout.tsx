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

function DashboardHeaderActions({ userName }: { userName: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground hidden text-sm sm:inline">{userName}</span>
      <Button asChild variant="ghost" className="min-h-11 px-3">
        <Link href="/feedback">Feedback</Link>
      </Button>
      <Button asChild variant="ghost" className="min-h-11 px-3">
        <Link href="/settings">Conta</Link>
      </Button>
      <form action={logoutAction}>
        <Button type="submit" variant="outline" className="min-h-11">
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
        <ShellHeader zIndex="z-40" className="md:hidden">
          <div>
            <Logo href="/dashboard" size="md" className="mb-1" />
            <p className="font-medium">{userName}</p>
          </div>
          <DashboardHeaderActions userName={userName} />
        </ShellHeader>

        <ShellHeader zIndex="z-40" className="hidden md:block">
          <Logo href="/dashboard" size="md" />
          <DashboardHeaderActions userName={userName} />
        </ShellHeader>

        <div className={BRAND.content}>{children}</div>
        <BottomNav />
      </div>
    </div>
  )
}
