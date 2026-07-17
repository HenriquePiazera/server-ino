# Deploy Meta A — Beta gratuito (sem CNPJ / sem cobrança)

Guia para colocar o **server-ino** no ar para amigos testarem, com `BILLING_ENABLED=false`.

## 1. Pré-requisitos

- Conta [Vercel](https://vercel.com) (grátis)
- Projeto [Supabase](https://supabase.com) (PostgreSQL + Storage)
- Conta [Resend](https://resend.com) (opcional, e-mail grátis até ~3k/mês)

## 2. Banco de dados (Supabase)

1. Crie o projeto no Supabase.
2. Copie a **connection string** do Session pooler (IPv4).
3. No terminal local (com `.env` apontando para produção):

```bash
npm run db:push
npm run db:backfill-v2
```

4. Crie o bucket **`attachments`** no Storage (público ou privado conforme sua config).
5. Teste: `node scripts/test-storage.mjs`

## 3. Deploy na Vercel

1. Importe o repositório **server-ino** na Vercel.
2. **Project Name:** `server-ino`
3. **Root Directory:** `.` (raiz do repositório — não use subpasta)
4. Framework: Next.js (detectado automaticamente).

### Variáveis de ambiente (Production)

| Variável | Obrigatório | Notas |
|----------|-------------|-------|
| `DATABASE_URL` | Sim | Session pooler Supabase |
| `AUTH_SECRET` | Sim | `openssl rand -base64 32` |
| `NEXTAUTH_SECRET` | Sim | Mesmo valor do `AUTH_SECRET` |
| `NEXTAUTH_URL` | Sim | `https://server-ino.vercel.app` ou seu domínio |
| `ENCRYPTION_MASTER_KEY` | Sim | **Faça backup** — perder = perder dados criptografados |
| `BILLING_ENABLED` | Sim | `false` |
| `CRON_SECRET` | Sim | `openssl rand -hex 32` — Vercel envia no cron |
| `NEXT_PUBLIC_SUPABASE_URL` | Sim | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Sim | Service role key |
| `PLATFORM_OWNER_EMAILS` | Sim | Seu e-mail (acesso `/internal`) |
| `RESEND_API_KEY` | Recomendado | Sem placeholder — ver [SETUP_NOTIFICATIONS.md](./SETUP_NOTIFICATIONS.md) |
| `RESEND_FROM_EMAIL` | Recomendado | `onboarding@resend.dev` ou domínio verificado |
| `VAPID_PUBLIC_KEY` | Opcional | `npx web-push generate-vapid-keys` |
| `VAPID_PRIVATE_KEY` | Opcional | Par do public |
| `VAPID_SUBJECT` | Opcional | `mailto:seu@email.com` |
| `BETA_ALLOWED_EMAILS` | Opcional | E-mails permitidos no cadastro (vírgula) |
| `NEXT_PUBLIC_SENTRY_DSN` | Opcional | Monitoramento de erros |

4. Deploy → aguarde build verde.

## 4. Validar antes de convidar amigos

```bash
npm run validate:env -- --production
npm run build
```

Checklist manual:

- [ ] `/register` → onboarding → dashboard
- [ ] Configurar serviço + horário + página pública
- [ ] Abrir `/p/[slug]` no celular (URL pública, não localhost)
- [ ] Agendar → confirmar em `/confirm/[token]`
- [ ] Cron: Vercel → Project → Cron Jobs → `/api/cron/reminders` (horário)
- [ ] `GET /api/health` retorna `{ "status": "ok" }`

## 5. Beta fechado (só amigos)

Defina na Vercel:

```
BETA_ALLOWED_EMAILS=amigo1@gmail.com,amigo2@hotmail.com
```

Somente esses e-mails poderão criar conta. Deixe vazio para cadastro aberto.

## 6. Cron de lembretes

O `vercel.json` agenda o cron **a cada hora**. A rota `/api/cron/reminders` exige:

```
Authorization: Bearer <CRON_SECRET>
```

A Vercel envia isso automaticamente quando `CRON_SECRET` está configurado.

## 7. O que NÃO configurar agora

- Gateway de pagamento (Stripe, etc.)
- `BILLING_ENABLED=true`
- CNPJ / termos comerciais formais
- SMS Zenvia (V3, pago)

## 8. Backup

- Exporte/registre `ENCRYPTION_MASTER_KEY` em local seguro.
- Ative backups automáticos no Supabase (Dashboard → Database → Backups).

## 9. Problemas comuns

| Problema | Solução |
|----------|---------|
| Login falha em produção | Confirme `NEXTAUTH_URL` = URL HTTPS exata |
| QR Code aponta localhost | Acesse o app pela URL pública antes de copiar |
| E-mail não chega | Configure Resend; sem Resend, link aparece na tela |
| Upload falha | Bucket `attachments` + `SUPABASE_SERVICE_ROLE_KEY` |
| Cron 401 | `CRON_SECRET` igual na Vercel e no header do cron |
