# Design system — componentes

> **Estado:** Aprovada (12/10/2026). Reescrito na Etapa 12 a partir dos protótipos oficiais.
> Fundamentos: [foundations.md](foundations.md) · Padrões: [patterns.md](patterns.md) · Telas: [landing](../../apps/landing/routes.md), [CRM](../../apps/crm/routes.md), [navegação do CRM](../../apps/crm/navigation.md)

Este documento descreve a **aparência e os estados visuais** de cada componente. O comportamento está nos contratos de tela. A referência visual exata está nos protótipos oficiais.

---

## 1. Landing ([protótipo](../../../prototypes/landing/index.html))

| Componente | Descrição |
|---|---|
| **Trilhos e divisória** | Duas linhas verticais fixas de 1 px (`line`) delimitam o contêiner. As divisórias horizontais de largura total têm uma marca `+` de 11 px onde cruzam os trilhos. |
| **Cabeçalho** | Barra fixa de 64/72 px, fundo `bg` a 86% com desfoque de 10 px e linha inferior. Wordmark à esquerda; botão principal compacto à direita (≥ 960 px). |
| **Índice de seção** | `idx` mono: número em `text` + `/ NOME` em `text-3`. Exemplo: **02** / DO PROCESSO AO SISTEMA. |
| **Abertura de seção** | Índice → `h2` → uma frase em `text-2` (máx. 36 em) |
| **Botão principal** | Plástico macio laranja (foundations §7.1), 52 px (compacto: 40 px), raio de 6 px, ícone do WhatsApp e texto `on-accent`. **Assinatura:** quadrado de 6 px em `on-accent` no canto superior direito, que desliza 4 px na diagonal no hover. |
| **Botão grafite** | Variante em metal escuro, usada sobre o laranja. O quadrado-assinatura é laranja. |
| **Telefone** | Mono de 14 px, sublinhado de 1 px em `line-2` |
| **Ficha técnica** | Painel em relevo (raio de 12 px): cabeçalho "FICHA / 03 ITENS" e 3 linhas com número em poço escavado, título em Inter Tight de 16 px e frase de 14 px |
| **Faixa de sintomas** | Faixa de 48 px entre linhas, fundo `surface`: rótulo "SOA FAMILIAR?" (oculto < 640 px), texto mono de 12,5 px rolando com as bordas desvanecidas, e a tecla de pausa |
| **Célula de problema** | Borda compartilhada, 28–32 px de recuo: índice (`001` + categoria) → `h3` → frase. No hover (só com ponteiro): fundo `surface` e número laranja. |
| **Diagrama do ciclo** | SVG com 3 nós (retângulos `surface-raised` e rótulos mono), arestas tracejadas e um ponto `danger` com halo percorrendo o ciclo. Legenda "CICLO DE RETRABALHO · REDIGITADO ×n". |
| **Fase da demonstração** | Botão de aba: índice "FASE 0n", título em Inter Tight de 22 px e descrição expansível. Linha de progresso laranja de 2 px (vertical ≥ 960 px; horizontal abaixo). Ativa: índice laranja, título em `text`. |
| **Janela da demonstração** | Painel em relevo: barra com 3 "luzes" escavadas, nome do artefato em mono e selo "ILUSTRAÇÃO DO MÉTODO"; área de cena com altura fixa (380 px; 420 px ≤ 639 px); rodapé com o aviso e a contagem "0n / 04". Peças internas em `bench-tile`. |
| **Painéis da comparação** | Dois lados com bordas compartilhadas. "Caminho comum": texto `text-2`, marcadores tracejados. "Zarco": fundo `surface`, traço laranja no rótulo, marcadores que passam de tracejados a sólidos. |
| **Passos de "Como começar"** | 3 células com índice em tecla ("01 / MENSAGEM") e uma linha que se desenha até o próximo passo |
| **Pergunta** | `<details>`: índice em tecla, pergunta em Inter Tight (18–22 px) e "+" que gira 45°. Altura mínima de 64 px. |
| **CTA final** | Bloco laranja em toda a largura, com luz do topo; índice e título `cta-display` em `on-accent`; botão grafite e telefone |
| **Rodapé** | Lockup vertical claro, região de atendimento, WhatsApp e direitos |
| **Botão fixo (celular)** | Barra inferior com fundo `bg` a 94% e desfoque, contendo o botão principal em largura total |

## 2. CRM ([protótipo](../../../prototypes/crm/inicio.html))

| Componente | Descrição |
|---|---|
| **Barra superior** | 64 px, linha inferior em `line`. Wordmark de 18 px; navegação em contêiner `surface` (raio de 12 px, 4 px de recuo) com itens de 32 px; o item ativo fica em `raised`, com sombra de 1 px e o **marcador laranja de 6 px** (raio de 2 px); "Sair" em botão fantasma; avatar com a inicial. |
| **Botão primário** | Fundo `text`, texto `bg`, 36 px, raio de 10 px, ícone de 16 px. Hover: sobe 1 px. |
| **Botão fantasma e suave** | Fantasma: texto `text-2`, hover em `surface`. Suave: `raised` com borda `line`. |
| **Cabeçalho de página** | Saudação ou título de 24 px + linha de apoio (data) em `text-2`; ação primária à direita |
| **Cabeçalho de seção** | Título de 15 px e **contador em pílula** (`surface`, borda `line`) |
| **Cartão de projeto** | `surface`, raio de 16 px, 18 px de recuo: nome (1 linha, reticências) e cliente → **progresso de fase** → rodapé com a saúde e a entrega ("Entrega 17 out"). Hover: `raised`, sobe 2 px, sombra. Entrada escalonada (60 ms). |
| **Progresso de fase** | Rótulo da fase e "n/5"; 5 segmentos de 4 px (raio de 2 px): anteriores em `text-2`, atual em `text`, futuros em `hover`. Em "Em manutenção", a barra aparece completa, com o rótulo da fase. Projetos encerrados não aparecem na faixa. |
| **Indicador de saúde** | Pílula de 24 px com marcador de 7 px: **Bloqueado** = quadrado cheio, `danger` sobre `danger-bg`; **Atenção** = quadrado metade cheio, `text` sobre `hover`; **No prazo** = quadrado vazado, `text-2`; **Sem avaliação** = traço, `text-3`. |
| **Filtro segmentado** | Contêiner `surface` (raio de 10 px, 3 px de recuo); opções de 28 px; a selecionada em `raised` com sombra de 1 px |
| **Coluna do quadro** | `surface`, raio de 16 px, 8 px de recuo, altura mínima de 440 px. Cabeçalho com um ponto de estado (vazado, metade ou cheio), nome, contador e a dica "Últimos 14 dias" em "Feito". Recebendo arraste: `raised`. |
| **Criação rápida** | Campo de 38 px com borda tracejada `line-2` e placeholder "+ Nova tarefa". Foco: borda sólida e fundo `raised`. No quadro geral, um seletor de projeto ao lado. |
| **Cartão de tarefa** | `raised`, borda `line`, raio de 12 px: título (até 3 linhas) e metadados (etiqueta do projeto, só no quadro geral; prazo com ícone de calendário). **Atrasada:** prazo em `danger` com "Atrasada ·". Concluída: título em `text-2`. Menu "⋯" aparece no hover e no foco. Em arraste: 40% de opacidade; o destino é um espaço tracejado. |
| **Menu flutuante** | `raised`, borda `line-2`, raio de 12 px, sombra escura; itens de 8×10 px; ação destrutiva em `danger`, por último, depois de um separador |
| **Aviso breve** | Canto inferior direito, `raised`, raio de 12 px, ícone de confirmação; some em 3,5 s |
| **Campos de formulário** | Altura de 38 px, fundo `bg` ou `raised`, borda `line-2`, raio de 10 px; foco com borda `text-2`. Erro em `danger` abaixo do campo. |
| **Diálogo** | `surface`, raio de 16 px, sombra escura, fundo da página escurecido; título de 15 px; ações à direita |
| **Estado vazio** | Texto em `text-2` e uma ação suave. Sem ilustração. |
