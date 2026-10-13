# Especificações do ecossistema Zarco

Fonte oficial de requisitos, decisões e contratos do repositório `zarco-ecossystem`, conduzida por Spec-Driven Development. Documentos gerados não são considerados aprovados até validação explícita de Arthur.

> **Situação (12/10/2026):** especificação concluída, com as 12 etapas aprovadas. **A implementação ainda não foi autorizada.** Orientação para agentes: [../AGENTS.md](../AGENTS.md). Checklist de execução: [delivery/tasks.md](delivery/tasks.md).

## Estado das etapas

| # | Etapa | Estado | Documentos |
|---|---|---|---|
| 01 | Descoberta e visão geral | Aprovada com pendências (12/10/2026) | [product/overview.md](product/overview.md) |
| 02 | Requisitos e regras de negócio | Aprovada com pendências (12/10/2026) | [product/requirements.md](product/requirements.md), [product/business-rules.md](product/business-rules.md), [product/use-cases.md](product/use-cases.md) |
| 03 | Modelagem de domínio | Aprovada (12/10/2026) | [product/domain-model.md](product/domain-model.md) |
| 04 | Auditoria de UX | Aprovada (12/10/2026) | [experience/ux-audit.md](experience/ux-audit.md), [experience/user-flows.md](experience/user-flows.md) |
| 05 | Contratos de frontend | Aprovada (12/10/2026) | [apps/landing/routes.md](apps/landing/routes.md), [apps/crm/navigation.md](apps/crm/navigation.md), [apps/crm/routes.md](apps/crm/routes.md) |
| 06 | Auditoria de marca e DNA visual | Aprovada (12/10/2026) | [design/brand-audit.md](design/brand-audit.md), [design/visual-dna.md](design/visual-dna.md) |
| 07 | Design system e prototipação | **Aprovada** (12/10/2026). **Protótipos oficiais:** landing [prototypes/landing/index.html](../prototypes/landing/index.html) (tema escuro, direção "planta de engenharia") e CRM [prototypes/crm/inicio.html](../prototypes/crm/inicio.html). Os protótipos antigos foram removidos. Design system reescrito a partir deles na Etapa 12. | [design/landing-creative-direction.md](design/landing-creative-direction.md) · [design/design-system/](design/design-system/foundations.md) |
| 08 | Definição arquitetural | Aprovada (12/10/2026) | [apps/README.md](apps/README.md), [apps/landing/architecture.md](apps/landing/architecture.md), [apps/crm/architecture.md](apps/crm/architecture.md), [apps/crm/modules.md](apps/crm/modules.md), [adr/](adr/README.md) |
| 09 | Contratos técnicos | Aprovada (12/10/2026) | [apps/crm/contracts/](apps/crm/contracts/README.md) |
| 10 | Estratégia de qualidade | Aprovada (12/10/2026) | [quality/strategy.md](quality/strategy.md) |
| 11 | Planejamento de implementação | Aprovada (12/10/2026) | [delivery/implementation-plan.md](delivery/implementation-plan.md) · checklist: [delivery/tasks.md](delivery/tasks.md) |
| 12 | Auditoria final | Aprovada (12/10/2026) | [delivery/spec-audit.md](delivery/spec-audit.md) |

Estados possíveis: Não iniciada · Em descoberta · Em elaboração · Em revisão · Aprovada · Aprovada com pendências · Bloqueada.

## Fontes de referência

| Fonte | Conteúdo | Papel |
|---|---|---|
| [brand/briefing.md](brand/briefing.md) | Estratégia, posicionamento, tom de voz, vocabulário, processo e paleta | Fonte oficial da estratégia e da comunicação da marca |
| [../assets/README.md](../assets/README.md) | Pacote da marca (Brand System v1): logos, monograma, lockups, favicons, gráficos, social, documentos, apresentação, e-mail | Fonte oficial dos **arquivos** da marca. As **regras de interface** (tipografia, raios, materiais, movimento) foram substituídas pelo [design system](design/design-system/foundations.md). |

Estrutura de `assets/`:

```text
assets/
├── brand/          wordmark, monogram, lockup, endorsement, favicon
├── graphics/       Z Percurso, grid, registro, cotas, fluxo, coordenadas, fundos
├── social/         LinkedIn, GitHub, Open Graph, templates de post
├── documents/      modelos .docx (proposta, escopo, contrato, aceite, etc.)
├── presentation/   apresentação institucional .pptx
├── email/          assinatura de e-mail
└── README.md
```

Hierarquia de fontes: o **briefing** é a fonte da estratégia, da comunicação e da paleta; o **design system** é a fonte das regras de interface; o `assets/README.md` é a fonte dos arquivos da marca. Divergências devem ser registradas e resolvidas, não escolhidas silenciosamente.

## Convenções

- **[C]** confirmado · **[H]** hipótese · **[P]** pendência.
- Cada definição tem uma única fonte. Os demais documentos apenas fazem referência a ela.
- Pastas e documentos são criados somente quando há conteúdo fundamentado.
