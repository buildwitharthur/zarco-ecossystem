# Landing page — rotas e contratos de tela

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Requisitos: [RF-LP / RNF-LP](../../product/requirements.md#1-landing-page) · Regras: [RN-LP](../../product/business-rules.md#1-landing-page) · UX: [ux-audit.md §1](../../experience/ux-audit.md) · Fluxos: [F-LP](../../experience/user-flows.md#1-landing-page)

Legenda: **[C]** aprovado em etapa anterior · **[H]** proposta desta etapa, aguardando aprovação

Este documento define **comportamento**, não aparência. Layout, cores e tipografia serão definidos nas Etapas 06 e 07. A navegação da landing é trivial (uma página, sem menu: UX L1), por isso não há um `navigation.md` separado.

---

## 1. Rotas

| Rota | Tela | Observação |
|---|---|---|
| `/` | TELA-LP-01 Página principal | Endereço canônico: `https://zarcosoftware.com.br/` |
| qualquer outra | TELA-LP-02 Página não encontrada | Responde com status 404 **[C]** |
| `/robots.txt`, `/sitemap.xml` | — (arquivos, não telas) | RNF-LP-02 |

Redirecionamentos: `http://` e `www.` vão para o endereço canônico (RNF-LP-08). **[C]**

## 2. Destino de conversão (definição única)

Toda ação de contato da página usa o mesmo destino, definido em um único lugar (RNF-LP-09):

| Item | Valor |
|---|---|
| Número | +55 21 97514-0550 |
| Mensagem | "Olá! Vim pelo site da Zarco e quero conversar sobre um caso da minha empresa." |
| Destino | Link universal do WhatsApp (`https://wa.me/5521975140550?text=<mensagem codificada>`) **[C]** |
| Abertura | Em nova aba no computador (UX L7); no celular, o sistema abre o aplicativo **[C]** |
| Rótulo | "Converse sobre o seu caso", com o ícone do WhatsApp; nome acessível: "Converse sobre o seu caso pelo WhatsApp" (UX L3) **[C]** |

O link universal `wa.me` é a forma documentada pelo próprio WhatsApp para abrir uma conversa com um número e um texto. Ele funciona no celular e no computador.

---

## 3. Contratos de tela

### TELA-LP-01 — Página principal

| # | Item | Contrato |
|---|---|---|
| 1 | Identificador e nome | TELA-LP-01 · Página principal |
| 2 | Rota | `/` |
| 3 | Objetivo | Fazer o visitante entender, em poucos segundos, o que a Zarco faz, como trabalha e por que entrar em contato, e levá-lo a iniciar uma conversa no WhatsApp. |
| 4 | Atores e permissões | Visitante anônimo. Sem autenticação. |
| 5 | Requisitos | RF-LP-01 a RF-LP-09 · RNF-LP-01 a RNF-LP-09 · RN-LP-01 a RN-LP-09 |
| 6 | Informações | Ver as seções abaixo. Texto do protótipo oficial; revisão final antes da publicação (plano, P2). |
| 7 | Componentes funcionais | Ver [components.md §1](../../design/design-system/components.md) |
| 8 | Ações | Iniciar conversa no WhatsApp (única ação). Selecionar ou tocar no número exibido. |
| 9 | Comportamentos | Ver a seção "Comportamentos" abaixo. |
| 10 | Estados | Ver a seção "Estados" abaixo. |
| 11 | Entrada e saída | **Entrada:** busca orgânica, link compartilhado, digitação direta. **Saída:** WhatsApp (app ou web), ou abandono. |
| 12 | Critérios de aceite | Ver a seção "Critérios de aceite" abaixo. |

**Seções, em ordem** — conteúdo e composição detalhados em [landing-creative-direction.md §5](../../design/landing-creative-direction.md); aparência em [components.md §1](../../design/design-system/components.md) **[C]**

| # | Seção | Conteúdo obrigatório | Ação de contato | Requisitos |
|---|---|---|---|---|
| S1 | Cabeçalho | Wordmark | Sim, ≥ 960 px, fixo | RF-LP-06 |
| S2 | Hero | Índice, h1 (único), frase, linha de apoio "Diagnóstico gratuito. Orçamento depois de entender o problema.", **ficha técnica** (3 garantias) | Sim (principal) | RF-LP-01, RF-LP-13 |
| S3 | Faixa de sintomas | Lista de sintomas, sem números inventados, com controle de pausa | Não | RF-LP-10 |
| S4 | 01 / O problema | 4 sintomas (001–004) e o diagrama do ciclo de retrabalho | Não | RF-LP-02 |
| S5 | 02 / Do processo ao sistema | 4 fases (diagnóstico, decisão, escopo, sistema), janela da demonstração, selo "Ilustração do método. Não representa um cliente." | Não | RF-LP-04 |
| S6 | 03 / A diferença | Comparação "Orçamento antes de entender" × "Diagnóstico antes do orçamento" e 3 pontos | Não | RF-LP-05 |
| S7 | 04 / Como começar | Mensagem → conversa gratuita → proposta, mais o botão e o telefone | Sim | RF-LP-11 |
| S8 | 05 / Perguntas | 6 perguntas em `<details>` | Não | RF-LP-12 |
| S9 | CTA final (laranja) | Título, frase, botão e telefone | Sim | RF-LP-06 |
| S10 | Rodapé | Lockup, região, WhatsApp, direitos | Telefone como link | RF-LP-07 |

**Comportamentos** **[C]**

- **B1 — Botão fixo no celular:** aparece quando a ação do hero sai da tela e some quando a ação do CTA final está visível.
- **B2 — Cabeçalho fixo** (≥ 960 px), com a ação de contato.
- **B3 — Telefone em texto:** selecionável e, no celular, abre a mesma conversa.
- **B4 — Sem dependência de JavaScript para o conteúdo:** texto, links, as 4 fases (empilhadas) e as perguntas funcionam sem JavaScript.
- **B5 — Sem saídas** além do WhatsApp.
- **B6 — Movimento:** padrões de [patterns.md §3](../../design/design-system/patterns.md). Pausa fora da tela; "movimento reduzido" respeitado.
- **B7 — Demonstração:** avanço automático de 6 s por fase, pausa no hover, botão pausar/reproduzir/rever, abas operáveis por teclado (setas). Interação manual interrompe o avanço. No celular, a janela vem antes das abas.
- **B8 — Faixa de sintomas:** pausa por botão, por hover (com ponteiro), por foco e fora da tela.

**Estados**

| Estado | Comportamento |
|---|---|
| Carregamento | Sem estado visível; o conteúdo vem no HTML (B4) |
| Vazio | Não se aplica |
| Erro | O WhatsApp pode não abrir; o telefone em texto é a alternativa |
| Sucesso | A conversa abre no WhatsApp, fora da página |

**Critérios de aceite da tela** (somam-se aos de RF-LP e RNF-LP)

- **CA-TLP01.1** Todas as ações de contato abrem o mesmo destino da seção 2, com a mensagem pré-preenchida.
- **CA-TLP01.2** Em 360 × 640, depois de rolar para além do hero, o botão fixo está visível e funciona.
- **CA-TLP01.3** Com o JavaScript desligado, o texto completo, as 4 fases, as perguntas e todas as ações de contato funcionam.
- **CA-TLP01.4** A página tem exatamente um h1, e as seções usam títulos em ordem hierárquica.
- **CA-TLP01.5** A página não faz requisições a outros domínios, não define cookies e não usa armazenamento local.
- **CA-TLP01.6** A demonstração e a faixa podem ser pausadas pelo teclado, e nada se move sozinho com "movimento reduzido" ativo.
- **CA-TLP01.7** A página funciona sem rolagem horizontal de 320 px a 1920 px.

### TELA-LP-02 — Página não encontrada

| # | Item | Contrato |
|---|---|---|
| 1 | Identificador | TELA-LP-02 · Página não encontrada |
| 2 | Rota | Qualquer endereço inexistente |
| 3 | Objetivo | Não deixar o visitante em um beco sem saída. |
| 4 | Atores | Visitante anônimo |
| 5 | Requisitos | RNF-LP-02 (status correto para buscadores) |
| 6 | Informações | Mensagem curta dizendo que a página não existe |
| 7–8 | Componentes e ações | Link para a página principal e a ação de contato da seção 2 |
| 9 | Comportamentos | Responde com status HTTP 404 e não é indexada |
| 10 | Estados | Único estado |
| 11 | Entrada e saída | Entrada: link quebrado ou endereço digitado errado. Saída: `/` ou WhatsApp |
| 12 | Critério de aceite | **CA-TLP02.1** Um endereço inexistente responde 404 e mostra o link para `/` |
