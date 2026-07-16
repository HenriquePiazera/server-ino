'use client'



import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { BarChart3, MessageSquare, Users } from 'lucide-react'

import { cn } from '@/lib/utils'

import { logoutAction } from '@/features/auth/actions'

import { Button } from '@/components/ui/button'

import { Logo } from '@/components/layout/logo'

import { BrandNavLink } from '@/components/layout/brand-nav-link'

import { BRAND } from '@/lib/brand'



const internalNavItems = [

  { href: '/internal', label: 'Visão geral', icon: BarChart3 },

  { href: '/internal/users', label: 'Usuários', icon: Users },

  { href: '/internal/feedbacks', label: 'Feedbacks', icon: MessageSquare },

]



type InternalNavProps = {

  userName: string

}



export function InternalNav({ userName }: InternalNavProps) {

  const pathname = usePathname()



  return (

    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r bg-background md:flex">

      <div className="border-b px-4 py-4">

        <Logo href="/internal" size="sm" className="mb-2 md:hidden" />

        <span className={BRAND.internalBadge}>Painel interno</span>

        <p className="mt-2 truncate font-medium">{userName}</p>

      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">

        {internalNavItems.map((item) => {

          const active =

            item.href === '/internal'

              ? pathname === '/internal'

              : pathname.startsWith(item.href)

          return (

            <BrandNavLink

              key={item.href}

              href={item.href}

              label={item.label}

              icon={item.icon}

              active={active}

            />

          )

        })}

      </nav>

      <div className="space-y-1 border-t p-3">

        <Button asChild variant="outline" className="min-h-11 w-full">

          <Link href="/dashboard">Voltar ao app</Link>

        </Button>

        <form action={logoutAction}>

          <Button type="submit" variant="ghost" className="min-h-11 w-full">

            Sair

          </Button>

        </form>

      </div>

    </aside>

  )

}



export function InternalMobileNav() {

  const pathname = usePathname()



  return (

    <nav className="flex gap-2 overflow-x-auto border-b px-4 py-3 md:hidden">

      {internalNavItems.map((item) => {

        const active =

          item.href === '/internal'

            ? pathname === '/internal'

            : pathname.startsWith(item.href)

        return (

          <Link

            key={item.href}

            href={item.href}

            className={cn(

              'shrink-0 rounded-full px-3 py-2 text-sm',

              active

                ? 'bg-primary text-primary-foreground'

                : 'bg-muted text-muted-foreground'

            )}

          >

            {item.label}

          </Link>

        )

      })}

    </nav>

  )

}

