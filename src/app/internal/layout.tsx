import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { isPlatformOwnerEmail } from '@/lib/platform-owner'
import { Logo } from '@/components/layout/logo'
import { InternalMobileNav, InternalNav } from '@/components/layout/internal-nav'
import { ShellHeader } from '@/components/layout/shell-header'
import { cn } from '@/lib/utils'
import { BRAND } from '@/lib/brand'

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (!isPlatformOwnerEmail(session.user.email)) redirect('/dashboard')

  const userName = session.user.name ?? 'Dono'

  return (
    <div className={cn(BRAND.surface, 'md:flex')}>
      <InternalNav userName={userName} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <ShellHeader zIndex="z-40" className="md:hidden">
          <div>
            <Logo href="/internal" size="sm" className="mb-1" />
            <span className={BRAND.internalBadge}>Painel interno</span>
            <p className="mt-1 font-medium">{userName}</p>
          </div>
          <Link href="/dashboard" className="text-primary text-sm hover:underline">
            Voltar ao app
          </Link>
        </ShellHeader>

        <ShellHeader zIndex="z-40" className="hidden md:block">
          <div className="flex items-center gap-3">
            <Logo href="/internal" size="sm" />
            <span className={BRAND.internalBadge}>Painel interno</span>
          </div>
          <Link href="/dashboard" className="text-primary text-sm hover:underline">
            Voltar ao app
          </Link>
        </ShellHeader>

        <InternalMobileNav />
        <div className={BRAND.content}>{children}</div>
      </div>
    </div>
  )
}
