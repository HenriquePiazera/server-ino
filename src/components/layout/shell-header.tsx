import { cn } from '@/lib/utils'

type ShellHeaderProps = {
  children: React.ReactNode
  className?: string
  zIndex?: 'z-40' | 'z-50'
}

export function ShellHeader({
  children,
  className,
  zIndex = 'z-50',
}: ShellHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 w-full border-b bg-background/95 backdrop-blur',
        zIndex,
        className
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {children}
      </div>
    </header>
  )
}
