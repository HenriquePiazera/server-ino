import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BRAND } from '@/lib/brand'

type BrandNavLinkProps = {
  href: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  active?: boolean
  className?: string
}

export function BrandNavLink({
  href,
  label,
  icon: Icon,
  active = false,
  className,
}: BrandNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        BRAND.navLink,
        active ? BRAND.navLinkActive : BRAND.navLinkInactive,
        className
      )}
    >
      {Icon ? <Icon className="size-5 shrink-0" /> : null}
      <span>{label}</span>
    </Link>
  )
}
