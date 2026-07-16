import { refreshAndRedirect } from '@/lib/refresh'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClientAction } from '@/features/clients/actions'
import { SubmitButton } from '@/components/forms/submit-button'
import { ResettableForm } from '@/components/forms/resettable-form'
import { formKeyFromSearchParams } from '@/lib/form-key'

export default function NewClientPage({
  searchParams,
}: {
  searchParams?: { refreshed?: string | string[]; error?: string }
}) {
  const formKey = formKeyFromSearchParams(searchParams)

  return (
    <div>
      <PageHeader
        title="Novo cliente"
        description="Cadastre um novo cliente"
        backHref="/clients"
      />
      <Card>
        <CardContent className="pt-6">
          <ResettableForm
            formKey={formKey}
            action={async (formData) => {
              'use server'
              const result = await createClientAction(formData)
              if (result.success && result.data?.id) {
                refreshAndRedirect(`/clients/${result.data.id}`, '/clients')
              }
              refreshAndRedirect('/clients/new?error=1')
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input id="name" name="name" required className="min-h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input id="phone" name="phone" required className="min-h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" className="min-h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth_date">Data de nascimento</Label>
              <Input id="birth_date" name="birth_date" type="date" className="min-h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea id="notes" name="notes" rows={3} />
            </div>
            <SubmitButton>Salvar cliente</SubmitButton>
          </ResettableForm>
        </CardContent>
      </Card>
    </div>
  )
}
