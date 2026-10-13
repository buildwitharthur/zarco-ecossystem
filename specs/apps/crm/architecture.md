# CRM — arquitetura

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Módulos: [modules.md](modules.md) · Navegação e telas: [navigation.md](navigation.md), [routes.md](routes.md) · Domínio: [../../product/domain-model.md](../../product/domain-model.md) · Decisões: [../../adr/](../../adr/README.md)

Legenda: **[C]** decidido por Arthur · **[H]** proposta, aguardando aprovação

O CRM tem duas aplicações: `crm-api` (backend) e `crm-web` (SPA). Elas compartilham os contratos do pacote `packages/contracts`.

---

## 1. crm-api

### 1.1 Stack **[C]**

Node.js, Express, TypeScript, Prisma, PostgreSQL e Zod. Testes de integração com Vitest e Supertest.

### 1.1.1 Middlewares e bibliotecas do ecossistema Express **[C]**

Regra: **usar bibliotecas consagradas do ecossistema Express em vez de implementar na mão** (decisão de Arthur).

| Necessidade | Biblioteca |
|---|---|
| Leitura de cookies | `cookie-parser` |
| Limite de tentativas de login | `express-rate-limit` |
| CORS | `cors`, restrito à origem do próprio CRM. Com a SPA e a API no mesmo domínio ele não é necessário em produção; serve como proteção explícita. |
| Cabeçalhos de segurança | `helmet` **[C]** |
| Envio de arquivos (multipart) | `multer`, gravando no `UPLOAD_DIR` **[C]** |
| JWT | `jsonwebtoken` **[C]** |
| Hash de senha | `argon2` **[C]** |
| Identificação do tipo real do arquivo | `file-type` **[C]** |

No desenvolvimento, o Vite repassa `/api` para a API local (proxy), mantendo a mesma origem do ambiente de produção **[C]**.

### 1.2 Camadas **[C]** — [ADR-0002](../../adr/0002-camadas-da-api.md)

```text
HTTP ──► Controller ──► Use Case ──► Repository (contrato) ◄── PrismaRepository (implementação)
          │ valida com Zod     │ regras de negócio            │ único lugar com Prisma
          │ resposta HTTP      │ lança erros de aplicação
          ▼                    ▼
       Middleware global de erros: AppError → status + corpo padronizado
```

| Camada | Pode | Não pode |
|---|---|---|
| Controller | Ler `req`, validar com os schemas de `contracts`, chamar **um** use case, escrever `res` | Conter regra de negócio; acessar o Prisma |
| Use Case | Aplicar as regras do domínio (domain-model.md §4); usar contratos de repositório; lançar `AppError` e subclasses | Importar Express, Prisma ou `contracts` de HTTP |
| Repository (contrato) | Declarar as operações de persistência que os use cases precisam, com tipos do domínio | Expor tipos do Prisma |
| PrismaRepository | Implementar o contrato com Prisma; traduzir modelos Prisma ↔ domínio | Conter regra de negócio |

**Composição explícita, sem factories:** cada módulo tem um arquivo de rotas que instancia o repositório, os use cases e o controller em sequência, de forma direta. O Prisma Client é uma instância única, importada pelos repositórios.

### 1.3 Erros **[C]**

- `AppError` (base): `statusCode`, `code` (texto estável, ex.: `PROJECT_NOT_FOUND`), `message`, `details?`.
- Subclasses: `NotFoundError`, `UnauthorizedError`, `ConflictError` (ex.: nome duplicado), `BusinessRuleError` (ex.: excluir cliente com projetos, RN-CRM-10), `ValidationError` (falha do Zod).
- O middleware global converte qualquer `AppError` no formato de erro definido na Etapa 09. Erros inesperados viram 500, sem expor detalhes internos, e são registrados em log.

### 1.4 Autenticação **[C]** — [ADR-0003](../../adr/0003-autenticacao-jwt-cookie.md)

- JWT assinado (HS256) com expiração de 8 horas, enviado em cookie `httpOnly`, `Secure` e `SameSite=Strict`, com caminho `/api`.
- Middleware de autenticação em todas as rotas, exceto o login.
- Logout: o servidor apaga o cookie.
- Login com limite de tentativas por IP e senha com hash (argon2id) **[C]**.
- Usuário único: criado e com senha alterada **por comando de terminal** (`pnpm --filter crm-api user:set-password`), nunca pela interface **[C]**.

### 1.5 Arquivos **[C]** — [ADR-0004](../../adr/0004-armazenamento-de-arquivos.md)

Os modelos são gravados no volume `UPLOAD_DIR`, com nome interno gerado (UUID). Nome original, tipo e tamanho ficam no banco. O download passa pela API, com autenticação (CA-CRM-02N.4). O envio é validado por extensão, tipo e 20 MB (CA-CRM-07.6). A consistência entre registro e arquivo segue domain-model §5: o arquivo é gravado primeiro e removido se o registro falhar.

### 1.6 Estrutura de pastas **[C]**

```text
apps/crm-api/
├── prisma/schema.prisma, migrations/, seed.ts (categorias iniciais, CA-CRM-08.1)
├── src/
│   ├── server.ts                 inicia o servidor
│   ├── app.ts                    cria o app Express (usado também pelos testes)
│   ├── config/env.ts             leitura e validação das variáveis (Zod)
│   ├── shared/
│   │   ├── errors/               AppError e subclasses
│   │   ├── http/                 middlewares: autenticação, erros, limite de tentativas, upload
│   │   └── database/prisma.ts    instância única do Prisma Client
│   ├── modules/<módulo>/         ver modules.md
│   └── scripts/set-password.ts
├── test/                         testes de integração por módulo + helpers (app, banco, login)
└── Dockerfile
```

## 2. crm-web

### 2.1 Stack **[C]**

React, Vite, TypeScript, TanStack Router, Tailwind, React Hook Form (com `zodResolver` e os schemas de `contracts`) e Axios **[C]**. Para estado do servidor, TanStack Query **[C]**. Radix UI para todos os componentes acessíveis sem estilo (diálogo, menu, seleção, abas, avisos etc.) **[C]**. Para arrastar e soltar com suporte a teclado, dnd-kit **[C]**.

### 2.2 Organização por rota **[C]**

```text
apps/crm-web/src/
├── routes/
│   ├── __root.tsx                 layout: barra superior, avisos
│   ├── login.tsx
│   ├── _auth.tsx                  layout protegido (G1): sem sessão → /login?voltar=
│   ├── _auth/index.tsx            Início
│   ├── _auth/projetos/
│   │   ├── index.tsx, novo.tsx, $id.tsx, $id.editar.tsx
│   │   ├── -components/           ProjectForm, PhaseSelect, HealthSelect…
│   │   ├── -hooks/                useProjects, useProject…
│   │   └── -schemas/              ajustes de formulário, quando houver
│   ├── _auth/clientes/ …
│   └── _auth/modelos/ …
├── components/                    compartilhados: Button, Dialog, Menu, Toast, Board, HealthBadge, EmptyState…
├── lib/
│   ├── api.ts                     instância Axios: baseURL "/api", withCredentials; 401 → /login?voltar=
│   └── query-client.ts
└── styles/                        tokens do design system em variáveis CSS + tema do Tailwind
```

As rotas seguem [routes.md](routes.md). Os parâmetros de busca (`?projeto=`, `?situacao=`, `?categoria=`, `?voltar=`) são validados com os recursos de search params do TanStack Router.

### 2.3 Estado

- Dados do servidor: TanStack Query **[C]**. A estratégia de cache será decidida **durante o desenvolvimento** do CRM web (decisão de Arthur). O rascunho de referência está em [data-cache.md](data-cache.md).
- Estado de interface: local, nos componentes. Não há biblioteca de estado global (YAGNI) **[C]**.

## 3. packages/contracts **[C]**

Schemas Zod e tipos das entradas e saídas de cada endpoint, organizados por módulo. Importado pela API (validação nos controllers) e pela web (tipos e formulários). É a fonte oficial dos contratos HTTP. O formato completo será definido na Etapa 09.
