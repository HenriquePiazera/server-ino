'use client'

import type { ComponentProps, ReactNode } from 'react'

type ResettableFormProps = Omit<ComponentProps<'form'>, 'action'> & {
  formKey?: string
  action: NonNullable<ComponentProps<'form'>['action']>
  children: ReactNode
}

export function ResettableForm({
  formKey,
  children,
  ...props
}: ResettableFormProps) {
  return (
    <form key={formKey ?? 'initial'} {...props}>
      {children}
    </form>
  )
}
