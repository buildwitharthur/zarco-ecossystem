# Estratégia de qualidade

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> CI: [ADR-0005](../adr/0005-ci-cd.md) · Contratos: [../apps/crm/contracts/](../apps/crm/contracts/README.md) · Requisitos: [../product/requirements.md](../product/requirements.md)

Legenda: **[C]** decidido por Arthur · **[H]** proposta, aguardando aprovação

**Princípio:** testar o que é crítico, onde o erro é provável e caro. Não há meta de cobertura. Um teste existe porque protege um requisito, uma regra ou um contrato.

---

## 1. Riscos que orientam os testes

| # | Risco | Impacto | Onde é coberto |
|---|---|---|---|
| R1 | Acesso ao CRM ou a arquivos sem login | Alto | Testes de integração: autenticação (§3.1) |
| R2 | Regra de negócio violada (exclusão indevida, saúde em projeto encerrado, tarefa sem projeto) | Alto | Testes de integração por módulo (§3.1) |
| R3 | Envio de arquivo malicioso ou inválido | Alto | Testes de integração: modelos (§3.1) |
| R4 | Quebra de contrato entre crm-web e crm-api | Médio | Verificação de tipos com `packages/contracts` no CI |
| R5 | Botão do WhatsApp sem o número ou a mensagem corretos | Alto (perde a conversão) | Checklist manual antes de publicar (§3.3); número e mensagem definidos em um único lugar (RNF-LP-09) |
| R6 | Landing lenta ou com SEO quebrado | Médio | Lighthouse antes de cada publicação (§3.3) |
| R7 | Kanban perder tarefas ou a ordem ao mover | Médio | Testes da rota `move` (§3.1) |
| R8 | Perda de dados por falha da VPS | Alto | **Não coberto.** Backup fora do escopo, risco aceito (RNF-CRM-03). |

## 2. Níveis de teste

| Nível | Uso | Ferramenta |
|---|---|---|
| **Integração da API** (prioridade) | Toda rota e regra de negócio do CRM | Vitest + Supertest, contra PostgreSQL real **[C]** |
| Unitário | Só funções puras com lógica não trivial (ex.: `isTaskOverdue`, cálculo de posição), quando surgir | Vitest **[C]** |
| Componentes do frontend | Não no primeiro recorte | — **[C]** |
| E2E (navegador) | Não no primeiro recorte. Reavaliar se o fluxo do kanban apresentar regressões. | — **[C]** |
| Contrato | Coberto pelos tipos de `packages/contracts` mais os testes de integração, que validam as respostas | — **[C]** |

## 3. O que testar

### 3.1 crm-api: testes de integração **[C]**

Um arquivo por módulo (`test/<módulo>.test.ts`). Cada endpoint dos contratos tem, no mínimo: **o caminho de sucesso, a validação de entrada, os erros do contrato e a exigência de login**.

| Módulo | Casos obrigatórios (além do mínimo) |
|---|---|
| auth | Login correto define o cookie com `HttpOnly`, `SameSite=Strict` e `Path=/api`; credencial errada → `INVALID_CREDENTIALS` sem dizer qual campo; 6ª tentativa → `429`; rota protegida sem cookie → `401`; token expirado → `401`; logout sem sessão → `204` |
| clients | Nome duplicado ignorando maiúsculas → `409`; excluir com projetos → `422 CLIENT_HAS_PROJECTS` com a contagem |
| projects | Previsão anterior ao início → `400`; encerrar apaga a saúde; saúde em projeto encerrado → `422`; excluir apaga as tarefas; filtro `active` inclui `maintenance` |
| tasks | Quadro geral sem tarefas de projetos encerrados; regra dos 14 dias e `hiddenDoneCount`; `move` para `done` preenche `completedAt` e para fora apaga; `beforeTaskId` de outro projeto → `422`; a ordem se mantém após vários movimentos |
| templates | Arquivo com extensão aceita mas conteúdo de outro tipo → `415`; acima de 20 MB → `413`; download devolve o arquivo idêntico, com o nome original; download sem login → `401`; falha no envio não deixa arquivo no disco; categoria com modelos não é excluída |

**Ambiente de teste [H]:**

- **Banco de teste próprio**, como um serviço separado no `docker compose` do repositório (`postgres-test`, independente do banco de desenvolvimento). No CI, um contêiner de serviço equivalente. O esquema é criado por `prisma migrate deploy` antes dos testes. **[C]**
- **Isolamento:** as tabelas são limpas antes de cada teste. Os testes de um arquivo rodam em sequência; arquivos diferentes não compartilham dados.
- `UPLOAD_DIR` em uma pasta temporária, apagada no fim.
- Helpers em `test/helpers/`: criar o app, criar o usuário de teste, fazer login (devolve o agente com cookie) e fábricas simples de dados (ex.: `createProject({...})`). São funções diretas, não um framework de fixtures.
- O limite de tentativas usa armazenamento em memória e é reiniciado entre os testes.

### 3.2 crm-web **[C]**

- Verificação de tipos e lint no CI.
- Build de produção no CI.
- Antes de publicar uma mudança de interface: checklist manual dos fluxos afetados (user-flows.md), incluindo o uso só pelo teclado no kanban **[C]**.

### 3.3 landing **[C]**

- `astro check`, lint e build no CI.
- Sem verificação automática do HTML gerado (decisão de Arthur). Destino do WhatsApp, `h1` único e ausência de requisições a terceiros entram no checklist manual abaixo. **[C]**
- **Antes de cada publicação (manual):** links de contato abrindo o WhatsApp certo com a mensagem aprovada; Lighthouse no celular com nota de 90 ou mais em todas as categorias (RNF-LP-03); teste com JavaScript desligado (CA-TLP01.3); nenhuma requisição a outros domínios (CA-TLP01.5); pausa da demonstração e da faixa pelo teclado e com "movimento reduzido" (CA-TLP01.6); sem rolagem horizontal de 320 a 1920 px (CA-TLP01.7); respostas das perguntas revisadas por Arthur.

## 4. Padrões automáticos **[C]**

| Verificação | Ferramenta | Onde |
|---|---|---|
| Tipos | `tsc --noEmit` e `astro check`, com `strict: true` em todos os pacotes **[C]** | CI |
| Lint | ESLint com `typescript-eslint` (recomendado e com tipos), `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` (crm-web) e `eslint-plugin-astro` (landing) **[C]** | CI e editor |
| Formatação | Prettier, com `prettier-plugin-tailwindcss` para ordenar classes **[C]** | CI (`--check`) e editor |
| Regras da arquitetura | Regra do ESLint `no-restricted-imports`: controllers e use cases não podem importar `@prisma/client`; use cases não podem importar `express` (ADR-0002) **[C]** | CI |
| Commits antes do push | Nenhum hook local obrigatório; o CI é a barreira **[C]** | — |
| Atualização de dependências | Manual, sem Dependabot (decisão de Arthur) **[C]** | — |

## 5. Ambientes **[C]**

| Ambiente | Uso |
|---|---|
| Local | `docker compose` com dois serviços: `postgres` (desenvolvimento) e `postgres-test` (testes de integração). As aplicações rodam com `pnpm dev`. O Vite repassa `/api` para a API. |
| CI | GitHub Actions (ADR-0005) |
| Produção | Coolify |

**Sem ambiente de homologação** (decisão de Arthur). A proteção vem do CI e da `main` protegida.

## 6. Operação e observabilidade **[C]**

- **Logs (obrigatórios):** a API escreve logs estruturados (JSON) na saída padrão, que o Coolify coleta. Cada requisição é registrada com método, rota, status e duração, por meio de uma biblioteca do ecossistema Express (`pino-http`). Senhas, cookies e tokens nunca aparecem em log.
- **Saúde do serviço:** `GET /api/health` é o *healthcheck* do contêiner no Coolify.
- **Erros 500:** registrados com pilha de erro no log. Não há ferramenta externa de monitoramento no primeiro recorte (YAGNI).

## 7. Critério de "pronto" de cada entrega

1. Os critérios de aceite dos requisitos envolvidos foram verificados.
2. Os testes de integração exigidos em §3.1 existem e passam.
3. O CI passa: tipos, lint, testes e build.
4. Os specs afetados foram atualizados.
5. Mudanças de interface passaram pelo checklist manual (§3.2) ou pelas verificações da landing (§3.3).
