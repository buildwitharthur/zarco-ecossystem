# Zarco — ecossistema

Monorepo da Zarco: landing, CRM (web e API) e contratos compartilhados. Os requisitos, decisões e padrões ficam em [`specs/`](specs/README.md). Orientação para agentes: [`AGENTS.md`](AGENTS.md).

| Pasta                | O que é                                    |
| -------------------- | ------------------------------------------ |
| `apps/landing`       | Astro, saída estática                      |
| `apps/crm-web`       | SPA em React, Vite e TanStack Router       |
| `apps/crm-api`       | Express, TypeScript e Prisma               |
| `packages/contracts` | Schemas Zod compartilhados entre web e API |

## Requisitos

- Node.js 24 (LTS), conforme `.nvmrc`
- pnpm 12 (`packageManager` no `package.json`)
- Docker, para os bancos locais

## Primeiros passos

```bash
pnpm install
cp .env.example .env        # ajuste os valores, se precisar
pnpm db:up                  # postgres (5436) e postgres-test (5435)
pnpm dev:api                # em outros terminais: dev:crm-web e dev:landing
```

O Vite repassa `/api` para a API local (`http://localhost:3000`).

## Comandos

| Comando                                        | O que faz                                             |
| ---------------------------------------------- | ----------------------------------------------------- |
| `pnpm dev:api` · `dev:crm-web` · `dev:landing` | Sobe cada aplicação em modo de desenvolvimento        |
| `pnpm db:up` · `db:down`                       | Sobe e derruba os bancos locais                       |
| `pnpm build`                                   | Gera as três aplicações                               |
| `pnpm typecheck`                               | `tsc --noEmit` nos pacotes e `astro check` na landing |
| `pnpm lint`                                    | ESLint em todo o repositório                          |
| `pnpm format:check`                            | Verifica o Prettier (`pnpm format` corrige)           |
| `pnpm test`                                    | Testes de integração da API contra o `postgres-test`  |

Os testes apagam dados: usam somente `TEST_DATABASE_URL`, nunca `DATABASE_URL`.

## Imagens Docker

O contexto de build é sempre a raiz do repositório:

```bash
docker build -f apps/landing/Dockerfile -t zarco-landing .
docker build -f apps/crm-web/Dockerfile -t zarco-crm-web .
docker build -f apps/crm-api/Dockerfile -t zarco-crm-api .
```

A `crm-api` executa `prisma migrate deploy` ao iniciar. A `crm-web` repassa `/api` para `API_UPSTREAM` (padrão `http://crm-api:3000`).

## CI

`.github/workflows/ci.yml` roda em pull requests e pushes: tipos → lint e Prettier → testes (PostgreSQL como serviço) → build das três imagens, sem publicar. A `main` só aceita merge por pull request com o CI aprovado ([ADR-0005](specs/adr/0005-ci-cd.md)).
