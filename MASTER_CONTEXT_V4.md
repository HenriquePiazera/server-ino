# MASTER_CONTEXT_V4.md

---

## VISÃO GERAL DO PRODUTO

**Nome Provisório**
A definir.

Possíveis conceitos:
- Atendo
- Facilita
- Minha Assistente
- Organiza
- Conta Comigo

**Posicionamento desejado:**
"A assistente digital do profissional autônomo."

---

## PROPÓSITO DO PRODUTO

Criar um SaaS simples para profissionais autônomos e pequenos prestadores de serviços que atendem clientes por horário marcado e precisam organizar:

- Clientes
- Agendamentos
- Histórico de atendimentos
- Evolução dos atendimentos
- Arquivos
- Recebimentos

O sistema deve ser simples, intuitivo e acessível.

---

## MISSÃO DO PRODUTO

Ajudar profissionais autônomos a organizar seus atendimentos e clientes sem depender de:

- Cadernos
- Agendas de papel
- Planilhas
- Anotações dispersas
- WhatsApp como ferramenta principal de gestão

---

## PÚBLICO-ALVO

**Público Principal**
Profissionais autônomos que atendem clientes por horário marcado.

Exemplos:
- Psicólogos
- Nutricionistas
- Fisioterapeutas
- Esteticistas
- Massoterapeutas
- Terapeutas
- Quiropraxistas
- Osteopatas
- Personal Trainers
- Barbeiros
- Manicures

**Possíveis Segmentos Futuros**
- Lavadores de veículos
- Lavadores de sofás
- Limpeza de vidros
- Limpeza de telhados
- Prestadores de serviço com atendimento recorrente

**Perfil do Cliente Ideal**
O cliente ideal normalmente:
- Trabalha sozinho
- É MEI ou profissional autônomo
- Possui orçamento limitado para software
- Não possui equipe administrativa
- Utiliza principalmente celular
- Organiza clientes manualmente
- Utiliza WhatsApp como principal ferramenta
- Busca simplicidade

**Estrutura do Negócio**
Prioridade:
- Profissionais individuais
- Negócios com até 4 profissionais

Não otimizar para empresas médias ou grandes.

---

## FLUXO DE NEGÓCIO OFICIAL

```
Cliente → Agendamento → Atendimento → Registro → Pagamento → Retorno
```

Toda funcionalidade deve apoiar esse fluxo.

---

## O QUE O SISTEMA É

"A assistente digital do profissional autônomo."

Ajuda o profissional a:
- Organizar clientes
- Organizar agenda
- Registrar histórico
- Registrar evolução
- Armazenar fotos e documentos
- Controlar recebimentos
- Reduzir faltas

---

## O QUE O SISTEMA NÃO É

Não implementar:
- ERP
- Controle de estoque
- Controle de fornecedores
- Compras / Produção / Logística
- Marketplace / Delivery
- Sistema hospitalar, odontológico ou médico complexo
- Controle de convênios
- Folha de pagamento
- Emissão fiscal complexa

Toda sugestão que leve o produto para essas áreas deve ser questionada antes da implementação.

---

## DIFERENCIAL DO PRODUTO

O principal valor não é a agenda.

O principal valor é:
- Organização
- Histórico
- Evolução dos atendimentos
- Fotos e documentos
- Simplicidade
- Facilidade de uso
- Aplicação em diversos segmentos

A agenda é apenas uma ferramenta necessária.

---

## ESTRATÉGIA DE DISTRIBUIÇÃO (MELHORIA #3)

### Canal de Aquisição Inicial
- Instagram orgânico segmentado por nicho (barbeiros, psicólogos, esteticistas)
- Grupos de WhatsApp e Telegram de profissionais autônomos
- Indicação entre profissionais do mesmo segmento
- Parcerias com associações e cursos profissionalizantes

### Trial
- 14 dias grátis com acesso completo ao plano Profissional
- Sem exigir cartão de crédito no cadastro
- E-mail de onboarding automático no D+1, D+7 e D+13

### Metas de Validação por Versão
- **V1 (MVP):** 20 usuários ativos, 5 pagantes, NPS coletado
- **V2:** 100 usuários ativos, 30 pagantes, taxa de retenção > 70% em 60 dias
- **V3:** 300 usuários ativos, 100 pagantes, churn mensal < 5%

---

## ESTRATÉGIA DE MONETIZAÇÃO (REVISADA — MELHORIA #5)

### Lógica de Segmentação
O corte entre planos não deve bloquear funcionalidades que demonstram o valor central do produto. Arquivos e financeiro fazem parte do diferencial e devem estar acessíveis desde cedo.

### Planos

**Trial — Grátis por 14 dias**
- Acesso completo ao Plano Profissional
- Sem cartão de crédito

**Plano Solo — R$ 39,90/mês**
- 1 profissional
- Até 100 clientes ativos
- Agenda completa
- Histórico e evolução
- Arquivos (até 2 GB)
- Financeiro básico
- Lembretes manuais gerados pelo sistema (envio manual pelo profissional)

**Plano Profissional — R$ 59,90/mês**
- 1 profissional
- Clientes ilimitados
- Tudo do Solo
- Armazenamento ilimitado
- Lembretes automáticos (SMS + E-mail)
- Relatórios gerenciais
- Página pública de agendamento

**Plano Equipe — R$ 99,90/mês**
- Até 4 profissionais
- Tudo do Profissional por profissional
- Painel unificado
- Agenda compartilhada

### Limites Técnicos por Plano (MELHORIA #10)

| Recurso | Solo | Profissional | Equipe |
|---|---|---|---|
| Profissionais | 1 | 1 | até 4 |
| Clientes ativos | 100 | ilimitado | ilimitado |
| Armazenamento | 2 GB | ilimitado | ilimitado |
| Lembretes automáticos | ✗ | ✓ | ✓ |
| Página pública | ✗ | ✓ | ✓ |
| Relatórios | básico | completo | completo |

---

## MVP (VERSÃO 1)

### Autenticação
- Login
- Cadastro
- Recuperação de senha
- Controle de sessão

### Clientes
Campos mínimos:
- Nome
- Telefone
- E-mail
- Data de nascimento
- Observações

### Agenda
- Criar agendamento
- Editar agendamento
- Cancelar agendamento
- Reagendar atendimento

**Status:**
- Agendado
- Aguardando confirmação
- Confirmado
- Realizado
- Cancelado

**Regras de Conflito de Agenda (MELHORIA #8)**

O sistema deve bloquear agendamentos que causem:
- Sobreposição total: dois agendamentos com horários idênticos
- Sobreposição parcial: novo agendamento começa antes do anterior terminar
- Margem mínima: o profissional define, **em cada agendamento**, um buffer após aquele atendimento específico (0, 10, 15 ou 30 minutos) — não é uma configuração global da conta. Ex: uma avaliação inicial pode levar um buffer maior que um retorno rápido. Campo `buffer_minutes` vive em `Appointment`, não em `User`.

Comportamento:
- Frontend bloqueia visualmente os horários ocupados
- Backend valida independentemente do frontend
- Erro retornado: `APPOINTMENT_CONFLICT` com horário conflitante na mensagem

### Lembrete Manual no V1 (MELHORIA #4)
No V1, o sistema gera uma mensagem pré-formatada que o profissional copia e envia pelo canal que preferir (WhatsApp pessoal, SMS, ou qualquer outro):

```
Olá [Nome do Cliente], tudo bem?
Passando para lembrar do seu atendimento amanhã,
[data] às [hora].
Confirme respondendo SIM ou entre em contato para reagendar.
```

O botão "Copiar lembrete" copia a mensagem para a área de transferência.
Sem integração de API no V1. Entrega valor imediato com complexidade zero.

### Histórico de Atendimento
Campos:
- Data
- Descrição
- Observações
- Evolução (texto livre — dado sensível, ver seção LGPD)

### Arquivos
Permitir anexar:
- Fotos
- PDFs
- Documentos

Associados ao cliente ou atendimento.

### Financeiro
Campos:
- Valor
- Data
- Forma de pagamento
- Status

Sem contabilidade. Sem emissão fiscal.

### Onboarding Guiado (MELHORIA #6)
O onboarding faz parte do MVP. Primeira sessão após cadastro:

**Passo 1 — Cadastrar primeiro cliente**
Tela simplificada: apenas nome e telefone obrigatórios.

**Passo 2 — Criar primeiro agendamento**
Seleção de data e hora com calendário visual.

**Passo 3 — Registrar primeiro atendimento**
Campo de descrição simples com placeholder orientando o uso.

Progresso visual (barra ou steps). Após os 3 passos, o profissional já vivenciou o fluxo completo e tem dados reais na conta.

---

## ROADMAP OFICIAL

### V1 — MVP
- Autenticação
- Clientes
- Agenda com regras de conflito
- Histórico e evolução
- Arquivos
- Financeiro básico
- Lembrete manual gerado pelo sistema (cópia de mensagem)
- Onboarding guiado

**Objetivo:** Validar o produto com usuários reais.
**Meta:** 20 usuários ativos, 5 pagantes.

### V2
- Página pública de agendamento (`/p/[slug-do-profissional]`)
- PWA — cliente instala o app via link ou QR Code do profissional
- Push notification via PWA (gratuito, canal principal)
- QR Code gerado automaticamente para cada profissional
- Lembretes automáticos via **E-mail (Resend)** como fallback
- Confirmação de agendamento por link
- Aviso de cancelamento e alteração de horário
- Dashboard gerencial

**Objetivo:** Reduzir faltas e aumentar retenção.
**Meta:** 100 usuários ativos, 30 pagantes.

---

### V2 — Convite de Equipe (plano Equipe, MELHORIA #14)

**Pré-requisito:** só faz sentido quando o plano Equipe estiver ativo para o profissional (`user.plan === 'team'`).

**Entidade nova — `TeamMember`:**

```prisma
model TeamMember {
  id         String   @id @default(cuid())
  owner_id   String   // User dono da conta (quem paga o plano Equipe)
  member_id  String   // User convidado para a equipe
  role       String   @default("member")  // "member" | "admin"
  status     String   @default("invited") // "invited" | "active" | "removed"
  invited_at DateTime @default(now())
  joined_at  DateTime?

  owner  User @relation("TeamOwner", fields: [owner_id], references: [id])
  member User @relation("TeamMembership", fields: [member_id], references: [id])

  @@unique([owner_id, member_id])
}
```

Adicionar ao `User`:
```prisma
model User {
  // ...campos existentes
  team_owned    TeamMember[] @relation("TeamOwner")
  team_memberships TeamMember[] @relation("TeamMembership")
}
```

**Regras de negócio:**
- Convite pendente (`status: 'invited'`) **não conta** contra o limite `max_professionals` do plano — só conta depois que o convidado aceita e o status vira `active`. Isso evita o profissional ficar com vagas "presas" por convites não respondidos.
- A checagem de limite acontece no momento do **convite**, não da aceitação — evita enviar convites além do que o plano permite.
- Apenas o `owner` (dono da assinatura Equipe) pode convidar, remover ou alterar `role` de membros.

**Query — `inviteTeamMember` (server action):**

```typescript
// src/features/team/services/invite-team-member.ts
'use server'

import { prisma } from '@/lib/prisma'
import { checkPlanLimit } from '@/lib/plan-limits'
import { logAudit } from '@/lib/audit'
import { ERROR_CODES } from '@/lib/error-codes'
import { z } from 'zod'

const inviteTeamMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(['member', 'admin']).default('member'),
})

export async function inviteTeamMember(
  ownerId: string,
  input: z.infer<typeof inviteTeamMemberSchema>
) {
  const parsed = inviteTeamMemberSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, errorCode: ERROR_CODES.INVALID_INPUT }
  }

  // 1. Verifica se o dono está no plano Equipe
  const owner = await prisma.user.findUnique({ where: { id: ownerId } })
  if (!owner || owner.plan !== 'team') {
    return { success: false, errorCode: ERROR_CODES.PLAN_REQUIRED }
  }

  // 2. Verifica limite de profissionais do plano ANTES de criar o convite
  const limitCheck = await checkPlanLimit(ownerId, 'max_professionals')
  if (!limitCheck.allowed) {
    return { success: false, errorCode: limitCheck.errorCode }
  }

  // 3. Localiza (ou orienta a criar) o usuário convidado pelo e-mail
  const invitedUser = await prisma.user.findUnique({ where: { email: parsed.data.email } })
  if (!invitedUser) {
    return { success: false, errorCode: 'USER_NOT_FOUND_INVITE_PENDING_SIGNUP' }
  }

  // 4. Evita convite duplicado
  const existing = await prisma.teamMember.findUnique({
    where: { owner_id_member_id: { owner_id: ownerId, member_id: invitedUser.id } },
  })
  if (existing && existing.status !== 'removed') {
    return { success: false, errorCode: 'TEAM_MEMBER_ALREADY_INVITED' }
  }

  // 5. Cria o convite com status 'invited' — não conta contra o limite até aceitar
  const teamMember = await prisma.teamMember.create({
    data: {
      owner_id: ownerId,
      member_id: invitedUser.id,
      role: parsed.data.role,
      status: 'invited',
    },
  })

  await logAudit({
    userId: ownerId,
    operation: 'team_member.invite',
    entity: 'TeamMember',
    entityId: teamMember.id,
  })

  // 6. Disparo de e-mail de convite via Resend fica fora deste escopo — ver serviço de notificações V2
  return { success: true, teamMemberId: teamMember.id }
}
```

**Adicionar ao catálogo de erros (`ERROR_CODES`):**
```typescript
PLAN_LIMIT_PROFESSIONALS: 'Limite de profissionais do seu plano atingido.',
TEAM_MEMBER_ALREADY_INVITED: 'Este profissional já foi convidado para a equipe.',
USER_NOT_FOUND_INVITE_PENDING_SIGNUP: 'Convite registrado. O profissional precisa criar uma conta com este e-mail para ingressar na equipe.',
```

### V3
- Controle simplificado de MEI
- Relatórios avançados
- Multi-profissionais
- Templates de evolução
- Automações básicas
- SMS via Zenvia como camada final de alcance (clientes sem e-mail e sem PWA instalado)

**Objetivo:** Aumentar valor percebido e ticket médio.
**Meta:** 300 usuários ativos, 100 pagantes.

### V4
- CRM simples (clientes inativos, sugestão de retorno)
- Campanhas de relacionamento (E-mail via Resend — WhatsApp API permanece fora do roadmap, ver seção NOTIFICAÇÕES)
- Automações avançadas
- Dashboard de negócio com indicadores
- Templates de anamnese

**Objetivo:** Transformar o sistema em assistente digital completo.
**Pré-requisito:** V3 validado com feedback real de usuários pagantes.

---

## LGPD E PRIVACIDADE (MELHORIA #1)

### Classificação de Dados

| Dado | Sensibilidade | Base Legal |
|---|---|---|
| Nome, telefone, e-mail do cliente | Pessoal | Legítimo interesse / contrato |
| Data de nascimento | Pessoal | Legítimo interesse |
| Evolução clínica, histórico de saúde | **Sensível** | Consentimento explícito |
| Fotos de procedimentos | **Sensível** | Consentimento explícito |
| Dados financeiros | Pessoal | Execução de contrato |

### Obrigações do Sistema
- O profissional é o **controlador** dos dados dos seus clientes
- O sistema é o **operador**
- Deve existir um Termo de Uso e Política de Privacidade antes do lançamento
- Consentimento explícito deve ser coletado do profissional no cadastro

### Direitos do Usuário (profissional)
- **Exportação:** o sistema deve permitir exportar todos os dados em formato legível (CSV/JSON) a qualquer momento
- **Exclusão:** ao cancelar a conta, o profissional pode solicitar exclusão completa dos dados
- **Prazo de retenção após cancelamento:** 30 dias para exportação, depois exclusão permanente

### Direitos dos Clientes do Profissional
- O profissional é responsável por obter consentimento dos seus próprios clientes
- O sistema deve fornecer orientações sobre isso no onboarding

### Retenção de Dados
- Dados ativos: mantidos enquanto a conta estiver ativa
- Após cancelamento: 30 dias de carência para exportação
- Logs de auditoria: 90 dias
- Backups: 30 dias com exclusão automática

---

## SEGURANÇA E CRIPTOGRAFIA (MELHORIA #2)

### Classificação de Campos Sensíveis

Os seguintes campos devem ser criptografados em nível de aplicação antes de persistir no banco:

```
ServiceRecord.description
ServiceRecord.evolution
Client.notes
Attachment.file_url (apenas a referência; o arquivo em si é protegido por ACL no storage)
```

### Estratégia de Criptografia (MELHORIA #13 — Chave por Profissional / Envelope Encryption)

**Decisão:** Opção C — cada profissional (`User`) tem sua própria DEK (Data Encryption Key), gerada na criação da conta. A DEK é criptografada por uma chave mestra (KEK) e armazenada na própria tabela `User`. Nenhum dado de dois profissionais diferentes é decifrável com a mesma chave.

**Por que não uma única chave global (rejeitado):** com uma `ENCRYPTION_KEY` única para todo o sistema, o vazamento dessa chave (env var exposta, `.env` commitado, acesso indevido ao painel de deploy) descriptografa o histórico clínico de **todos** os profissionais e clientes simultaneamente. Não há contenção de dano.

**Como funciona com chave por profissional:**
- Se uma DEK específica vazar (ou um bug expuser dados de um profissional), o dano fica restrito àquele profissional — não à base inteira.
- A KEK (chave mestra) nunca criptografa dados de cliente diretamente; ela só criptografa/descriptografa as DEKs.
- Rotacionar a KEK não exige re-criptografar todo o histórico clínico do banco — só re-envelopar as DEKs (operação muito mais barata).

**Algoritmo:** AES-256-GCM (mantido) para ambas as camadas — DEK criptografando campos, KEK criptografando DEKs.

**Onde vive cada chave:**
- KEK: variável de ambiente (`ENCRYPTION_MASTER_KEY`), nunca no banco, nunca no código, nunca versionada.
- DEK: gerada por profissional, armazenada **já criptografada pela KEK** na tabela `User` (coluna `encrypted_dek`). Em texto puro, a DEK só existe na memória do processo, durante o tempo da operação de encrypt/decrypt.

### Alteração no Schema — `User`

```prisma
model User {
  id                 String   @id @default(cuid())
  name               String
  email              String   @unique
  password_hash      String
  plan               String   @default("trial")
  plan_status        String   @default("trialing")
  trial_ends_at      DateTime?
  subscription_id    String?
  storage_used_bytes Int      @default(0)

  // MELHORIA #13 — envelope encryption
  encrypted_dek      String   // DEK do profissional, já cifrada pela KEK (armazenada como base64: iv + authTag + ciphertext)
  dek_created_at     DateTime @default(now())

  created_at         DateTime @default(now())
  updated_at         DateTime @updatedAt
}
```

`encrypted_dek` é preenchida uma única vez, no momento do cadastro do usuário (ver `crypto.ts` abaixo). Nunca é editável manualmente.

### `src/lib/crypto.ts` — Implementação Completa

```typescript
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import { prisma } from '@/lib/prisma'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12       // recomendado para GCM
const AUTH_TAG_LENGTH = 16

// KEK — chave mestra, nunca sai do ambiente do servidor
function getMasterKey(): Buffer {
  const key = process.env.ENCRYPTION_MASTER_KEY
  if (!key) {
    throw new Error('ENCRYPTION_MASTER_KEY não configurada no ambiente.')
  }
  const buffer = Buffer.from(key, 'base64')
  if (buffer.length !== 32) {
    throw new Error('ENCRYPTION_MASTER_KEY deve ter 32 bytes (256 bits) em base64.')
  }
  return buffer
}

// Criptografia genérica AES-256-GCM — usada tanto para DEK quanto para campos de dados
function encryptWithKey(plainText: string, key: Buffer): string {
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  // Formato armazenado: iv + authTag + ciphertext, tudo em base64
  return Buffer.concat([iv, authTag, encrypted]).toString('base64')
}

function decryptWithKey(payload: string, key: Buffer): string {
  const buffer = Buffer.from(payload, 'base64')
  const iv = buffer.subarray(0, IV_LENGTH)
  const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH)
  const ciphertext = buffer.subarray(IV_LENGTH + AUTH_TAG_LENGTH)

  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  return decrypted.toString('utf8')
}

// ── Gestão de DEK por profissional ────────────────────────────────────────

/**
 * Gera uma nova DEK para um profissional recém-criado.
 * Chamar UMA ÚNICA VEZ, dentro da transação de criação do User.
 * Retorna o valor já criptografado pela KEK, pronto para salvar em `encrypted_dek`.
 */
export function generateEncryptedDek(): string {
  const dek = randomBytes(32) // 256 bits
  const kek = getMasterKey()
  return encryptWithKey(dek.toString('base64'), kek)
}

/**
 * Descriptografa a DEK de um profissional específico usando a KEK.
 * Nunca cachear o retorno fora do escopo da requisição.
 */
function decryptDek(encryptedDek: string): Buffer {
  const kek = getMasterKey()
  const dekBase64 = decryptWithKey(encryptedDek, kek)
  return Buffer.from(dekBase64, 'base64')
}

// ── API pública usada pelo resto do sistema ────────────────────────────────

/**
 * Criptografa um campo sensível usando a DEK do profissional dono do dado.
 * userId é OBRIGATÓRIO — nunca criptografar sem saber de qual profissional é a DEK.
 */
export async function encryptField(plainText: string, userId: string): Promise<string> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { encrypted_dek: true },
  })
  const dek = decryptDek(user.encrypted_dek)
  return encryptWithKey(plainText, dek)
}

/**
 * Descriptografa um campo sensível usando a DEK do profissional dono do dado.
 */
export async function decryptField(cipherText: string, userId: string): Promise<string> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { encrypted_dek: true },
  })
  const dek = decryptDek(user.encrypted_dek)
  return decryptWithKey(cipherText, dek)
}
```

**Uso prático em um repository/service:**

```typescript
// Criação de usuário — gera a DEK uma única vez
const encryptedDek = generateEncryptedDek()
await prisma.user.create({
  data: { name, email, password_hash, encrypted_dek: encryptedDek },
})

// Escrita de um campo sensível (ex: evolução clínica)
const encryptedEvolution = await encryptField(evolutionText, userId)
await prisma.serviceRecord.create({
  data: { ..., evolution: encryptedEvolution, user_id: userId },
})

// Leitura de um campo sensível
const record = await prisma.serviceRecord.findFirst({ where: { id, user_id: userId } })
const evolution = record.evolution ? await decryptField(record.evolution, userId) : null
```

**Regras obrigatórias (reforçar em "REGRAS PARA IA"):**
- `encryptField`/`decryptField` sempre recebem o `userId` do dono do dado — nunca assumir ou inferir.
- Nunca logar a DEK em texto puro, nem em erro, nem em auditoria (ver seção LOGS E AUDITORIA).
- `ENCRYPTION_MASTER_KEY` é gerada uma única vez para todo o ambiente (produção) e nunca rotacionada sem um plano de re-envelopamento de todas as `encrypted_dek`.
- Perda da `ENCRYPTION_MASTER_KEY` é irrecuperável: todas as DEKs (e portanto todos os dados sensíveis de todos os profissionais) tornam-se ilegíveis permanentemente. Backup seguro da KEK fora do repositório e fora da Vercel é obrigatório (ex: gerenciador de senhas da equipe, ou secret manager dedicado).

### Isolamento de Dados
Todo dado pertence a um usuário.
Toda consulta deve validar `id` + `userId`.
Nunca acessar registros apenas pelo `id`.

### Autenticação
Toda rota protegida exige sessão válida.

### Autorização
Usuários só podem acessar seus próprios dados.
Toda autorização deve ser validada no backend, nunca apenas no frontend.

### Upload de Arquivos
Validar:
- Tipo (whitelist: jpg, jpeg, png, webp, pdf, doc, docx)
- Tamanho máximo: 10 MB por arquivo
- Permissões: apenas o dono do cliente pode fazer upload

---

## ENTIDADES PRINCIPAIS (REVISADAS)

### User (MELHORIA #9)
```typescript
{
  id: string
  name: string
  email: string
  password_hash: string
  plan: 'trial' | 'solo' | 'professional' | 'team'
  plan_status: 'active' | 'past_due' | 'canceled' | 'trialing'
  trial_ends_at: Date | null
  subscription_id: string | null        // ID externo do Stripe
  storage_used_bytes: number            // controle de limite de storage
  encrypted_dek: string                 // DEK do profissional cifrada pela KEK — ver SEGURANÇA E CRIPTOGRAFIA (MELHORIA #13)
  dek_created_at: Date
  created_at: Date
  updated_at: Date
}
```

### Client
```typescript
{
  id: string
  user_id: string
  name: string
  phone: string
  email: string | null
  birth_date: Date | null
  notes: string | null                  // criptografado
  push_subscription: string | null      // JSON da Web Push subscription — vinculado a este profissional
  pwa_installed_at: Date | null         // data em que o cliente instalou o PWA deste profissional
  created_at: Date
  updated_at: Date
}
```

### Appointment
```typescript
{
  id: string
  client_id: string
  user_id: string
  start_time: Date
  end_time: Date
  status: 'scheduled' | 'awaiting_confirmation' | 'confirmed' | 'completed' | 'canceled'
  notes: string | null
  buffer_minutes: number                // margem após o atendimento
  created_at: Date
  updated_at: Date
}
```

### AppointmentConfirmation
```typescript
{
  id: string
  appointment_id: string
  token: string
  status: 'pending' | 'confirmed' | 'expired'
  sent_at: Date
  confirmed_at: Date | null
}
```

### ServiceRecord (MELHORIA #11)
```typescript
{
  id: string
  appointment_id: string
  client_id: string
  user_id: string                       // redundância intencional de segurança
  description: string                   // criptografado
  evolution: string | null              // criptografado — dado clínico sensível
  created_at: Date
  updated_at: Date
}
```

### Attachment
```typescript
{
  id: string
  client_id: string
  service_record_id: string | null
  user_id: string                       // redundância intencional de segurança
  file_url: string                      // criptografado
  file_name: string
  file_type: string
  file_size_bytes: number
  uploaded_at: Date
}
```

### Payment
```typescript
{
  id: string
  client_id: string
  appointment_id: string | null
  user_id: string
  amount: number
  payment_method: 'cash' | 'pix' | 'credit_card' | 'debit_card' | 'transfer' | 'other'
  status: 'pending' | 'paid' | 'canceled'
  paid_at: Date | null
  created_at: Date
}
```

### AuditLog (MELHORIA #12)
```typescript
{
  id: string
  user_id: string
  operation: string                     // ex: 'client.create', 'appointment.cancel'
  entity: string                        // ex: 'Client', 'Appointment'
  entity_id: string
  ip_address: string | null
  created_at: Date
}
```

---

## ARQUITETURA OFICIAL

### Stack Tecnológica

**Frontend:**
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend:**
- Server Actions (operações principais)
- API Routes (webhooks, integrações externas)

**Banco:**
- PostgreSQL

**ORM:**
- Prisma

**Autenticação:**
- Auth.js

**Storage:**
- Supabase Storage

**Criptografia:**
- AES-256-GCM via `src/lib/crypto.ts`

**Monitoramento de Erros:**
- Sentry

**Logs de Auditoria:**
- Tabela `AuditLog` no próprio banco

**Deploy:**
- Vercel

### Princípios Arquiteturais
- Monólito modular
- Simplicidade acima de sofisticação
- Baixo custo operacional
- Fácil manutenção por um único desenvolvedor
- Evolução incremental
- Escalar apenas quando necessário

Não utilizar:
- Microsserviços
- Event Driven
- Arquitetura distribuída
- Múltiplos bancos
- Complexidade prematura

### Estrutura Oficial de Pastas

```
src/
  app/
  components/
  features/
    auth/
    clients/
    appointments/
    records/
    attachments/
    payments/
    onboarding/
  services/
  repositories/
  schemas/
  lib/
    crypto.ts           // encryptField(text, userId) / decryptField(text, userId) — chave por profissional (MELHORIA #13)
    audit.ts            // logAudit()
    plan-limits.ts      // checkPlanLimit()
  hooks/
  types/
```

---

## PADRÕES MOBILE FIRST (MELHORIA #7)

Mobile First não é apenas um princípio — é um critério técnico verificável.

### Critérios Obrigatórios

**Layout:**
- Toda tela funciona em 375px de largura (iPhone SE) sem scroll horizontal
- Toda tela funciona em 390px (iPhone 14) como referência principal
- Breakpoint tablet: 768px
- Breakpoint desktop: 1024px

**Interação:**
- Nenhuma ação crítica exige hover (hover é apenas enhancement)
- Botões de ação com altura mínima de 44px (padrão Apple HIG)
- Áreas de toque com mínimo de 44x44px
- Formulários funcionam com teclado virtual mobile sem ocultar campos

**Performance:**
- Tempo de carregamento da agenda: < 2 segundos em conexão 4G
- Tempo de carregamento de lista de clientes: < 1,5 segundos
- Imagens sempre com lazy loading
- Nenhuma fonte ou ícone bloqueante no carregamento inicial

**Navegação:**
- Menu principal acessível com polegar (bottom navigation no mobile)
- Ações destrutivas (cancelar, excluir) sempre com confirmação em modal
- Swipe gestures como enhancement, nunca como única forma de acionar uma ação

### Checklist de Review Mobile
Antes de considerar uma tela pronta:
- [ ] Testado em 375px de largura
- [ ] Todos os botões com altura >= 44px
- [ ] Formulário testado com teclado virtual aberto
- [ ] Nenhuma ação crítica depende de hover
- [ ] Tempo de carregamento medido

---

## LOGS E AUDITORIA (MELHORIA #12)

### Dois Tipos de Log

**1. Logs de Erro Técnico → Sentry**
- Exceções não tratadas
- Erros de integração externa
- Falhas de build ou runtime
- Nunca logar senhas, tokens ou dados sensíveis

**2. Logs de Auditoria de Negócio → Tabela `AuditLog`**
- Criação, edição e exclusão de clientes
- Criação, cancelamento e reagendamento de appointments
- Upload e exclusão de arquivos
- Alterações de plano
- Login e logout
- Tentativas de acesso não autorizado

### Função de Auditoria

```typescript
// src/lib/audit.ts
export async function logAudit({
  userId,
  operation,
  entity,
  entityId,
  ipAddress,
}: {
  userId: string
  operation: string      // ex: 'client.create', 'appointment.cancel'
  entity: string         // ex: 'Client', 'Appointment'
  entityId: string
  ipAddress?: string
}) {
  await prisma.auditLog.create({
    data: { userId, operation, entity, entityId, ip_address: ipAddress ?? null }
  })
}
```

### Retenção
- Logs de auditoria: 90 dias (job de limpeza semanal)
- Logs do Sentry: conforme plano contratado

### Nunca Registrar
- Senhas
- Tokens de sessão
- Chaves de criptografia (KEK e DEK, em texto puro ou cifrado)
- Conteúdo de campos criptografados

---

## TRATAMENTO DE ERROS

### Regra Principal
Nenhuma funcionalidade é considerada pronta sem tratamento de erros.

### Validações
Obrigatório:
- Zod para validação de schema
- Validação no frontend (UX)
- Validação no backend (segurança)

Nunca confiar apenas no frontend.

### Mensagens ao Usuário
Nunca exibir:
- Stack traces
- SQL errors
- Prisma errors

Sempre exibir mensagens amigáveis em português.

### Catálogo de Erros

```typescript
export const ERROR_CODES = {
  // Autenticação e Autorização
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para acessar este recurso.',

  // Clientes
  CLIENT_NOT_FOUND: 'Cliente não encontrado.',

  // Agendamentos
  APPOINTMENT_NOT_FOUND: 'Agendamento não encontrado.',
  APPOINTMENT_CONFLICT: 'Já existe um agendamento neste horário.',
  APPOINTMENT_BUFFER_CONFLICT: 'Horário muito próximo de outro atendimento.',

  // Plano
  PLAN_LIMIT_CLIENTS: 'Limite de clientes do seu plano atingido.',
  PLAN_LIMIT_STORAGE: 'Limite de armazenamento do seu plano atingido.',
  PLAN_LIMIT_PROFESSIONALS: 'Limite de profissionais do seu plano atingido.',
  PLAN_REQUIRED: 'Esta funcionalidade requer upgrade de plano.',

  // Equipe (V2)
  TEAM_MEMBER_ALREADY_INVITED: 'Este profissional já foi convidado para a equipe.',
  USER_NOT_FOUND_INVITE_PENDING_SIGNUP: 'Convite registrado. O profissional precisa criar uma conta com este e-mail para ingressar na equipe.',

  // Arquivos
  INVALID_FILE: 'Tipo de arquivo não permitido.',
  FILE_TOO_LARGE: 'Arquivo excede o limite de 10 MB.',
  UPLOAD_ERROR: 'Erro ao enviar arquivo. Tente novamente.',

  // Genéricos
  INVALID_INPUT: 'Dados inválidos. Verifique os campos e tente novamente.',
  DATABASE_ERROR: 'Erro interno. Tente novamente em instantes.',
  INTERNAL_ERROR: 'Erro inesperado. Nossa equipe foi notificada.',
} as const
```

---

## MIDDLEWARE DE PLANO (MELHORIA #10)

```typescript
// src/lib/plan-limits.ts

export const PLAN_LIMITS = {
  trial: {
    max_clients: Infinity,
    max_storage_bytes: Infinity,
    auto_reminders: true,
    public_page: true,
    max_professionals: 1,
  },
  solo: {
    max_clients: 100,
    max_storage_bytes: 2 * 1024 * 1024 * 1024, // 2 GB
    auto_reminders: false,
    public_page: false,
    max_professionals: 1,
  },
  professional: {
    max_clients: Infinity,
    max_storage_bytes: Infinity,
    auto_reminders: true,
    public_page: true,
    max_professionals: 1,
  },
  team: {
    max_clients: Infinity,
    max_storage_bytes: Infinity,
    auto_reminders: true,
    public_page: true,
    max_professionals: 4,
  },
} as const

type PlanLimitKey = keyof typeof PLAN_LIMITS['solo']

type LimitCheckResult = {
  allowed: boolean
  errorCode?: string
  current?: number
  max?: number
}

export async function checkPlanLimit(
  userId: string,
  key: PlanLimitKey
): Promise<LimitCheckResult> {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return { allowed: false, errorCode: 'UNAUTHORIZED' }

  const plan = user.plan as keyof typeof PLAN_LIMITS
  const limits = PLAN_LIMITS[plan]
  const limitValue = limits[key]

  // Flags booleanas (acesso a feature) — não contam nada, só verificam permissão
  if (typeof limitValue === 'boolean') {
    return limitValue ? { allowed: true } : { allowed: false, errorCode: 'PLAN_REQUIRED' }
  }

  // Contadores — comparam uso atual com o teto do plano
  switch (key) {
    case 'max_clients': {
      const current = await prisma.client.count({ where: { user_id: userId } })
      return current < limitValue
        ? { allowed: true, current, max: limitValue }
        : { allowed: false, errorCode: 'PLAN_LIMIT_CLIENTS', current, max: limitValue }
    }

    case 'max_storage_bytes': {
      const current = user.storage_used_bytes
      return current < limitValue
        ? { allowed: true, current, max: limitValue }
        : { allowed: false, errorCode: 'PLAN_LIMIT_STORAGE', current, max: limitValue }
    }

    case 'max_professionals': {
      // Depende da tabela TeamMember (ver seção V2 — Convite de Equipe).
      // current = membros ativos convidados por este owner, sem contar o próprio dono.
      const current = await prisma.teamMember.count({
        where: { owner_id: userId, status: 'active' },
      })
      return current < limitValue
        ? { allowed: true, current, max: limitValue }
        : { allowed: false, errorCode: 'PLAN_LIMIT_PROFESSIONALS', current, max: limitValue }
    }

    default:
      // Nunca deve cair aqui — se um novo limite for adicionado ao PLAN_LIMITS
      // sem um case correspondente, falhar explicitamente em vez de liberar por padrão.
      throw new Error(`checkPlanLimit: chave de limite "${key}" não implementada.`)
  }
}
```

**Nota de implementação:** `max_professionals` fica implementado desde já na função acima, mas só entra em uso real quando a tabela `TeamMember` for criada (V2/Equipe — ver seção V2 — CONVITE DE EQUIPE). Até lá, esse `case` nunca é chamado porque não existe fluxo de convite no sistema.

**Regra para IA:** ao adicionar uma nova chave em `PLAN_LIMITS`, é obrigatório adicionar o `case` correspondente em `checkPlanLimit` na mesma tarefa. Nunca deixar uma chave nova sem enforcement — o `default: throw` existe exatamente para forçar essa disciplina.

---

## SEGURANÇA

### Isolamento de Dados
Todo dado pertence a um usuário.
Toda consulta deve validar `id` + `userId`.
Nunca acessar registros apenas pelo `id`.

### Exemplo de Query Segura

```typescript
// CORRETO
const client = await prisma.client.findFirst({
  where: { id: clientId, user_id: session.user.id }
})

// INCORRETO — nunca fazer isso
const client = await prisma.client.findUnique({
  where: { id: clientId }
})
```

### Upload de Arquivos
- Whitelist de tipos: `['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']`
- Tamanho máximo: 10 MB
- Validar tipo e tamanho no backend, nunca apenas no frontend
- Verificar limite de storage do plano antes de aceitar upload
- Incrementar `user.storage_used_bytes` após upload bem-sucedido

---

## CONVENÇÕES DE CÓDIGO

- TypeScript obrigatório
- Sem uso de `any`
- Componentes pequenos com responsabilidade única
- Funções com responsabilidade única
- Código reutilizável — evitar duplicação
- Código limpo e legível
- Nomes em inglês no código, mensagens ao usuário em português

---

## DEFINITION OF DONE

Uma funcionalidade só estará pronta quando possuir:

- [ ] Implementação funcional
- [ ] Tipagem correta (sem `any`)
- [ ] Tratamento de erros com mensagem amigável
- [ ] Validação com Zod no frontend e no backend
- [ ] Controle de acesso validado no backend (`id` + `userId`)
- [ ] Log de auditoria registrado
- [ ] Verificação de limite de plano (quando aplicável)
- [ ] Teste manual no mobile (375px)
- [ ] Botões com altura >= 44px
- [ ] Sem duplicação de código
- [ ] Sem warnings de TypeScript
- [ ] Sem erros de lint
- [ ] Sem erros de build

---

## REGRAS PARA IA

A IA atua como Tech Lead.

Antes de sugerir código:
1. Analisar impacto da mudança
2. Preservar funcionalidades existentes
3. Nunca remover funcionalidades sem autorização
4. Nunca alterar regras de negócio sem autorização
5. Nunca refatorar sem autorização explícita
6. Nunca criar soluções paralelas
7. Reutilizar componentes existentes
8. Reutilizar serviços existentes
9. Reutilizar hooks existentes
10. Escolher sempre a solução de menor impacto
11. Priorizar correções localizadas
12. Não substituir código funcional por preferência técnica

### Proibições para IA

A IA NÃO DEVE:
- Reescrever arquivos inteiros sem necessidade
- Criar código duplicado
- Criar funções, componentes ou hooks duplicados
- Alterar arquitetura sem autorização
- Alterar banco sem autorização
- Alterar autenticação sem autorização
- Criar abstrações desnecessárias
- Remover campos de criptografia
- Ignorar verificações de plano
- Ignorar logs de auditoria em operações de escrita

### Processo Obrigatório

Antes de fornecer código:
1. Diagnóstico
2. Causa raiz
3. Arquivos afetados
4. Plano de correção
5. Possíveis riscos

Somente depois gerar código.

---

## ENTREGA DE CÓDIGO

Quando solicitado:
- Entregar arquivo completo
- Código pronto para copiar e colar
- Código formatado
- Sem pseudocódigo
- Sem trechos omitidos
- Sem "restante do código"

O código deve compilar sem adaptações adicionais.

---

## INSTRUÇÕES DE CONSTRUÇÃO PARA IA (CURSOR) — ORDEM DE IMPLEMENTAÇÃO

Esta seção define a ordem obrigatória de construção do V1. A IA no Cursor deve seguir esta sequência de fases — nunca pular uma fase para implementar uma funcionalidade de uma fase posterior sem que as anteriores estejam com Definition of Done cumprido.

Antes de qualquer tarefa, a IA deve reler:
- `REGRAS PARA IA` (processo obrigatório: diagnóstico → causa raiz → arquivos afetados → plano → riscos → só então código)
- `DEFINITION OF DONE` (checklist de aceite de cada funcionalidade)
- `CONVENÇÕES DE CÓDIGO`
- `ENTREGA DE CÓDIGO` (código completo, sem trechos omitidos)

### Fase 0 — Setup do Projeto
1. Inicializar Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
2. Configurar Prisma + conexão PostgreSQL (Supabase)
3. Configurar Auth.js
4. Criar estrutura oficial de pastas (ver `ARQUITETURA OFICIAL`)
5. Configurar Sentry
6. Configurar variáveis de ambiente: `DATABASE_URL`, `NEXTAUTH_SECRET`, `ENCRYPTION_MASTER_KEY` (gerar com `openssl rand -base64 32`), `RESEND_API_KEY` (não usado ainda no V1, deixar placeholder)

**Não avançar para a Fase 1 sem:** build rodando sem erro, conexão com banco validada.

### Fase 1 — Fundação de Segurança (antes de qualquer feature de negócio)
Esta fase existe porque toda entidade do V1 depende dela. Construir fora de ordem gera retrabalho.

1. Schema Prisma completo: `User` (com `encrypted_dek`), `Client`, `Appointment`, `AppointmentConfirmation`, `ServiceRecord`, `Attachment`, `Payment`, `AuditLog` — ver `ENTIDADES PRINCIPAIS`
2. `src/lib/crypto.ts` — implementar `generateEncryptedDek()`, `encryptField()`, `decryptField()` conforme especificado em `SEGURANÇA E CRIPTOGRAFIA`
3. `src/lib/audit.ts` — implementar `logAudit()`
4. `src/lib/plan-limits.ts` — implementar `PLAN_LIMITS` e `checkPlanLimit()` completo (todos os `case`, incluindo `max_professionals`)
5. `src/lib/error-codes.ts` — implementar `ERROR_CODES` completo

**Não avançar para a Fase 2 sem:** teste manual confirmando que `encryptField`/`decryptField` funcionam ida e volta para dois usuários diferentes (e que a DEK de um não decifra o dado do outro).

### Fase 2 — Autenticação
1. Cadastro (gera `encrypted_dek` do usuário na criação — nunca depois)
2. Login
3. Recuperação de senha
4. Controle de sessão / middleware de rota protegida

**Não avançar para a Fase 3 sem:** rota protegida testada, sessão expirando corretamente, `AuditLog` registrando login/logout.

### Fase 3 — Clientes
1. CRUD de `Client` (campos: nome, telefone, e-mail, data de nascimento, observações)
2. `notes` passa por `encryptField`/`decryptField`
3. Toda query usa `id` + `user_id` (nunca `findUnique` só por `id`)
4. `checkPlanLimit(userId, 'max_clients')` antes de criar
5. `logAudit` em create/update/delete

### Fase 4 — Agenda
1. CRUD de `Appointment`
2. Regras de conflito: sobreposição total, sobreposição parcial, `buffer_minutes` por agendamento (ver `MVP (VERSÃO 1)` → Regras de Conflito)
3. Validação de conflito no backend, independente do frontend
4. Erro `APPOINTMENT_CONFLICT` / `APPOINTMENT_BUFFER_CONFLICT` com horário conflitante na mensagem
5. Status: `scheduled → awaiting_confirmation → confirmed → completed / canceled`

### Fase 5 — Lembrete Manual (V1)
1. Geração da mensagem pré-formatada (template em `MVP (VERSÃO 1)` → Lembrete Manual)
2. Botão "Copiar lembrete" (clipboard API)
3. Sem integração de API externa nesta fase

### Fase 6 — Histórico e Evolução
1. CRUD de `ServiceRecord`
2. `description` e `evolution` passam por `encryptField`/`decryptField`
3. Vínculo obrigatório com `appointment_id`, `client_id`, `user_id`

### Fase 7 — Arquivos
1. Upload para Supabase Storage
2. Whitelist de tipos + limite de 10 MB (ver `SEGURANÇA` → Upload de Arquivos)
3. `checkPlanLimit(userId, 'max_storage_bytes')` antes de aceitar upload
4. Incrementar `user.storage_used_bytes` após upload bem-sucedido
5. `file_url` passa por `encryptField`/`decryptField`

### Fase 8 — Financeiro
1. CRUD de `Payment`
2. Sem contabilidade, sem emissão fiscal (ver `O QUE O SISTEMA NÃO É`)

### Fase 9 — Onboarding Guiado
1. Fluxo de 3 passos pós-cadastro (ver `MVP (VERSÃO 1)` → Onboarding Guiado)
2. Progresso visual
3. Roda por cima das features já construídas nas Fases 3–6 — não introduz lógica de negócio nova

### Fase 10 — Mobile First e Revisão Final
1. Checklist de `PADRÕES MOBILE FIRST` em cada tela construída
2. Checklist de `DEFINITION OF DONE` em cada funcionalidade
3. Revisão de que nenhuma verificação de plano ou log de auditoria foi esquecida

### Ordem Explícita — Resumo
```
Fase 0  → Setup
Fase 1  → Segurança (crypto, audit, plan-limits, error-codes) [BLOQUEANTE]
Fase 2  → Autenticação [BLOQUEANTE]
Fase 3  → Clientes
Fase 4  → Agenda
Fase 5  → Lembrete Manual
Fase 6  → Histórico e Evolução
Fase 7  → Arquivos
Fase 8  → Financeiro
Fase 9  → Onboarding Guiado
Fase 10 → Mobile First e Revisão Final
```

**Fora do escopo desta ordem (V2, só depois de V1 completo com metas de validação atingidas):** página pública, PWA, push notification, e-mail automático, dashboard gerencial, convite de equipe (`TeamMember`/`inviteTeamMember`).

---

## NOTIFICAÇÕES

### Decisão de Canal
WhatsApp API não será utilizado. Alto custo por conversa, burocracia de aprovação Meta e risco de bloqueio tornam a integração inviável para este estágio.

Canal principal no V2: **Push Notification via PWA — custo zero.**
Fallback: **E-mail (Resend).**
Última camada no V3: **SMS (Zenvia)** para clientes sem e-mail e sem PWA instalado.

---

### V1 — Lembrete Manual
- Sistema gera mensagem pré-formatada
- Botão "Copiar lembrete" copia para área de transferência
- Profissional envia pelo canal que preferir (WhatsApp pessoal, SMS próprio, etc.)
- Sem integração de API

---

### V2 — Push PWA + E-mail

**Como o cliente instala o PWA:**

Cada profissional tem uma URL pública única:
```
https://seuproduto.com.br/p/[slug-do-profissional]
```

O sistema gera automaticamente para cada profissional:
- **Link para compartilhar** — profissional envia pelo WhatsApp pessoal, Instagram, ou qualquer canal
- **QR Code para imprimir** — profissional coloca no balcão, recepção ou porta do estabelecimento

Quando o cliente acessa essa URL:
1. Vê a página do profissional (nome, foto, serviços)
2. Recebe prompt para instalar o PWA na tela inicial
3. Aceita receber notificações push
4. A `push_subscription` é salva no banco vinculada ao `user_id` do profissional

**Isolamento entre profissionais:**
- A `push_subscription` fica salva no `Client` com `user_id` do profissional dono
- Um cliente que frequenta dois profissionais diferentes instala os dois PWAs separadamente
- Cada profissional notifica apenas seus próprios clientes — sem cruzamento de dados
- O sistema nunca expõe que um cliente existe em outro profissional

**Fallback por e-mail:**
Se o cliente não tiver PWA instalado (`push_subscription = null`) e tiver e-mail cadastrado, o sistema envia por e-mail via Resend automaticamente.

**Prioridade de envio:**
```
push_subscription presente → Push PWA (grátis)
push_subscription null + email presente → E-mail via Resend (grátis até 3k/mês)
nenhum dos dois → Lembrete manual pelo profissional
```

**Tipos de notificação no V2:**
- Lembrete automático 24h antes do agendamento
- Confirmação de agendamento criado
- Aviso de cancelamento
- Aviso de alteração de horário

---

### V3 — SMS como última camada
- SMS via **Zenvia** (~R$ 0,20/msg) para clientes sem PWA e sem e-mail
- Ativado apenas quando as duas camadas anteriores não alcançam o cliente
- Nesse ponto o produto já tem receita para absorver o custo

---

### Canais por versão

| Canal | Versão | Custo | Condição |
|---|---|---|---|
| Lembrete manual (cópia) | V1 | Grátis | Sempre disponível |
| Push PWA | V2 | Grátis | Cliente instalou o PWA |
| E-mail (Resend) | V2 | Grátis até 3k/mês | Cliente tem e-mail |
| SMS (Zenvia) | V3 | ~R$ 0,20/msg | Fallback final |
| WhatsApp API | Nunca | — | Não utilizado |

---

### Biblioteca recomendada para Push PWA
```
web-push (npm) — geração de chaves VAPID e envio de notificações
next-pwa — configuração do Service Worker no Next.js
qrcode (npm) — geração do QR Code do profissional
```

---

## MÉTRICAS OFICIAIS DO PRODUTO

### Clientes
- Total de clientes
- Clientes ativos (atendimento nos últimos 60 dias)
- Clientes inativos

### Agenda
- Agendamentos criados
- Agendamentos confirmados
- Agendamentos cancelados
- Taxa de comparecimento

### Financeiro
- Receita mensal
- Receita anual
- Ticket médio

### Relacionamento
- Taxa de confirmação
- Taxa de retorno
- Clientes recuperados

### Produto (SaaS)
- MRR (Monthly Recurring Revenue)
- Churn mensal
- NPS
- Trial-to-paid conversion rate

---

## PRINCÍPIOS DE PRODUTO

- Simplicidade acima de tudo
- Mobile First (com critérios técnicos definidos)
- Baixa curva de aprendizado
- Crescimento controlado
- Resolver problemas reais
- Evitar funcionalidades sem validação
- LGPD como requisito, não como afterthought

---

## ESTRATÉGIA DE VALIDAÇÃO

1. Construir MVP com onboarding guiado
2. Conseguir primeiros usuários via canais definidos
3. Observar uso real (Sentry + AuditLog)
4. Coletar feedback estruturado (NPS + entrevistas)
5. Evoluir baseado em dados

Nunca desenvolver funcionalidades apenas por suposição.
Cada versão tem meta mensurável antes de avançar para a próxima.

---

## REGRA DE OURO

A menor alteração possível é a melhor alteração.
Corrigir apenas o necessário.
Preservar o funcionamento existente é mais importante do que aplicar novos padrões arquiteturais.
Melhorar sem quebrar.

O sistema deve permanecer simples, sustentável e viável para manutenção por um único desenvolvedor com auxílio de IA.

---

*Versão 4.3 — Correção: resquício de WhatsApp removido do roadmap V4. `buffer_minutes` esclarecido como configuração por agendamento (não global). MELHORIA #13: estratégia de criptografia migrada de chave única global para chave por profissional (envelope encryption com DEK/KEK) — schema de `User` e `crypto.ts` atualizados. `checkPlanLimit` completado para cobrir todos os limites de `PLAN_LIMITS`, incluindo flags booleanas e `max_professionals`. MELHORIA #14: entidade `TeamMember` e server action `inviteTeamMember` adicionadas ao roadmap V2. Nova seção "INSTRUÇÕES DE CONSTRUÇÃO PARA IA (CURSOR)" com ordem de implementação em 10 fases para o V1.*
