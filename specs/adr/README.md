# Registros de decisão de arquitetura (ADR)

Cada ADR registra uma decisão estrutural: contexto, alternativas, decisão e consequências. Decisões triviais não viram ADR.

Estados: **Proposta** · **Aceita** · **Substituída por ADR-nnnn** · **Rejeitada**

| ADR | Decisão | Estado |
|---|---|---|
| [0001](0001-monorepo-tres-aplicacoes.md) | Monorepo com três aplicações (landing, crm-web, crm-api) e pacote de contratos | Aceita |
| [0002](0002-camadas-da-api.md) | Camadas da API: Controller → Use Case → Repository (contrato), composição explícita | Aceita |
| [0003](0003-autenticacao-jwt-cookie.md) | Autenticação por JWT em cookie `httpOnly` | Aceita |
| [0004](0004-armazenamento-de-arquivos.md) | Arquivos de modelo em volume persistente da VPS | Aceita |
| [0005](0005-ci-cd.md) | CI/CD com GitHub Actions: tipos, lint, testes e build; implantação pelo Coolify | Aceita |

## Pendências de arquitetura

Nenhuma. O backup (antiga PA-01) ficou fora do escopo por decisão de Arthur (RNF-CRM-03).
