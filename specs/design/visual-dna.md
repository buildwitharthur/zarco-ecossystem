# DNA visual

> ⚠️ **Documento histórico.** Descreve a direção da v1, que Arthur rejeitou na Etapa 07. **Não usar como referência de implementação.** Fontes vigentes: [landing-creative-direction.md](landing-creative-direction.md) e [design-system/](design-system/foundations.md).

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Auditoria de marca: [brand-audit.md](brand-audit.md) · Referências: [assets/references/](../../assets/references/) · Brand System: [assets/README.md](../../assets/README.md)

Legenda: **[C]** oficial ou aprovado · **[H]** proposta, aguardando aprovação

O documento separa três coisas: **(1)** a identidade da marca, que é fixa; **(2)** os princípios extraídos das referências, que são inspiração; **(3)** a direção visual proposta para cada aplicação, que é a síntese. As referências **não** são copiadas.

---

## 1. Identidade da marca (fixa)

Resumo do que foi aprovado na [auditoria](brand-audit.md). Nada aqui é reaberto.

- Fundo chapado, sem gradiente, sombra decorativa, brilho ou textura.
- Paleta do briefing §5. Um único acento laranja por tela. Na landing, o acento é o botão de contato; no CRM, o marcador do item ativo do menu.
- IBM Plex Sans para títulos, corpo e interface. IBM Plex Mono para rótulos, metadata, números e dados.
- Geometria reta. Raio 0 por padrão, 2 px em controles, 4 px em elementos flutuantes, 8 px só em molduras de captura de tela.
- Traço fino de 1 px. Linha tracejada só para o que é futuro, opcional ou fora do escopo.
- Elementos gráficos próprios: Z Percurso, grid, registro, cotas, fluxo, coordenadas. No máximo três tipos por peça.
- Proibições: estética de blueprint, engenharia civil, terminal hacker, cyberpunk, gradiente de SaaS, consultoria antiga ou agência criativa.

## 2. Referências analisadas

Arquivos em [assets/references/](../../assets/references/). O que atraiu Arthur nelas: **"visuais modernos, mas ainda assim limpos"**.

### L1 — Comunidade de avatares (landing escura)

| Observação | Classificação |
|---|---|
| Título grande, centralizado, com contraste forte com o resto da tela | Princípio: **hierarquia por escala tipográfica** |
| Rótulo curto acima do título ("Early Access — Build Your Identity") | Princípio: **rótulo de contexto acima do título**, que já existe na marca como `NN / ROTULO` |
| Uma ação de contato de alto contraste no cabeçalho (botão claro sobre fundo escuro); o resto da navegação é discreto | Princípio: **uma ação dominante, o resto recua** |
| Muito espaço vazio em volta do título | Princípio: **respiro ao redor da mensagem principal** |
| Ilustrações 3D coloridas, cartões inclinados, brilhos | Específico; **conflita com a marca** (cor fora da paleta, decoração sem função) |
| Navegação em pílula, botões arredondados | Específico; **conflita com a regra de raio** |

### L2 — Editor de código (landing escura, longa)

| Observação | Classificação |
|---|---|
| Títulos enormes e curtos ("Code. Editor. Deploy.") | Princípio: **título curto, grande e afirmativo** |
| Rótulos pequenos em maiúsculas acima das seções | Princípio: **rótulos de seção em maiúsculas pequenas**, alinhado a `NN / ROTULO` |
| O produto aparece como prova: capturas de tela reais | Princípio: **mostrar o trabalho em vez de adjetivos**. Na Zarco, ainda não há produto ou case para mostrar; ver D-L5 |
| Alternância texto + imagem, criando ritmo entre as seções | Princípio: **ritmo por alternância** |
| Texto em gradiente, blocos de cor saturada (azul, verde) | Específico; **conflita com a marca** |
| Faixa de logos de clientes, depoimentos, fotos de desenvolvedores | Específico; **proibido por RN-LP-01** |
| Página muito longa, com muitas seções | Específico; **contrário à UX L5** (limite de conteúdo) |

### L3 — Organização de apoio (mobile first, clara)

| Observação | Classificação |
|---|---|
| Fundo neutro quente, próximo do papel da Zarco | Princípio: **neutro quente em vez de branco puro**, já presente na marca |
| Título muito grande e pesado, ocupando a largura | Princípio: **título como elemento visual principal** |
| Cartões com ícone pequeno, título, descrição curta e uma ação no canto | Princípio: **cartão com uma única ideia e uma estrutura fixa** |
| Divisórias finas e bordas leves, sem sombra pesada | Princípio: **separação por linha, não por sombra**, já presente na marca |
| Projeto pensado primeiro para o celular | Princípio: **mobile first**, já aprovado (UX §1.1) |
| Raios grandes, botões em pílula, CTA verde, fotos de pessoas | Específico; **conflita com a marca** |

### C1 — Dashboard de operações (CRM)

| Observação | Classificação |
|---|---|
| Navegação horizontal no topo, com poucas seções em texto e o item ativo marcado | Princípio: **navegação horizontal enxuta** |
| Painéis em uma única superfície, separados por linhas de 1 px, sem sombra | Princípio: **estrutura por linhas**, totalmente alinhado à marca |
| Rótulos de métricas em maiúsculas pequenas ("FLEET UTILIZATION") sobre números grandes | Princípio: **rótulo pequeno + valor grande**, que equivale a Plex Mono + Plex Sans |
| Filtros segmentados ("All · Unpaid · Recent request · Paid") | Princípio: **filtros visíveis, a um clique** |
| Tabela leve: linhas finas, muito alinhamento, ações por menu "⋮" em cada linha | Princípio: **densidade com ordem**: muita informação sem ruído |
| Cor usada quase só em dados; a interface em si é neutra | Princípio: **interface neutra, cor só com significado** |
| Tema claro | Específico; **o CRM é escuro** (RNF-CRM-08). O princípio é aplicado no tema escuro. |
| Gráficos, faturas e métricas financeiras | Específico; **fora do escopo** do CRM |
| Cantos levemente arredondados nos painéis | Específico; a marca usa raio 0 em superfícies |

## 3. Princípios extraídos

O que torna as referências "modernas, mas limpas", traduzido em princípios independentes delas.

| # | Princípio | Origem |
|---|---|---|
| D1 | **A tipografia é o principal elemento visual.** Títulos grandes, curtos, com entrelinha justa. A modernidade vem da escala e do contraste, não de decoração. | L1, L2, L3 |
| D2 | **Uma ação dominante por tela.** Todo o resto recua em contraste. | L1, L3 |
| D3 | **Rótulo pequeno sobre conteúdo grande** (seções, métricas, metadata). | L1, L2, C1, e marca (`NN / ROTULO`) |
| D4 | **Estrutura por linhas finas**, não por sombras nem por blocos de cor. | L3, C1, e marca |
| D5 | **Espaço vazio generoso na landing; densidade ordenada no CRM.** | L1, L3 / C1 |
| D6 | **Cor só quando significa algo.** A interface é neutra. | C1, e marca |
| D7 | **Cartões com uma única ideia e estrutura fixa.** | L3, C1 |
| D8 | **Mostrar o processo em vez de adjetivos.** | L2 (adaptado: a Zarco mostra o método, não um produto) |

## 4. Tensões entre referências e marca

| # | Tensão | Recomendação |
|---|---|---|
| T1 | As referências usam **cantos arredondados e pílulas**. A marca usa cantos retos. | **Manter a geometria reta da marca.** O "moderno" das referências vem de D1 a D6, e todos eles funcionam com cantos retos. Arredondar também aproximaria a Zarco do visual genérico de SaaS que o Brand System proíbe. **[C]** |
| T2 | **Duas das três referências de landing são escuras.** A landing aprovada é só clara (RNF-LP-06). | **Manter a landing clara.** O papel quente é o principal traço da marca nas peças existentes e diferencia a Zarco das landings escuras de software. Se Arthur quiser reabrir RNF-LP-06, é uma decisão explícita (pergunta 1). **[C]** |
| T3 | As referências usam **ilustração, 3D, fotos, gradientes e cores saturadas** como fonte de interesse visual. | **Substituir pelos elementos gráficos da marca** (Z Percurso, grid, fluxo, cotas). Eles dão interesse visual com significado. **[C]** |
| T4 | L2 usa **capturas do produto** como prova. A Zarco não tem produto nem case para mostrar, e uma tela inventada sugeriria um trabalho que não existe (RN-LP-01). | **Não usar telas fictícias de sistemas.** A prova visual é o **método**, desenhado com os gráficos de fluxo da marca. **[C]** |

## 5. Direção visual proposta

### 5.1 Landing — "papel técnico" **[C]**

| # | Decisão | Princípios |
|---|---|---|
| D-L1 | Fundo papel com as **colunas do grid visíveis** em linhas de 1 px, como nas peças sociais. | D4, marca |
| D-L2 | **Abertura alinhada à esquerda:** rótulo `01 / ENGENHARIA DE SOFTWARE` → título muito grande em Plex Sans (escala bem acima do corpo, entrelinha justa, espaçamento levemente negativo) → subtítulo curto → botão laranja → linha de apoio em `muted-foreground`. | D1, D2, D3 |
| D-L3 | À direita da abertura, o **Z Percurso em contorno**, grande e cortado pela borda, **sem o módulo laranja** (o acento é o botão). No celular, o Z vai para o fundo, atrás do texto, com baixa presença, ou sai da tela. | T3, decisão A1 |
| D-L4 | Seções com o rótulo `NN / ROTULO` e muito espaço vertical entre elas. | D3, D5 |
| D-L5 | **"Como funciona"** desenhado com os gráficos de fluxo da marca: 5 nós ligados por setas. É o equivalente das capturas de produto da L2. | D8, T4 |
| D-L6 | **Problemas e diferenciais** em cartões retos, dispostos como células de um grid que compartilham as bordas de 1 px. Cada cartão tem rótulo numerado em Plex Mono, título curto e uma frase. | D4, D7 |
| D-L7 | **Botão de contato:** laranja, texto grafite, raio 2 px, ícone do WhatsApp monocromático. É o único elemento laranja na tela. | D2, decisões A1 e P4 |
| D-L8 | Cabeçalho mínimo: wordmark à esquerda, botão à direita (no computador). Rodapé com o lockup vertical. | D2, P6 |
| D-L9 | Movimento discreto e funcional: entrada suave do conteúdo e do botão fixo. Nada de paralaxe ou animação decorativa. Tudo respeita "movimento reduzido". | D1, TELA-LP-01 B6 |

### 5.2 CRM — "painel escuro estruturado" **[C]**

| # | Decisão | Princípios |
|---|---|---|
| D-C1 | **Tema escuro em camadas:** `background` para o fundo, `surface` para painéis e colunas do quadro, `muted` para elementos destacados, `border` para todas as divisões. Sem sombras, exceto uma sombra sutil em sobreposições flutuantes, para separá-las do fundo. | D4, D6 |
| D-C2 | **Navegação horizontal no topo:** wordmark à esquerda, os quatro itens (Início · Projetos · Clientes · Modelos) e "Sair" à direita. O item ativo é marcado por um pequeno módulo quadrado laranja, o único acento da tela (P7). | C1, D2 |
| D-C3 | **Painéis separados por linhas**, como em C1. Ex.: no Início, a faixa de projetos e o quadro geral são duas regiões divididas por 1 px, sem cartões flutuando. | D4 |
| D-C4 | **Rótulo + valor:** metadata em Plex Mono maiúsculo pequeno (`FASE`, `PREVISÃO`, `CLIENTE`) e o valor em Plex Sans. Datas e números com algarismos tabulares. | D3 |
| D-C5 | **Densidade ordenada:** corpo de texto menor que o da landing, espaçamentos compactos e regulares, alinhamento rigoroso. | D5 |
| D-C6 | **Filtros segmentados** e visíveis (situação dos projetos, projeto no quadro geral, categoria nos modelos). | C1 |
| D-C7 | **Estados por forma e rótulo** (P2): Bloqueado e atrasada em `destructive`; Atenção em `foreground` com marcador próprio; No prazo em `muted-foreground`. | D6 |
| D-C8 | **Cartões de tarefa:** superfície com borda de 1 px, título em Plex Sans e uma linha de metadata em Plex Mono (projeto, prazo). Raio 0. Durante o arraste, o cartão ganha borda `border-strong`. | D7, D4 |
| D-C9 | **Ações secundárias em menu "⋮"** por item (modelos, tarefas, linhas de lista). Só a ação principal de cada tela fica visível como botão. | C1, D2 |

## 6. Como validar

A aprovação deste documento autoriza a **Etapa 07**: tokens, componentes e um protótipo HTML/CSS das telas representativas. O DNA só é validado de verdade quando você vê o protótipo. Se o protótipo não parecer "moderno, mas limpo", a revisão começa por este documento.
