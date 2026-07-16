# Setup Supabase — server ino

## 1. Criar projeto

1. Acesse [supabase.com](https://supabase.com) e crie um projeto (região `South America` se disponível).
2. Anote a senha do banco definida na criação.

## 2. Obter connection string

No dashboard: **Connect → ORMs → Prisma** (ou **Connection string → URI**).

**Importante (IPv4 / Windows):** não use a conexão direta `db.[PROJECT_REF].supabase.co` — ela costuma ser só IPv6. Use o **Session pooler** (porta 5432):

```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-1-sa-east-1.pooler.supabase.com:5432/postgres
```

O host `aws-0-*` / `aws-1-*` e a região variam por projeto — copie a string exata do dashboard.

Se a senha tiver `@`, codifique só esse caractere como `%40` na URL (ex.: `senha%40abc`, não encode a senha inteira).

Recomendado: em **Database → Settings**, use **Generate password** (senha sem caracteres especiais) para evitar erros de parsing.

## 3. Configurar variáveis de ambiente

Na raiz do projeto (`server-ino/`):

```powershell
cd D:\server-ino
node scripts/generate-secrets.mjs
```

Edite `.env` e substitua `DATABASE_URL` pela string do Supabase.

Para **Storage** (Fase 7), adicione também no `.env`:

### `NEXT_PUBLIC_SUPABASE_URL`

1. Dashboard do Supabase → ícone **⚙️ Project Settings** (canto inferior esquerdo)
2. Menu **API**
3. Em **Project URL**, copie o valor (ex.: `https://sfyzhibgaszpjrqkfxbb.supabase.co`)
4. Cole no `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://sfyzhibgaszpjrqkfxbb.supabase.co"
```

> No seu projeto, essa URL **já está preenchida** corretamente.

### `SUPABASE_SERVICE_ROLE_KEY`

Na mesma página **Project Settings → API**:

1. Role até **Project API keys**
2. Localize a chave **`service_role`** (rótulo *secret*)
3. Clique em **Reveal** / **Copy** (ícone de olho ou copiar)
4. Cole no `.env` — use aspas, a chave é longa e começa com `eyJ`:

```env
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Não use** a chave `anon` / `public` — ela não tem permissão para upload no bucket privado.

**Salve o arquivo `.env`** (Ctrl+S) após colar.

Validar Storage:

```powershell
node scripts/test-storage.mjs
```

## 4. Aplicar schema e validar

```powershell
npx prisma generate
npx prisma db push
npm run db:validate
npm run build
```

## 5. Bucket de arquivos (Fase 7)

No Supabase Dashboard → Storage → New bucket:

- Nome: `attachments`
- Público: **não** (privado, acesso via service role)
