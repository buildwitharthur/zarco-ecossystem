# Demonstração "Do processo ao sistema" — desenho

> **Estado:** Em revisão (13/10/2026). Complementa [spec.md](spec.md). Aparência: [components.md §1](../../design/design-system/components.md) e [foundations.md](../../design/design-system/foundations.md). Referência visual exata: [protótipo](../../../prototypes/landing/index.html).

## 1. Estrutura

Componente `ProcessDemo.astro`, com o script no próprio arquivo (sem biblioteca).

```text
section.bench
└── .demo                      (estado: is-paused, is-manual)
    ├── div                    (fases + controle)
    │   ├── .phases            (vira tablist com JavaScript)
    │   │   └── .phase ×4      (vira tab: índice, título, descrição, barra de progresso)
    │   └── .demo__ctrl > button#play
    └── figure.window
        ├── .window__bar       (3 luzes, nome do artefato, selo)
        ├── .stage > .scene ×4 (vira tabpanel)
        └── figcaption.window__foot (aviso + contagem)
```

Em < 960 px, a janela vem antes das fases (ordem visual por CSS; a ordem no documento continua fases → janela).

## 2. Estado

Um objeto local com `current` (0–3), `playing`, `visible` e `hovering`. O avanço é um único `setTimeout` de 6 s, recriado a cada troca de fase e cancelado em qualquer mudança de estado. Não há `setInterval`.

| Entrada | Efeito |
|---|---|
| Entra na tela | `visible = true`; agenda o avanço se `playing` |
| Sai da tela | `visible = false`; cancela o avanço |
| Ponteiro entra/sai | `hovering`; ao sair, recomeça a fase atual |
| Escolhe uma fase | `playing = false`, classe `is-manual`, mostra a fase |
| Botão de controle | Alterna `playing`; no fim, "Rever" volta à fase 01 |
| Fim da fase 04 | `playing = false` e `is-manual` |

## 3. Movimento

- A linha de progresso é uma **animação CSS** (`height`/`width` 0 → 100% em `--dur`); pausar é `animation-play-state`. O avanço (JS) e a barra (CSS) usam a mesma duração (`--dur: 6s`).
- Troca de cena: `opacity` e `transform` (400 ms). As animações internas de cada cena (entrada escalonada dos itens, pulso do gargalo) reiniciam quando a cena fica ativa.
- Reiniciar uma animação CSS: remover e devolver `animation` com um *reflow* entre os dois.
- Orçamento: só `transform`, `opacity` e as barras de progresso. Nada de layout contínuo.

## 4. Decisões

| Tema | Decisão | Motivo |
|---|---|---|
| Papéis ARIA | Acrescentados pelo script | Sem JavaScript as fases são só texto; abas inertes confundiriam leitores de tela |
| Foco no avanço | O avanço automático não move o foco | Não interromper quem lê ou navega |
| Ao fim | Para, não repete | WCAG 2.2.2 e menos distração |
| Duração | Constante única de 6 s | Mesma fonte para o JS e a barra CSS |
