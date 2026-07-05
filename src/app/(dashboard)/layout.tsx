import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { BottomNav } from '@/components/layout/bottom-nav'
import { SidebarNav } from '@/components/layout/sidebar-nav'
import { logoutAction } from '@/features/auth/actions'
import { Button } from '@/components/ui/button'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen md:flex">
      <SidebarNav userName={session.user.name ?? 'Usuário'} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm text-muted-foreground">Agenda Multipro</p>
              <p className="font-medium">{session.user.name}</p>
            </div>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" className="min-h-11">
                Sair
              </Button>
            </form>
          </div>
        </header>
        <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</div>
        <BottomNav />
      </div>
    </div>
  )
}
