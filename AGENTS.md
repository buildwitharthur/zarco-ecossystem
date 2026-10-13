# AGENTS.md — orientação para agentes de desenvolvimento

Este repositório é o ecossistema de software da **Zarco**. A pasta [`specs/`](specs/README.md) é a **fonte oficial** de requisitos, decisões, contratos e padrões. Este arquivo só orienta como trabalhar com ela e não substitui nenhum documento de `specs/`.

## Antes de qualquer tarefa

1. Leia o [`specs/README.md`](specs/README.md): estado das etapas e mapa dos documentos.
2. Encontre a tarefa em [`specs/delivery/tasks.md`](specs/delivery/tasks.md) e leia os documentos linkados nela.
3. **Não comece implementação sem autorização explícita de Arthur.**

## Hierarquia de fontes

| Assunto | Fonte oficial |
|---|---|
| Estratégia, comunicação, paleta | [`specs/brand/briefing.md`](specs/brand/briefing.md) |
| Requisitos, regras, casos de uso, domínio | [`specs/product/`](specs/product/) |
| Telas e comportamento | [`specs/apps/<app>/routes.md`](specs/apps/), [`navigation.md`](specs/apps/crm/navigation.md) |
| Aparência (tokens, componentes, padrões) | [`specs/design/design-system/`](specs/design/design-system/foundations.md). Os protótipos em `prototypes/` são **referência visual**, não código para copiar. |
| Arquitetura e decisões | [`specs/apps/*/architecture.md`](specs/apps/README.md), [`specs/adr/`](specs/adr/README.md) |
| Contratos da API | [`specs/apps/crm/contracts/`](specs/apps/crm/contracts/README.md); depois da implementação, `packages/contracts` |
| Qualidade e definição de pronto | [`specs/quality/strategy.md`](specs/quality/strategy.md) |

Documentos marcados como **históricos** (`specs/design/visual-dna.md`, `specs/design/brand-audit.md`) não são referência. As regras de interface do `assets/README.md` foram substituídas pelo design system.

## Regras de trabalho

- **Respeite as decisões aprovadas.** Não reabra decisões de requisito, arquitetura ou design sem uma justificativa concreta e a aprovação de Arthur.
- **Mudanças estruturais exigem aprovação** antes de serem feitas: novas aplicações, pacotes, camadas, bibliotecas relevantes, mudanças de contrato ou de esquema que afetem outros módulos.
- **Sem abstrações arbitrárias.** Não crie interfaces, factories, serviços, contêineres de injeção de dependências ou camadas que os specs não prevejam. O contrato de repositório por módulo existe por um motivo registrado no [ADR-0002](specs/adr/0002-camadas-da-api.md); não replique o padrão sem motivo equivalente.
- **Camadas da API:** controllers validam com Zod e chamam um use case; use cases não importam Express nem Prisma; só os repositórios Prisma importam o Prisma. Composição explícita no arquivo de rotas do módulo.
- **Erros:** lance `AppError` e subclasses; o middleware global formata a resposta. Não trate erros repetidamente nos controllers.
- **Bibliotecas do ecossistema Express** (`cookie-parser`, `express-rate-limit`, `cors`, `helmet`, `multer`, `pino-http`…) em vez de implementar na mão.
- **Verifique o contrato antes de mudar uma interface.** Toda mudança de rota, formato ou erro começa atualizando o contrato em `specs/` (ou em `packages/contracts`) e é aprovada antes.
- **Comunicação:** textos de interface em português, na voz institucional ("a Zarco"), sem inventar clientes, números ou cases (RN-LP-01).
- **Acessibilidade e movimento:** foco visível, teclado, `prefers-reduced-motion` e pausa para animações automáticas são requisitos, não extras.

## Antes de considerar uma tarefa concluída

1. Os critérios "Pronto quando" da tarefa e os critérios de aceite dos requisitos foram verificados.
2. Os testes exigidos em `specs/quality/strategy.md` §3 existem e passam.
3. `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` e o build passam (o CI repete tudo).
4. Os specs afetados foram atualizados.
5. A tarefa foi marcada em `specs/delivery/tasks.md`, com data e PR.

## Git

- Trabalhe em branch e abra pull request; a `main` só aceita merge com o CI aprovado.
- Commits pequenos e descritivos. Nunca commite segredos (`.env`, chaves, senhas).
