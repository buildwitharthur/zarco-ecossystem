# Tarefas de implementação

> **Plano de origem:** [implementation-plan.md](implementation-plan.md) · **Definição de pronto:** [../quality/strategy.md](../quality/strategy.md) §7
> **Última atualização:** 12/10/2026

## Como usar

- Marque `[x]` **só quando** a tarefa atender ao critério "Pronto quando", o CI estiver verde e os specs afetados estiverem atualizados.
- Siga a ordem dos incrementos. Dentro de um incremento, a ordem das tarefas é a recomendada.
- Se uma tarefa revelar uma decisão não prevista nos specs, **pare e registre a questão** antes de seguir (sem decisões estruturais sem aprovação de Arthur).
- Identificadores: `T-<incremento>-<nn>`. Ao concluir, anote a data e o PR: `[x] T-I0-01 … (12/10/2026, #3)`.

## Progresso

| Incremento | Tarefas | Concluídas |
|---|---|---|
| I0 Fundação | 8 | 0 |
| L1 Landing | 14 | 0 |
| L2 Publicação da landing | 4 | 0 |
| C1 Acesso ao CRM | 11 | 0 |
| C2 Clientes | 5 | 0 |
| C3 Projetos | 7 | 0 |
| C4 Tarefas e kanban | 9 | 0 |
| C5 Modelos e categorias | 7 | 0 |
| C6 Publicação do CRM | 6 | 0 |

---

## I0 — Fundação do repositório

**Objetivo:** um pull request de exemplo passa por todo o CI (tipos, lint, testes, build das 3 imagens). Ref.: [ADR-0001](../adr/0001-monorepo-tres-aplicacoes.md), [ADR-0005](../adr/0005-ci-cd.md), [apps/README.md](../apps/README.md).

> **Situação (13/10/2026):** T-I0-01 a T-I0-08 implementadas e verificadas localmente (tipos, lint, Prettier, teste contra `postgres-test`, build e 3 imagens, com a API e o proxy do `crm-web` exercitados em contêiner). **Nenhuma está marcada `[x]` ainda:** falta o PR de exemplo com o CI verde e a proteção da `main` (T-I0-08).
>
> **Decisões de implementação a confirmar:**
> - Versões fixadas pelas compatibilidades: TypeScript 6.0 (`typescript-eslint` não aceita 7), ESLint 9 (`eslint-plugin-jsx-a11y` não aceita 10), Prisma 7.10 com `@prisma/adapter-pg`, Astro 7, Vite 8, Node 24 LTS. Versões com menos de 24 h foram evitadas (política `minimumReleaseAge` do pnpm 12).
> - Portas locais: `postgres` em **5436** e `postgres-test` em **5435**, porque 5432 (PostgreSQL nativo) e 5433/5434 (outro projeto) estavam ocupadas nesta máquina.
> - O `GET /api/health` fica direto em `app.ts`, sem módulo e sem teste, e devolve só `{ "ok": true }` (decisão de Arthur, 13/10/2026: o padrão de módulos será definido depois). **Não verifica o banco**, ao contrário do que T-I0-06 e `contracts/auth.md` previam; ajustar quando o padrão for definido. O Vitest passa sem testes (`passWithNoTests`).
> - Scripts no padrão do app do flex: `@zarco/contracts` exportado como TypeScript e embutido no bundle da API pelo `tsup`; `prisma generate` no `postinstall`.
> - O Prisma Client é gerado em `apps/crm-api/src/generated` (ignorado pelo git) por `prisma generate`, encadeado em `build`, `typecheck` e `test`.

- [ ] **T-I0-01 · Monorepo pnpm**
  Criar `package.json` da raiz (scripts `dev`, `build`, `typecheck`, `lint`, `format:check`, `test`), `pnpm-workspace.yaml` (`apps/*`, `packages/*`), `.nvmrc` com a LTS vigente e `engines`. `.gitignore` incluindo `node_modules`, `dist`, `.env*` e a pasta de uploads.
  *Pronto quando:* `pnpm install` funciona na raiz.

- [ ] **T-I0-02 · TypeScript base**
  `tsconfig.base.json` com `strict: true`, estendido por todos os pacotes.
  *Pronto quando:* `pnpm typecheck` roda em todos os pacotes.

- [ ] **T-I0-03 · ESLint e Prettier**
  Configuração na raiz: `typescript-eslint` (com verificação de tipos), `react-hooks` e `jsx-a11y` (crm-web), `eslint-plugin-astro` (landing), Prettier com `prettier-plugin-tailwindcss`. Regra `no-restricted-imports`: controllers e use cases não importam `@prisma/client`; use cases não importam `express` (ADR-0002).
  *Pronto quando:* `pnpm lint` e `pnpm format:check` passam e a regra de camadas acusa uma violação de teste.

- [ ] **T-I0-04 · docker compose**
  `docker-compose.yml` com `postgres` (desenvolvimento) e `postgres-test` (testes, outra porta e outro volume). `.env.example` com as variáveis de [apps/README.md §4](../apps/README.md).
  *Pronto quando:* `docker compose up -d` sobe os dois bancos.

- [ ] **T-I0-05 · Esqueletos das aplicações**
  `apps/landing` (Astro, página vazia), `apps/crm-web` (Vite + React + TanStack Router, rota vazia), `apps/crm-api` (Express + TypeScript), `packages/contracts` (exporta um schema Zod de exemplo). Só o suficiente para compilar.
  *Pronto quando:* `pnpm build` gera as 3 aplicações.

- [ ] **T-I0-06 · Saúde da API com teste**
  `GET /api/health` conforme [auth.md](../apps/crm/contracts/auth.md) (verifica o banco). Separar `app.ts` (cria o app) de `server.ts` (inicia). Primeiro teste de integração com Vitest + Supertest contra `postgres-test`.
  *Pronto quando:* `pnpm test` passa com o banco de teste.

- [ ] **T-I0-07 · Dockerfiles**
  Dockerfile próprio, em múltiplos estágios, para `landing` (build → nginx), `crm-web` (build → nginx com proxy `/api`) e `crm-api` (build → node, executando `prisma migrate deploy` na subida).
  *Pronto quando:* as 3 imagens são construídas localmente.

- [ ] **T-I0-08 · Workflow do CI**
  `.github/workflows/ci.yml`: instalar (cache do pnpm) → tipos → lint + `prettier --check` → testes (com o serviço PostgreSQL do Actions) → build das 3 imagens, sem publicar. `README.md` da raiz com os comandos de desenvolvimento. Configurar a proteção da `main` (merge só por PR com o CI aprovado).
  *Pronto quando:* um PR de exemplo fica verde e a `main` está protegida.

---

## L1 — Landing completa

**Objetivo:** reproduzir o [protótipo oficial](../../prototypes/landing/index.html) em Astro, atendendo aos critérios de RF-LP, RNF-LP e TELA-LP. Ref.: [routes.md](../apps/landing/routes.md), [architecture.md](../apps/landing/architecture.md), [design system](../design/design-system/foundations.md), [direção criativa](../design/landing-creative-direction.md).

> **Situação (13/10/2026):** T-L1-01 a T-L1-13 implementadas; T-L1-14 (revisão de qualidade) **não executada**. Nenhuma está marcada `[x]`: falta o PR com o CI verde e a verificação em navegador.
>
> **Verificado localmente:** `astro check` (0 erros), `pnpm lint`, Prettier nos arquivos da landing, `pnpm build` (`/`, `/404.html`, `robots.txt`, `sitemap.xml`), imagem Docker e nginx em contêiner (404 com status correto, redirecionamentos de `www.` e `X-Forwarded-Proto: http`, cache longo em `/_astro/`, gzip). No HTML gerado: um único `h1`, nenhuma URL externa além do `wa.me` (oito links, todos com a mesma mensagem), fontes só em `/_astro/`. JavaScript: cerca de 2,8 KB comprimidos no total (orçamento: 15 KB). Contrastes calculados: texto sobre o laranja ≥ 4,9:1; índices ≥ 5,3:1.
>
> **Pendente de verificação manual (não havia navegador na máquina):** comparação visual com o protótipo; Lighthouse no celular; teclado e foco; JavaScript desligado; movimento reduzido; 320–1920 px sem rolagem horizontal; validação dos dados estruturados e prévia do Open Graph; demonstração em celular de entrada (PD-05 em [process-demo/tasks.md](../features/process-demo/tasks.md)).
>
> **Decisões de implementação a confirmar:**
> - `contact.ts` usa os valores de routes.md §2 quando `PUBLIC_WHATSAPP_*` estão vazias (o CI e o build local não precisam de `.env`).
> - Título e descrição da página são provisórios até P2/P-LP-03.
> - O diagrama do ciclo só anima com JavaScript e sem "movimento reduzido" (sem JavaScript, fica estático). A faixa de sintomas, sem JavaScript ou com movimento reduzido, fica parada e rolável.
> - Foi criado `src/scripts/` (utilitários compartilhados) e as rotas `robots.txt.ts` e `sitemap.xml.ts`, já registrados em [architecture.md](../apps/landing/architecture.md). Não há dependência de sitemap do Astro.
> - O texto da meta do CTA final usa cor sólida (88%) em vez dos 78% do protótipo, que ficavam em 4,2:1 sobre o laranja.

- [ ] **T-L1-01 · Tokens e fontes**
  Tokens de foundations §3.1, §4.1, §5–§9 no tema do Tailwind e em variáveis CSS. Inter, Inter Tight e Geist Mono em `woff2` (subconjunto latino) servidas pelo domínio; *preload* só da fonte de título.
  *Pronto quando:* uma página de teste mostra cores e escalas iguais às do protótipo, sem requisições externas.

- [ ] **T-L1-02 · Layout base e SEO**
  `layouts/Base.astro`: `lang="pt-BR"`, título, descrição, canônico, Open Graph (RF-LP-08), favicons (RF-LP-09), dados estruturados sem dados inexistentes (CA-LP-02N.4), grão e luz do fundo, trilhos. `robots.txt` e `sitemap.xml`.
  *Pronto quando:* a validação de dados estruturados e a prévia do Open Graph funcionam.

- [ ] **T-L1-03 · Configuração de contato**
  `src/config/contact.ts` com número e mensagem a partir de `PUBLIC_WHATSAPP_*` (RNF-LP-09) e o componente `ContactButton` (botão-assinatura, components §1; nome acessível; nova aba no computador).
  *Pronto quando:* todos os botões usam a mesma origem (CA-TLP01.1).

- [ ] **T-L1-04 · Cabeçalho e botão fixo no celular**
  S1 e B1/B2 do contrato. O botão fixo some quando o CTA final está visível.
  *Pronto quando:* CA-TLP01.2 é verificado em 360 × 640.

- [ ] **T-L1-05 · Hero e ficha técnica**
  S2: índice, h1 único, frase, linha de apoio e ficha técnica (painel em relevo, foundations §7.1).
  *Pronto quando:* CA-LP-01.1 é verificado (360 × 640 e 1366 × 768).

- [ ] **T-L1-06 · Faixa de sintomas**
  S3 e B8: rolagem em CSS, pausa por botão, hover, foco e fora da tela; parada com movimento reduzido.
  *Pronto quando:* a faixa pode ser pausada pelo teclado (CA-TLP01.6).

- [ ] **T-L1-07 · 01 / O problema**
  S4: 4 células e o diagrama do ciclo de retrabalho em SVG, que só anima visível; contador "Redigitado ×n".
  *Pronto quando:* com movimento reduzido, o diagrama fica estático.

- [ ] **T-L1-08 · 02 / Do processo ao sistema**
  S5 e B7: abas acessíveis (padrão ARIA de abas, setas), 4 cenas, avanço de 6 s com barra laranja, pausar/reproduzir/rever, pausa no hover e fora da tela, janela antes das abas no celular, selo de ilustração. Sem JavaScript: as 4 fases empilhadas. Criar antes `specs/features/process-demo/` (spec, design, tarefas).
  *Pronto quando:* CA-TLP01.3 e CA-TLP01.6 são verificados.

- [ ] **T-L1-09 · 03 / A diferença**
  S6: dois painéis e 3 pontos; os marcadores da Zarco passam de tracejados a sólidos ao entrar na tela.
  *Pronto quando:* o conteúdo fica completo sem JavaScript.

- [ ] **T-L1-10 · 04 / Como começar**
  S7: 3 passos com índices em tecla, linha que se desenha, botão e telefone.
  *Pronto quando:* a ação de contato funciona e o layout empilha abaixo de 760 px.

- [ ] **T-L1-11 · 05 / Perguntas**
  S8: 6 perguntas em `<details>` com o texto do protótipo, marcado como rascunho até a revisão de Arthur (P8).
  *Pronto quando:* abrem pelo teclado e sem JavaScript.

- [ ] **T-L1-12 · CTA final e rodapé**
  S9 (bloco laranja, botão grafite) e S10 (lockup claro, região, WhatsApp).
  *Pronto quando:* o contraste do texto sobre o laranja é ≥ 4,5:1.

- [ ] **T-L1-13 · Página 404 e nginx**
  TELA-LP-02 com status 404; `nginx.conf` com cache longo para arquivos com hash, compressão e redirecionamentos de `http://` e `www.` (RNF-LP-08).
  *Pronto quando:* um endereço inexistente responde 404 com o link para `/`.

- [ ] **T-L1-14 · Revisão de qualidade**
  Checklist da strategy §3.3: Lighthouse no celular ≥ 90 em tudo, sem JavaScript, sem requisições externas, teclado, movimento reduzido, 320–1920 px sem rolagem horizontal (CA-TLP01.7), orçamento de 15 KB de JS.
  *Pronto quando:* o checklist inteiro foi aprovado e registrado no PR.

---

## L2 — Publicação da landing

- [ ] **T-L2-01 · Revisão do texto (P2) e das perguntas (P8)**
  Arthur revisa o texto final, as 6 respostas e os termos de busca prioritários. Aplicar e atualizar os specs.
  *Pronto quando:* Arthur aprovar o texto.

- [ ] **T-L2-02 · Serviço no Coolify**
  Criar o serviço `landing` a partir do GitHub, usando o Dockerfile, com as variáveis `PUBLIC_*`.
  *Pronto quando:* o Coolify constrói e sobe a imagem.

- [ ] **T-L2-03 · Domínio e HTTPS**
  `zarcosoftware.com.br` com certificado; redirecionamentos de `www.` e `http://`.
  *Pronto quando:* CA-LP-08N.1 e CA-LP-08N.2 são verificados em produção.

- [ ] **T-L2-04 · Checklist de publicação**
  Repetir o checklist da strategy §3.3 em produção, incluindo a prévia do link no WhatsApp.
  *Pronto quando:* aprovado por Arthur. A landing está publicada.

---

## C1 — Acesso ao CRM

**Objetivo:** entrar, navegar na área protegida, sair, e a sessão expirar em 8 horas. Ref.: [architecture.md](../apps/crm/architecture.md), [auth.md](../apps/crm/contracts/auth.md), [ADR-0002](../adr/0002-camadas-da-api.md), [ADR-0003](../adr/0003-autenticacao-jwt-cookie.md).

- [ ] **T-C1-01 · Configuração e erros da API**
  `config/env.ts` (validação com Zod), `AppError` e subclasses, middleware global de erros no formato de [contracts/README.md §3](../apps/crm/contracts/README.md), `404 ROUTE_NOT_FOUND`, limite de corpo de 100 KB, `Cache-Control: no-store`.
  *Pronto quando:* um teste confirma o formato de erro para 400, 404 e 500.

- [ ] **T-C1-02 · Middlewares do ecossistema Express**
  `helmet`, `cookie-parser`, `cors` (restrito à origem do CRM), `pino-http` (sem registrar senhas, cookies ou tokens).
  *Pronto quando:* os logs saem em JSON e não contêm o cabeçalho de cookie.

- [ ] **T-C1-03 · Prisma e usuário**
  `schema.prisma` com `User` (e-mail único, hash de senha), primeira migração, instância única do Prisma Client.
  *Pronto quando:* `prisma migrate deploy` roda nos dois bancos.

- [ ] **T-C1-04 · Comando `user:set-password`**
  Cria ou atualiza o usuário único; pede a senha no terminal sem mostrá-la; hash argon2id.
  *Pronto quando:* o comando cria o usuário e troca a senha.

- [ ] **T-C1-05 · Módulo `auth` na API**
  Login, logout e `me` seguindo as camadas (rotas com composição explícita → controller → use case → contrato de repositório → implementação Prisma). JWT em cookie `zarco_session` (HttpOnly, Secure, SameSite=Strict, Path=/api, 8 h). `express-rate-limit` com 5 erros em 15 minutos. Middleware de autenticação.
  *Pronto quando:* os contratos de `auth.md` estão implementados.

- [ ] **T-C1-06 · Testes de `auth`**
  Casos de strategy §3.1 (atributos do cookie, credencial errada sem indicar o campo, 6ª tentativa → 429, sem cookie → 401, token expirado → 401, logout sem sessão → 204).
  *Pronto quando:* todos passam no CI.

- [ ] **T-C1-07 · Contratos compartilhados de `auth`**
  Schemas Zod de login e `me` em `packages/contracts`, usados pela API e pela web.
  *Pronto quando:* a API valida com eles e a web compila com os tipos.

- [ ] **T-C1-08 · Base da web**
  Tokens de foundations §3.2/§4.2 no Tailwind; TanStack Router e Query; Axios (`baseURL "/api"`, `withCredentials`, 401 → limpa o cache e vai para `/login?voltar=`); proxy `/api` do Vite.
  *Pronto quando:* a web conversa com a API local sem CORS.

- [ ] **T-C1-09 · Tela de login**
  TELA-CRM-01 com React Hook Form e `zodResolver`; mensagens de erro e bloqueio; `?voltar=` só com rotas internas (CA-TCRM01.2).
  *Pronto quando:* o login leva ao Início ou à rota de retorno.

- [ ] **T-C1-10 · Layout protegido**
  `_auth.tsx` (G1): barra superior (components §2) com navegação, marcador laranja, "Sair" e avatar; aviso breve; sessão expirada (G2).
  *Pronto quando:* sem sessão, qualquer rota redireciona para o login.

- [ ] **T-C1-11 · Revisão de C1**
  Teclado e foco visível na barra superior e no login; specs atualizados.
  *Pronto quando:* a definição de pronto (strategy §7) é atendida.

---

## C2 — Clientes

- [ ] **T-C2-01 · Contratos de `clients`** em `packages/contracts` ([clients.md](../apps/crm/contracts/clients.md)).
- [ ] **T-C2-02 · Módulo `clients` na API** (listar, detalhar com projetos, criar, editar, excluir; nome único sem diferenciar maiúsculas; `422 CLIENT_HAS_PROJECTS`). O use case de exclusão recebe o contrato de projetos (modules.md §3).
  *Pronto quando:* os contratos estão implementados.
- [ ] **T-C2-03 · Testes de `clients`** (strategy §3.1). *Pronto quando:* passam no CI.
- [ ] **T-C2-04 · Telas** TELA-CRM-06 (lista), 07 (detalhe, com bloqueio de exclusão C8) e 08 (formulário), mais a sobreposição OV-02 (cliente rápido, usada em C3).
  *Pronto quando:* F-CRM-06 (excluir cliente) funciona com as duas variantes.
- [ ] **T-C2-05 · Revisão de C2** (teclado, estados vazio, carregando e erro; specs).

---

## C3 — Projetos

- [ ] **T-C3-01 · Contratos de `projects`** ([projects.md](../apps/crm/contracts/projects.md)).
- [ ] **T-C3-02 · Módulo `projects` na API**, com fases, saúde apagada no encerramento, `422 HEALTH_NOT_ALLOWED_WHEN_CLOSED`, filtro `status`, `taskCount`, exclusão com as tarefas em uma transação (`deleteWithTasks`).
- [ ] **T-C3-03 · Testes de `projects`** (strategy §3.1).
- [ ] **T-C3-04 · Lista de projetos** TELA-CRM-03, com o filtro segmentado na URL.
- [ ] **T-C3-05 · Projeto e formulário** TELA-CRM-04 (fase e saúde editáveis no próprio lugar, aviso de encerramento, links em nova aba, exclusão com a contagem de tarefas) e TELA-CRM-05 (com OV-02).
- [ ] **T-C3-06 · Início, parte 1** TELA-CRM-02: saudação e data; faixa de projetos (cartões com progresso de fase e saúde, na ordem Bloqueado → Atenção → No prazo → sem avaliação, depois previsão de entrega).
  *Pronto quando:* CA-TCRM02.1 e CA-TCRM02.2 são verificados.
- [ ] **T-C3-07 · Revisão de C3.**

---

## C4 — Tarefas e kanban

- [ ] **T-C4-01 · Spec de funcionalidade** `specs/features/kanban/` (spec, design, tarefas), incluindo a **decisão da estratégia de cache do TanStack Query** (rascunho em [data-cache.md](../apps/crm/data-cache.md)) e a estratégia de posição das tarefas. Aprovação de Arthur.
- [ ] **T-C4-02 · Contratos de `tasks`** ([tasks.md](../apps/crm/contracts/tasks.md)).
- [ ] **T-C4-03 · Módulo `tasks` na API**: quadro geral (só projetos em andamento), quadro do projeto, regra dos 14 dias e `hiddenDoneCount`, `move` (data de conclusão, `INVALID_MOVE_TARGET`), `isTaskOverdue` compartilhado em `contracts`.
- [ ] **T-C4-04 · Testes de `tasks`** (strategy §3.1, incluindo a ordem após vários movimentos).
- [ ] **T-C4-05 · Componente de quadro** (navigation.md §4; components §2): colunas, cartões, estados de atrasada e concluída, contadores.
- [ ] **T-C4-06 · Criação rápida** (UX C2), com o seletor de projeto no quadro geral.
- [ ] **T-C4-07 · Arrastar e soltar com dnd-kit**, mais a alternativa pelo teclado no menu "⋯" (Mover para, Subir, Descer), com atualização otimista e reversão em erro.
- [ ] **T-C4-08 · Quadro no Projeto e no Início**: filtro por projeto na URL (`?projeto=`); "Mostrar todas as concluídas (N)" no quadro do projeto; diálogo da tarefa (OV-01).
- [ ] **T-C4-09 · Revisão de C4** (só com o teclado, do começo ao fim; F-CRM-02).

---

## C5 — Modelos e categorias

- [ ] **T-C5-01 · Contratos de `templates`** ([templates.md](../apps/crm/contracts/templates.md)).
- [ ] **T-C5-02 · Armazenamento de arquivos**: contrato `FileStorage` e implementação em disco (`UPLOAD_DIR`), com gravação antes do registro e remoção se o registro falhar (ADR-0004; domínio §5).
- [ ] **T-C5-03 · Módulo `templates` na API**: `multer` com 20 MB, `file-type` para conferir a assinatura do arquivo, envio, substituição (o anterior só é removido depois), edição, download com `Content-Disposition` e o nome original, exclusão; categorias com bloqueio de exclusão.
- [ ] **T-C5-04 · Seed** das 9 categorias iniciais (CA-CRM-08.1).
- [ ] **T-C5-05 · Testes de `templates`** (strategy §3.1, incluindo arquivo disfarçado → 415 e nada sobrando no disco depois de uma falha).
- [ ] **T-C5-06 · Tela de modelos** TELA-CRM-09 com OV-03 (envio com progresso e área de arrastar), OV-04 e OV-05.
- [ ] **T-C5-07 · Revisão de C5.**

---

## C6 — Publicação do CRM

- [ ] **T-C6-01 · PostgreSQL no Coolify** (serviço gerenciado, volume).
- [ ] **T-C6-02 · Serviço `crm-api`**: variáveis (`DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `UPLOAD_DIR`), volume persistente de arquivos, *healthcheck* em `/api/health`, migrações na subida.
- [ ] **T-C6-03 · Serviço `crm-web`**: nginx servindo a SPA e repassando `/api` para a API pela rede interna.
- [ ] **T-C6-04 · Domínio** `crm.zarcosoftware.com.br` com HTTPS; o CRM não aparece em buscadores (CA-CRM-02N.3).
- [ ] **T-C6-05 · Usuário de produção** criado com `user:set-password` no contêiner da API.
- [ ] **T-C6-06 · Verificação final**: Arthur executa os fluxos F-CRM-01 a F-CRM-09 em produção.
  *Pronto quando:* aprovado por Arthur. O CRM está publicado.
