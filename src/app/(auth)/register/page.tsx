import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerAndLoginAction } from '@/features/auth/actions'
import { SubmitButton } from '@/components/forms/submit-button'

export default async function RegisterPage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>14 dias grátis — sem cartão de crédito</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerAndLoginAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" required className="min-h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="min-h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                minLength={8}
                required
                className="min-h-11"
              />
            </div>
            <SubmitButton>Criar conta</SubmitButton>
          </form>
          <p className="mt-4 text-center text-sm">
            Já tem conta?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
