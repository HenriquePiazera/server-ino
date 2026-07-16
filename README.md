# server ino

SaaS de agenda e gestão para profissionais autônomos.

## Desenvolvimento local

```bash
npm install
cp .env.example .env   # configure DATABASE_URL e secrets
npm run db:push
npm run dev
```

## Beta em produção (Meta A)

Guia completo: **[docs/DEPLOY_META_A.md](docs/DEPLOY_META_A.md)**

Validar ambiente:

```bash
npm run validate:env
npm run validate:env -- --production
npm run build
```

## Scripts úteis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor local |
| `npm run build` | Build de produção |
| `npm run db:push` | Sincroniza schema Prisma |
| `npm run db:backfill-v2` | Slugs públicos para usuários antigos |
| `npm run validate:env` | Valida variáveis de ambiente |
| `node scripts/test-storage.mjs` | Testa Supabase Storage |

## Modo beta

- `BILLING_ENABLED=false` — sem cobrança, tudo liberado
- `BETA_ALLOWED_EMAILS` — opcional, restringe cadastro a e-mails convidados

## Deploy na Vercel

- **Project Name:** `server-ino`
- **Root Directory:** `.` (raiz do repositório)
- URL padrão: `https://server-ino.vercel.app`
