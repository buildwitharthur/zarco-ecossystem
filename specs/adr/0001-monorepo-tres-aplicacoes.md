# ADR-0001 — Monorepo com três aplicações e pacote de contratos

**Estado:** Aceita · **Data:** 12/10/2026

## Contexto

O repositório reúne todo o ecossistema da Zarco (overview §1). O escopo inicial tem uma landing estática focada em SEO e um CRM interno com login. Uma pessoa mantém tudo. Arthur trabalha com TypeScript, React e Express. Ele prefere uma SPA para aplicações administrativas, em vez do Next.js, e uma API independente para poder evoluir o backend em incrementos.

## Alternativas

| Alternativa | A favor | Contra |
|---|---|---|
| **A. Três aplicações: landing (Astro), crm-web (SPA) e crm-api (Express)**, com pacote de contratos | Cada parte usa a ferramenta adequada. A API evolui de forma independente e já fica pronta para outros consumidores. A stack é a que Arthur domina. | Três deploys. Contratos HTTP precisam ser mantidos (mitigado pelo pacote compartilhado). |
| B. CRM full-stack (ex.: Next.js) + landing | Um deploy a menos e sem contrato HTTP | Arthur considera que o Next adiciona complexidade em aplicações administrativas. A API fica acoplada à interface. |
| C. Landing e CRM-web no mesmo framework | Uma ferramenta a menos | Astro é melhor para conteúdo estático; a SPA é melhor para a aplicação. Misturar os dois prejudica ambos. |

## Decisão

Alternativa **A**, decidida por Arthur. Monorepo com `apps/landing`, `apps/crm-web`, `apps/crm-api` e `packages/contracts` (schemas Zod compartilhados). Gerenciador: pnpm workspaces (proposta).

## Consequências

- Os tipos de requisição e resposta ficam definidos uma única vez em `contracts`. Uma mudança na API que quebra a web é detectada pela verificação de tipos no CI.
- São três imagens Docker e três serviços no Coolify (ver [apps/README.md](../apps/README.md)).
- Um novo consumidor da API (ex.: integração futura) não exige reestruturar o projeto.
