# Demonstração "Do processo ao sistema" — especificação

> **Estado:** Em revisão (13/10/2026). Criada na L1 (T-L1-08), conforme o [plano](../../delivery/implementation-plan.md). Aguarda aprovação de Arthur.
> Requisitos: [RF-LP-04](../../product/requirements.md) · Contrato de tela: [routes.md](../../apps/landing/routes.md) (S5, B6, B7, CA-TLP01.3, CA-TLP01.6) · Aparência: [components.md §1](../../design/design-system/components.md) · Protótipo: [prototypes/landing/index.html](../../../prototypes/landing/index.html)

## 1. Objetivo

Mostrar, em 24 segundos e sem texto longo, como a Zarco transforma um processo em planilha em um sistema: diagnóstico, decisão, escopo e sistema. É uma **ilustração do método**, não a demonstração de um cliente (RN-LP-01).

## 2. Comportamento

| # | Regra |
|---|---|
| D1 | Quatro fases (Diagnóstico, Decisão, Escopo, Sistema), cada uma com uma cena na janela. Só uma cena fica visível. |
| D2 | A página abre com a fase 01 ativa. Quando a demonstração entra na tela (≥ 35% visível), o avanço automático começa; sai da tela, pausa. |
| D3 | Cada fase dura **6 s**, mostrados pela linha laranja de progresso da fase ativa. |
| D4 | Ao fim da fase 04 o avanço **para** (não volta ao início sozinho) e o botão passa a "Rever". |
| D5 | O ponteiro sobre a demonstração pausa o avanço. Ao sair, a fase atual recomeça. |
| D6 | Escolher uma fase (clique, toque, teclado) **interrompe** o avanço automático. A linha de progresso fica cheia. |
| D7 | Botão único de controle: **Pausar** → **Reproduzir** → (ao fim) **Rever**, que volta à fase 01 e reproduz. |
| D8 | Com "movimento reduzido", o avanço não começa sozinho e nenhuma animação de entrada roda. As fases continuam navegáveis, e o botão "Reproduzir" (ação explícita do visitante) pode iniciar o avanço. |
| D9 | O nome do artefato na barra da janela e a contagem "0n / 04" acompanham a fase ativa. |

## 3. Teclado e leitores de tela

- As fases seguem o padrão ARIA de abas: `tablist`, `tab` com `aria-selected` e `aria-controls`, `tabpanel` com `aria-labelledby`.
- Apenas a aba ativa está na ordem de tabulação. **Setas** (←, →, ↑, ↓) movem entre as abas, com ciclo; **Home** e **End** vão à primeira e à última. A aba que recebe o foco é ativada.
- **Enter** e **Espaço** ativam a aba focada.
- O botão de controle é alcançável e tem nome acessível que muda com o estado ("Pausar a demonstração", "Reproduzir a demonstração", "Rever a demonstração").
- O avanço automático **não** move o foco nem anuncia nada (a troca não é uma mensagem ao usuário).

## 4. Aprimoramento progressivo

| Estado | Resultado |
|---|---|
| HTML sem JavaScript | As 4 fases aparecem empilhadas, com a descrição aberta, seguidas das 4 cenas completas. Não há botão de controle e nem papéis de aba (seriam inertes). |
| Com JavaScript | O script acrescenta os papéis ARIA, o foco por setas, o avanço, a pausa e o botão de controle. |

## 5. Critérios de aceite

- **CA-DEMO-01** Sem JavaScript, as 4 fases e as 4 cenas estão no documento, visíveis e legíveis (CA-TLP01.3).
- **CA-DEMO-02** A demonstração pode ser pausada, reproduzida e revista apenas com o teclado (CA-TLP01.6).
- **CA-DEMO-03** Com "movimento reduzido", nada se move sozinho: nem o avanço, nem as animações de entrada das cenas, nem o pulso do gargalo.
- **CA-DEMO-04** Fora da tela, nenhum temporizador de avanço está ativo.
- **CA-DEMO-05** O selo "Ilustração do método. Não representa um cliente." está sempre visível na janela.
- **CA-DEMO-06** Em 360 × 640, a janela vem antes das abas, as abas rolam na horizontal e todas as cenas cabem sem rolagem horizontal da página.
- **CA-DEMO-07** O script da demonstração cabe no orçamento de JavaScript da landing (15 KB comprimidos, somando todos os scripts).

## 6. Fora do escopo

Dados reais de clientes, conteúdo editável pelo visitante, vídeo, som, e qualquer envio de dados.
