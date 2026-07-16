'use client'

import { Logo } from '@/components/layout/logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  dashboardNavItems,
  internalNavItem,
  secondaryNavItems,
} from '@/components/layout/nav-items'
import { logoutAction } from '@/features/auth/actions'
import { Button } from '@/components/ui/button'
import { BrandNavLink } from '@/components/layout/brand-nav-link'
import { BRAND } from '@/lib/brand'

type SidebarNavProps = {
  userName: string
  showInternalLink?: boolean
}

export function SidebarNav({ userName, showInternalLink = false }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r bg-background md:flex">
      <div className="border-b px-4 py-4">
        <Logo href="/dashboard" size="md" className="mb-2 md:hidden" />
        <p className="truncate font-medium">{userName}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {dashboardNavItems.map((item) => (
          <BrandNavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname.startsWith(item.href)}
          />
        ))}
        {secondaryNavItems.map((item) => (
          <BrandNavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname.startsWith(item.href)}
          />
        ))}
        {showInternalLink ? (
          <BrandNavLink
            href={internalNavItem.href}
            label={internalNavItem.label}
            icon={internalNavItem.icon}
            active={pathname.startsWith(internalNavItem.href)}
          />
        ) : null}
      </nav>
      <div className="space-y-1 border-t p-3">
        <Link
          href="/settings"
          className={cn(
            BRAND.navLink,
            pathname.startsWith('/settings')
              ? BRAND.navLinkActive
              : BRAND.navLinkInactive
          )}
        >
          <Settings className="size-5 shrink-0" />
          <span>Configurações</span>
        </Link>
        <form action={logoutAction}>
          <Button type="submit" variant="outline" className="min-h-11 w-full">
            Sair
          </Button>
        </form>
      </div>
    </aside>
  )
}
