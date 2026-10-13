# Plano de implementação

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> **Checklist de execução:** [tasks.md](tasks.md) (tarefas marcadas a cada implementação)
> Qualidade e definição de "pronto": [../quality/strategy.md](../quality/strategy.md) §7 · Arquitetura: [../apps/README.md](../apps/README.md)

Ordem de entrega aprovada: **landing primeiro, depois o CRM** (overview §3). Sem prazo definido.

Cada incremento entrega um **comportamento completo e verificável** e só é concluído quando atende à definição de pronto (strategy §7). Especificações de funcionalidade em `specs/features/<nome>/` são criadas só quando a complexidade justificar, e isso está indicado em cada incremento.

---

## Visão geral

```text
I0 Fundação ──► L1 Landing ──► L2 Publicação da landing
     │
     └────────► C1 Acesso ──► C2 Clientes ──► C3 Projetos ──► C4 Tarefas e kanban ──► C5 Modelos ──► C6 Publicação do CRM
```

| # | Incremento | Resultado verificável | Depende de |
|---|---|---|---|
| I0 | Fundação do repositório | CI verde em um pull request: tipos, lint, testes e build das três aplicações | — |
| L1 | Landing completa | Página igual à versão aprovada do protótipo, com os critérios de RF-LP e RNF-LP atendidos localmente | I0, P1 |
| L2 | Publicação da landing | `https://zarcosoftware.com.br` no ar, com o checklist manual (strategy §3.3) aprovado | L1, P2 |
| C1 | Acesso ao CRM | Entrar, sair, sessão de 8 horas, limite de tentativas; a área protegida exibe a barra superior | I0 |
| C2 | Clientes | Cadastrar, editar, listar, detalhar e excluir clientes, com as regras | C1 |
| C3 | Projetos | Cadastrar e acompanhar projetos; fase e saúde editáveis no próprio lugar; Início com a faixa de projetos | C2 |
| C4 | Tarefas e kanban | Quadro do projeto e quadro geral, com criação rápida, mover por arraste e por teclado, e regra dos 14 dias | C3 |
| C5 | Modelos e categorias | Enviar, baixar, substituir e excluir modelos; gerenciar categorias | C1 |
| C6 | Publicação do CRM | `https://crm.zarcosoftware.com.br` no ar, com usuário criado e volume de arquivos persistente | C1–C5 |

C5 depende só de C1 e pode ser feito em qualquer ponto depois dele.

---

## I0 — Fundação do repositório

Somente o que todas as entregas seguintes usam.

- Monorepo pnpm (`apps/landing`, `apps/crm-web`, `apps/crm-api`, `packages/contracts`), TypeScript `strict`, versão de Node fixada.
- ESLint (incluindo a regra de imports das camadas, ADR-0002) e Prettier, configurados na raiz.
- `docker-compose.yml` com `postgres` (desenvolvimento) e `postgres-test` (testes de integração).
- Esqueleto mínimo de cada aplicação, só o bastante para compilar, passar no lint e gerar a imagem Docker. A API inclui `GET /api/health` e um teste de integração dele, para provar que a esteira de testes funciona.
- Workflow do GitHub Actions (ADR-0005): instalar → tipos → lint → testes → build das imagens.
- `README.md` da raiz com os comandos de desenvolvimento.

**Pronto quando:** um pull request de exemplo passa por todo o CI.

## L1 — Landing completa

- Tokens do [design system](../design/design-system/foundations.md) no Tailwind; Inter, Inter Tight e Geist Mono servidas pelo próprio domínio.
- Seções do contrato TELA-LP-01 (S1–S10), reproduzindo o [protótipo oficial](../../prototypes/landing/index.html): hero com ficha técnica, faixa de sintomas, problema com ciclo de retrabalho, demonstração "Do processo ao sistema", diferença, como começar, perguntas, CTA final laranja, rodapé e botão fixo no celular.
- Destino do WhatsApp definido em `src/config/contact.ts` (RNF-LP-09).
- SEO: metadados, canônico, `robots.txt`, `sitemap.xml`, dados estruturados, Open Graph e favicons. Página 404.
- Dockerfile com nginx (cache, compressão).
- O texto é o do protótipo aprovado. A revisão final do texto acontece com a landing pronta (P2), antes da publicação.

**Pronto quando:** todos os CA-LP e CA-TLP podem ser verificados localmente, e o build no CI passa.
**Spec de funcionalidade:** recomendada só para a demonstração (`specs/features/process-demo/`), por causa do avanço automático, das abas acessíveis e do aprimoramento progressivo. O resto é coberto pelo contrato de tela e pelo protótipo oficial.

## L2 — Publicação da landing

- Serviço no Coolify a partir do repositório; domínio, HTTPS e redirecionamentos de `http://` e `www.` (RNF-LP-08).
- Checklist manual antes de publicar (strategy §3.3).

**Pronto quando:** a página está no ar no domínio e o checklist foi aprovado.

## C1 — Acesso ao CRM

- **API:** app Express, configuração validada por Zod, `AppError` e middleware global de erros, `pino-http`, `helmet`, `cookie-parser`, `cors`, Prisma com o modelo `User`, módulo `auth` (login, logout, `me`) com `express-rate-limit`, comando `user:set-password`.
- **Web:** projeto Vite, TanStack Router e Query, instância do Axios, tokens do design system (CRM v2, atualizados em P4) no Tailwind, rota `/login`, layout protegido com barra superior e redirecionamento `?voltar=`.
- **Testes:** casos de `auth` (strategy §3.1).

**Pronto quando:** dá para entrar, navegar na área protegida (ainda vazia), sair, e a sessão expira em 8 horas.

## C2 — Clientes

API, contratos e telas TELA-CRM-06, 07 e 08, mais o formulário sobreposto OV-02 (que será usado em C3). Testes de `clients`.

## C3 — Projetos

API, contratos e telas TELA-CRM-03, 04 e 05. Início (TELA-CRM-02) com a **faixa de projetos**; o quadro geral entra em C4. Testes de `projects`.

## C4 — Tarefas e kanban

API (incluindo `move`, a regra dos 14 dias e a data de conclusão), o componente único de quadro (navigation.md §4) usado no Projeto e no Início, criação rápida, arraste com dnd-kit e o menu de teclado. Definição da estratégia de cache do TanStack Query (decidida durante o desenvolvimento). Testes de `tasks`.

**Spec de funcionalidade:** recomendada (`specs/features/kanban/`), por causa da ordenação, do quadro duplo e do acesso por teclado.

## C5 — Modelos e categorias

API com `multer`, `file-type` e o contrato `FileStorage` em volume (ADR-0004); *seed* das categorias; tela TELA-CRM-09 com as sobreposições OV-03, OV-04 e OV-05. Testes de `templates`.

## C6 — Publicação do CRM

Serviços `crm-web`, `crm-api` e PostgreSQL no Coolify; volume de arquivos; variáveis de ambiente; `prisma migrate deploy` na subida da API; *healthcheck*; criação do usuário em produção pelo comando administrativo; proteção da `main`.

**Pronto quando:** Arthur entra em `https://crm.zarcosoftware.com.br` e executa os fluxos F-CRM-01 a F-CRM-09.

---

## Pendências por incremento

| # | Pendência | Bloqueia | Origem |
|---|---|---|---|
| ~~P1~~ | Resolvida na Etapa 12: design system reescrito a partir dos protótipos oficiais | — | Etapa 07 |
| P2 | Texto final da landing: revisar com a landing pronta e aprovada, e definir os termos de busca prioritários (P-LP-03) | **L2** (decisão de Arthur: revisar depois da landing pronta) | Etapa 02 |
| ~~P3~~ | Resolvida: domínio registrado e DNS apontado (Arthur, 12/10/2026) | — | P-LP-04 |
| ~~P4~~ | Resolvida: design system do CRM aprovado por Arthur (v2). A documentação é alinhada junto com P1. | — | Etapa 07 |
| P5 | Atualizar as regras da marca em `assets/README.md` (raios, materiais, Inter, movimento) | Não | Etapa 07 |
| P6 | Refazer as peças de `assets/` desatualizadas (redes sociais, documentos, apresentação) | Não, e fora do software | Etapa 07 |
| P7 | Consulta ao INPI | Não | Briefing |

**Para o primeiro incremento (I0) não há pendência bloqueante.**

## Riscos do plano

| Risco | Mitigação |
|---|---|
| A demonstração ficar pesada em aparelhos fracos | Só `transform`/`opacity`, pausa fora da tela, orçamento de 15 KB de JS; testar em L1 num celular de entrada |
| A estratégia de cache adiada gerar retrabalho no kanban | Decidir no início de C4, antes de construir o quadro |
| Perda de dados do CRM por falta de backup | Risco aceito (RNF-CRM-03). Revisitar quando o CRM concentrar informação única. |
