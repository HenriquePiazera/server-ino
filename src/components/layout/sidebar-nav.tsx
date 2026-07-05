'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { dashboardNavItems } from '@/components/layout/nav-items'
import { logoutAction } from '@/features/auth/actions'
import { Button } from '@/components/ui/button'

type SidebarNavProps = {
  userName: string
}

export function SidebarNav({ userName }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r bg-background md:flex">
      <div className="border-b px-4 py-4">
        <p className="text-sm text-muted-foreground">Agenda Multipro</p>
        <p className="truncate font-medium">{userName}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors',
                active
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-3">
        <form action={logoutAction}>
          <Button type="submit" variant="outline" className="min-h-11 w-full">
            Sair
          </Button>
        </form>
      </div>
    </aside>
  )
}
