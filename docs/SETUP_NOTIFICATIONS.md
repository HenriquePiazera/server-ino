# Setup — Push PWA + Resend (e-mail)

Notificações automáticas do **server-ino**: push (grátis) → e-mail Resend (grátis até 3k/mês).

## 1. Push PWA (VAPID)

Gera chaves e preenche o `.env`:

```powershell
npm run setup:notifications
```

Variáveis:

| Variável | Descrição |
|----------|-----------|
| `VAPID_PUBLIC_KEY` | Chave pública (exposta ao browser) |
| `VAPID_PRIVATE_KEY` | Chave privada (só servidor) |
| `VAPID_SUBJECT` | `mailto:seu@email.com` |

**Produção (Vercel):** copie as três variáveis para Environment → Production.

### Como o cliente recebe push

1. Acessa `/p/[slug]` da página pública
2. Clica **Ativar notificações** (ou aceita após agendar)
3. A subscription fica em `Client.push_subscription`
4. Lembretes e confirmações usam push primeiro (`notification.service.ts`)

## 2. Resend (e-mail)

1. Crie conta em [resend.com](https://resend.com)
2. **API Keys** → Create API Key
3. No `.env` e na Vercel:

```
RESEND_API_KEY=re_sua_chave_aqui
RESEND_FROM_EMAIL=onboarding@resend.dev
```

Para testes, `onboarding@resend.dev` funciona sem domínio. Em produção, verifique seu domínio no Resend.

### Testar envio

```powershell
npm run test:notifications
npm run test:notifications -- --email=seu@email.com
```

## 3. Validar

```powershell
npm run validate:env
curl http://localhost:3000/api/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "resend": true,
  "push": true
}
```

## 4. Deploy (Vercel)

Adicione em **Production**:

- `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
- `CRON_SECRET` (lembretes automáticos 24h antes)

Ver também: [DEPLOY_META_A.md](./DEPLOY_META_A.md)
