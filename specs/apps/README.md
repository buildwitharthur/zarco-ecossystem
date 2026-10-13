# Ecossistema — visão técnica

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Decisões: [../adr/](../adr/README.md) · Landing: [landing/architecture.md](landing/architecture.md) · CRM: [crm/architecture.md](crm/architecture.md)

Legenda: **[C]** decidido por Arthur · **[H]** proposta, aguardando aprovação

Este documento descreve como as aplicações se organizam no repositório, como se comunicam e como chegam à produção. A arquitetura interna de cada aplicação está no documento dela.

---

## 1. Aplicações

| Aplicação | Pasta | Tecnologia | Domínio | Responsabilidade |
|---|---|---|---|---|
| Landing | `apps/landing` | Astro (estático) | `zarcosoftware.com.br` | Apresentar a Zarco e levar ao WhatsApp **[C]** |
| CRM – web | `apps/crm-web` | React, Vite, TanStack Router, Tailwind | `crm.zarcosoftware.com.br` | Interface do CRM (SPA) **[C]** |
| CRM – API | `apps/crm-api` | Node.js, Express, TypeScript, Prisma | `crm.zarcosoftware.com.br/api` | Regras de negócio, persistência e arquivos **[C]** |
| Contratos | `packages/contracts` | TypeScript + Zod | — | Schemas e tipos das requisições e respostas da API, compartilhados entre web e API **[C]** |

Motivos da separação: [ADR-0001](../adr/0001-monorepo-tres-aplicacoes.md).

## 2. Estrutura do repositório **[C]**

```text
zarco-ecossystem/
├── apps/
│   ├── landing/
│   ├── crm-web/
│   └── crm-api/
├── packages/
│   └── contracts/
├── assets/            arquivos da marca (já existe)
├── specs/             especificações (já existe)
├── prototypes/        protótipos descartáveis (já existe)
├── .github/workflows/ CI/CD
├── package.json       scripts da raiz
└── pnpm-workspace.yaml
```

Gerenciador de pacotes: **pnpm workspaces** **[C]**. Versão de Node fixada no repositório (`.nvmrc` e `engines`), usando a LTS vigente na implementação **[C]**.

## 3. Comunicação

```text
Visitante ──► zarcosoftware.com.br (landing, estático) ──► wa.me (WhatsApp)

Arthur ──► crm.zarcosoftware.com.br
              ├── /        → crm-web (arquivos estáticos da SPA)
              └── /api/*   → crm-api (REST + JSON; arquivos por multipart)
                                 ├── PostgreSQL
                                 └── volume de arquivos (modelos)
```

- A SPA e a API ficam **no mesmo domínio**. Assim o cookie de autenticação é `SameSite=Strict`, e não é preciso configurar CORS **[C]**.
- O contêiner do `crm-web` (nginx) serve a SPA e repassa `/api` para o contêiner do `crm-api` pela rede interna do Coolify **[C]**.
- A landing não se comunica com a API (overview §3.2).

## 4. Implantação (Coolify) **[C]**

| Serviço | Imagem | Persistência |
|---|---|---|
| `landing` | Dockerfile próprio: build do Astro → nginx | — |
| `crm-web` | Dockerfile próprio: build do Vite → nginx (SPA + proxy `/api`) | — |
| `crm-api` | Dockerfile próprio: build TypeScript → Node | Volume persistente para arquivos ([ADR-0004](../adr/0004-armazenamento-de-arquivos.md)) |
| `postgres` | Serviço PostgreSQL gerenciado pelo Coolify | Volume do Coolify |

As migrações do Prisma rodam no início do `crm-api`, antes do servidor aceitar requisições (`prisma migrate deploy`) **[C]**.

### Configuração por variáveis de ambiente **[C]**

| Variável | Serviço | Uso |
|---|---|---|
| `DATABASE_URL` | crm-api | Conexão com o PostgreSQL |
| `JWT_SECRET` | crm-api | Assinatura do token |
| `JWT_EXPIRES_IN` | crm-api | `8h` (CA-CRM-01.5) |
| `UPLOAD_DIR` | crm-api | Caminho do volume de arquivos |
| `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_WHATSAPP_MESSAGE` | landing (build) | Destino de conversão (RNF-LP-09) |
| `PORT` | crm-api | Porta HTTP (padrão `3000`) |
| `TEST_DATABASE_URL` | testes da crm-api | Banco de teste (`postgres-test`). Os testes usam só esta variável, nunca `DATABASE_URL`, porque apagam dados. |
| `API_UPSTREAM` | crm-web (nginx) | Destino do proxy `/api` (padrão `http://crm-api:3000`) |

Segredos de produção ficam somente no Coolify, nunca no repositório. O CI usa apenas valores de teste, definidos no próprio workflow.

## 5. CI/CD **[C]**

Pedido de Arthur: verificar os tipos, rodar o lint e os testes e construir os contêineres. Sem publicação de imagens e sem webhooks. Detalhes em [ADR-0005](../adr/0005-ci-cd.md).

```text
Pull request / push em qualquer branch
1. Instalar dependências (cache do pnpm)
2. Verificar tipos de todos os pacotes
3. Lint: ESLint + prettier --check
4. Testes de integração da API (PostgreSQL em contêiner de serviço)
5. Build da imagem Docker de cada aplicação (sem publicar)
```

A implantação é feita pelo Coolify a partir do GitHub. Ela é segura porque a `main` só aceita merge com o CI aprovado.

## 6. Backup

**Fora do escopo** por decisão de Arthur (12/10/2026). RNF-CRM-03 foi removido, com o risco de perda de dados aceito. Ver [requirements.md](../product/requirements.md).
