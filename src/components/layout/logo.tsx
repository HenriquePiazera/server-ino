import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { APP_LOGO_PATH, APP_NAME } from '@/lib/brand'

type LogoProps = {
  href?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'h-14 w-auto',
  md: 'h-24 w-auto',
  lg: 'h-28 w-auto',
  xl: 'h-36 w-auto',
} as const

const imageSizes = {
  sm: 180,
  md: 320,
  lg: 380,
  xl: 480,
} as const

export function Logo({ href = '/', size = 'md', className }: LogoProps) {
  const image = (
    <Image
      src={APP_LOGO_PATH}
      alt={APP_NAME}
      width={imageSizes[size]}
      height={imageSizes[size]}
      className={cn(sizeClasses[size], className)}
      priority={size === 'lg' || size === 'xl'}
    />
  )

  if (!href) {
    return image
  }

  return (
    <Link href={href} className="inline-flex shrink-0 items-center">
      {image}
    </Link>
  )
}
