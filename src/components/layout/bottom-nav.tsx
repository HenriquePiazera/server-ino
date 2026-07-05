'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { dashboardNavItems } from '@/components/layout/nav-items'

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 rounded-lg px-2 text-xs',
                active ? 'text-primary font-medium' : 'text-muted-foreground'
              )}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
