import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  getClientAction,
  updateClientAction,
  deleteClientAction,
} from '@/features/clients/actions'
import {
  listAttachmentsAction,
  uploadAttachmentAction,
  deleteAttachmentAction,
} from '@/features/attachments/actions'
import { SubmitButton } from '@/components/forms/submit-button'

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const client = await getClientAction(params.id)
  if (!client) notFound()

  const attachments = await listAttachmentsAction(params.id)

  return (
    <div>
      <PageHeader title={client.name} description="Detalhes do cliente" />
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form
            action={async (formData) => {
              'use server'
              await updateClientAction(params.id, formData)
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                defaultValue={client.name}
                required
                className="min-h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={client.phone}
                required
                className="min-h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={client.email ?? ''}
                className="min-h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                name="notes"
                defaultValue={client.notes ?? ''}
                rows={3}
              />
            </div>
            <SubmitButton>Atualizar</SubmitButton>
          </form>
          <form
            action={async () => {
              'use server'
              await deleteClientAction(params.id)
              const { redirect } = await import('next/navigation')
              redirect('/clients')
            }}
            className="mt-4"
          >
            <Button type="submit" variant="destructive" className="min-h-11 w-full">
              Excluir cliente
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 font-medium">Arquivos</h2>
          <form
            action={async (formData) => {
              'use server'
              formData.set('client_id', params.id)
              await uploadAttachmentAction(formData)
            }}
            className="mb-4 space-y-4"
          >
            <Input name="file" type="file" required className="min-h-11" />
            <SubmitButton>Enviar arquivo</SubmitButton>
          </form>
          {attachments.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhum arquivo anexado.</p>
          ) : (
            <ul className="space-y-2">
              {attachments.map((file) => (
                <li
                  key={file.id}
                  className="flex min-h-11 items-center justify-between rounded-lg border px-3"
                >
                  <span className="text-sm">{file.file_name}</span>
                  <form
                    action={async () => {
                      'use server'
                      await deleteAttachmentAction(file.id)
                    }}
                  >
                    <Button type="submit" variant="ghost" size="sm">
                      Excluir
                    </Button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
