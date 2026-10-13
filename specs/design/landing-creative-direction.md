# Landing — auditoria da Rig e nova direção criativa

> **Estado:** **Aprovada** por Arthur (12/10/2026), com uma alteração: **o Z 3D sai da landing**. O hero passa a ser tipográfico, com uma ficha técnica das garantias à direita, e não há chão de grade em perspectiva. As respostas das perguntas são um rascunho baseado no briefing, a revisar por Arthur. > **Revisão (12/10/2026):** a landing passa para o **tema escuro** (RNF-LP-06), com skeumorfismo aplicado só a elementos táteis: botões, teclas de controle e índices, ficha técnica e janela da demonstração. A grade e as células continuam planas. A paleta da §4.1 se inverte: fundo `#111214`, superfícies `#17181B`/`#1C1D20`, texto `#EDEBE6`, a bancada da demonstração ainda mais funda (`#0B0C0D`) e o CTA final continua laranja. **Protótipo oficial:** [prototypes/landing/index.html](../../prototypes/landing/index.html), com a auditoria de responsividade aplicada (12/10/2026).
> **Última atualização:** 12/10/2026
> **Referência:** https://rig.ai/ · **Contexto de negócio:** [../product/overview.md](../product/overview.md), [../brand/briefing.md](../brand/briefing.md) (só posicionamento e paleta; nenhum material visual anterior foi consultado, conforme pedido)

## Limitação da análise (ler primeiro)

Este ambiente **não tem navegador**. A Rig foi analisada pelo **código-fonte**: o HTML, as duas folhas de CSS (cerca de 65 KB) e os scripts inline. Por isso:

- **Confirmado pelo código:** estrutura e ordem das seções, textos, escalas tipográficas (`clamp`), grid, bordas, cores (variáveis `oklch`), *keyframes*, *breakpoints*, tratamento de `prefers-reduced-motion`, lógica de *play/pause* e de visibilidade.
- **Inferido, não observado:** a sensação visual final, o tempo exato de cada animação na prática, como a página se comporta ao rolar em um aparelho real e a qualidade das ilustrações em SVG.
- **Não inspecionado:** três scripts empacotados externos (`/_astro/*.js`), que não estão no HTML.

Capturas de tela não foram feitas. As evidências citam seletores e valores do CSS.

---

## 1. Diagnóstico da Rig

A Rig é excepcional porque **cada decisão visual carrega informação**. A página quase não descreve o produto: ela o **demonstra**. A estética (terminal, grade, código) não é decoração, é a linguagem do próprio público (desenvolvedores e times de segurança).

### 1.1 Arquitetura da informação, seção por seção

| # | Seção (seletor) | Função na narrativa | Como contribui para a conversão |
|---|---|---|---|
| 1 | **Hero** (`.hero`): fundo de cor sólida em toda a largura, título com 3,5 a 7 rem e entrelinha de 0,88, subtítulo, um CTA e uma **faixa de notícias rolando** com incidentes reais de segurança envolvendo IA | Criar **urgência externa**: o problema é real e está nas manchetes | Prova social sem precisar de clientes. As notícias fazem o papel dos depoimentos. |
| 2 | **O problema** (`.problem-section`): título enorme e uma grade com bordas de 3 colunas × 2 linhas, com 4 problemas numerados (`001`–`004`, rótulos `Bottleneck`, `Exposure`…) e uma **coluna de diagrama animado** ocupando duas linhas | Dar **nome** à dor, em partes que se escaneiam | O visitante se reconhece em pelo menos um item |
| 3 | **Apresentação** (`#intro-rig`): metade texto e metade uma **demonstração do produto** (um IDE com código, um chat com o agente e o resultado), com *play/pause* em fases de cerca de 1,8 s | Mostrar o produto **funcionando no contexto do usuário** | Substitui a lista de funcionalidades pela experiência de usar |
| 4 | **A diferença** (`#runtime-evidence`): dois painéis lado a lado ("01 / Static analysis" × "02 / Rig runtime testing") e 3 pontos numerados | Posicionar contra a **alternativa que o visitante já conhece** | Responde "por que não continuar com o que eu tenho" |
| 5 | **Como funciona** (`#our-approach`): passos em acordeão à esquerda (2fr), com barra de progresso vertical de 6 s, e diagrama à direita (3fr) | Tornar o funcionamento **crível** | Reduz o "parece mágica" |
| 6 | **Benefícios** (`.offline-section.three-col`): 3 colunas curtas | Resumir o ganho | É a seção mais fraca, a mais próxima de um template |
| 7 | **Como começar** (`#setup-rig`): `01 / INSTALL`, `02 / CONNECT`, `03 / CHECK` e "funciona com o seu stack" | Mostrar que **começar é pequeno** | Remove a fricção da adoção |
| 8 | **FAQ** (`.faq-section`): `<details>` numerados, com respostas **francas sobre os limites** ("um scan limpo não significa que tudo é seguro") | Tratar objeções e ganhar confiança pela honestidade | A franqueza vira argumento de venda |
| 9 | **CTA final** (`.cta-section`): espaço vertical enorme (12 rem acima e 16 rem abaixo), logo com brilho e título de 4 a 7 rem | Um único momento de decisão, sem distração | O CTA é o mesmo do início ("Get/Book a Demo") |

**Arco narrativo:** urgência → dor nomeada → solução demonstrada → diferença contra a alternativa → como funciona → como começar → objeções → decisão. Cada seção responde à pergunta que a anterior deixou.

### 1.2 Direção de arte (evidências do CSS)

| Aspecto | Evidência |
|---|---|
| **Três famílias com papéis fixos** | Display (Chalet) só em títulos; mono (Chivo Mono) só em rótulos, numeração e metadados; sans (Instrument Sans) no corpo. Nenhuma família invade o papel da outra. |
| **Contraste extremo de escala** | Títulos de 2,2 a 7 rem; rótulos de **0,55 a 0,75 rem**, em maiúsculas, com espaçamento de 0,1 a 0,2 em. Quase não há tamanhos intermediários. |
| **Títulos comprimidos** | Entrelinha de 0,88 a 0,98 e espaçamento de −0,03 em. Os títulos viram blocos gráficos. |
| **Corpo arejado e recuado** | 1 rem com entrelinha de 1,6 a 1,75, na cor `--paper-dim` (75%), limitado a 440–620 px de largura |
| **Grade explícita** | Contêiner de 1200 px com bordas de 1 px (`--border`, papel a 18%) formando **células** (a grade de problemas, os passos, os itens do FAQ). Há uma **linha vertical central** atravessando a seção de demonstração (`.offline-section:before`). |
| **Profundidade sem sombra** | Grade em perspectiva como um "chão" (`.grid-bg:after`: `rotateX(55deg)`, células de 80 px), ruído granulado (`.noise`, 8%) e *scanlines*. Sombra só na janela de demonstração (`0 24px 70px`). |
| **Cor como sinal** | Azul = ação, ativo, confirmado; vermelho = risco ou vulnerabilidade; verde = corrigido; amarelo = secundário. O hero é o único bloco grande de cor. |
| **Geometria própria** | Botões com canto chanfrado (`clip-path`), que viram assinatura |
| **Numeração por toda parte** | `001`, `Step 01`, `01 / INSTALL`, FAQ `01`. Comunica rigor e facilita a leitura em diagonal. |

### 1.3 Motion e interatividade

| Tipo | Exemplos (keyframes e scripts) | Classificação |
|---|---|---|
| **Animação que explica** | `queue-build`, `rework`, `risk`, `finding` (o diagrama do problema), `map-route`, `discover`, `track-data`, `dot-flow` (como funciona), as fases da demonstração | **Funcional:** a animação é o argumento |
| **Animação que guia** | `howProgressFill` (6 s por passo), estado ativo do passo, entrada de mensagens (`scene-reveal`, 0,35 s) | **Funcional:** ritmo de leitura |
| **Controles** | Botão Play/Pause/Replay com `aria-label`; `aria-live` só quando o usuário troca o passo manualmente | **Acessibilidade bem resolvida** |
| **Economia** | `.hero:not(.is-visible)` pausa a faixa de notícias e a marca d'água fora da tela; `[data-playing=false]` pausa os indicadores | **Desempenho:** nada anima fora da tela |
| **Movimento reduzido** | 5 blocos `prefers-reduced-motion`; a demonstração começa no estado final (`s=1e4`) | **Respeitado** |
| **Personalidade** | Marca d'água com efeito *glitch*, botão com *glitch* no hover, um olho de vigilância que segue o mouse e pisca com distorção, logo com brilho | **Decorativo.** Reforça o tema "segurança/ameaça". |

### 1.4 Experiência do usuário

- **Navegação:** cabeçalho só com o logo e um CTA. Não há menu; a página é um único percurso.
- **CTA:** a mesma ação no hero e no fim, com o mesmo texto. Não há CTA secundário competindo.
- **Carga cognitiva:** alta densidade só onde o usuário já está engajado (demonstração e diagramas). As aberturas de seção são sempre título grande e uma frase.
- **Mobile (`max-width: 768px`):** grades viram uma coluna; no "como funciona", **o visual vem antes dos passos** (`order`); o título usa `clamp(3.5rem, 12vw, 7rem)`; botões em largura total; a linha central some.
- **Pontos fracos:** benefícios genéricos; *scanlines* e ruído fixos sobre a página (custam pintura de tela e podem cansar); efeitos *glitch* podem incomodar quem tem sensibilidade a movimento, mesmo pausáveis.

---

## 2. DNA de design da Rig

| # | Princípio | Onde aparece | Que problema resolve | Efeito no usuário | Tradução para a Zarco |
|---|---|---|---|---|---|
| D1 | **Demonstrar em vez de descrever** | A demonstração com IDE e chat; os diagramas animados | Ninguém acredita em adjetivos ("rápido", "seguro") | Entende o valor sem esforço e se imagina usando | A Zarco não tem produto: **demonstrar o trabalho**, com os artefatos reais do método (mapa do processo, escopo com "não incluído", sistema resultante) |
| D2 | **Prova externa quando não há prova própria** | A faixa de manchetes reais no hero | Uma empresa nova não tem depoimentos | "Isso é real e urgente" | A dor da Zarco é cotidiana e reconhecível. Os **sintomas da operação** fazem o papel das manchetes (ver §5, faixa). Nunca inventar números ou clientes. |
| D3 | **Funções tipográficas rígidas e contraste extremo de escala** | Display × mono × sans; 7 rem × 0,65 rem | A hierarquia ambígua cansa | Escaneia em segundos: título → rótulo → detalhe | Display para títulos, mono só para índices e metadados (pequenos e raros), sans no corpo |
| D4 | **A grade é visível e organiza o conteúdo em células** | Bordas de 1 px, a grade de problemas, a linha central | Muitas seções de cartões soltos parecem template | Sensação de precisão, de "coisa projetada" | Grade com trilhos e células: **a página parece uma planta de engenharia** |
| D5 | **Tudo é numerado e rotulado** | `001`, `Step 01`, `01 / INSTALL` | Listas longas viram texto corrido | Rigor e leitura em diagonal | Índices em todas as listas: problemas, passos, perguntas |
| D6 | **Cor é sinal, não decoração** | Azul = ação/ativo; vermelho = risco; verde = resolvido | Cor decorativa dilui a atenção | O olho vai direto ao que importa | **Laranja = ação e estado ativo**; grafite = estrutura; papel = respiro. Um vermelho discreto só para "gargalo". |
| D7 | **O movimento carrega significado e respeita o usuário** | Progresso dos passos, fases da demonstração, pausa fora da tela, *play/pause*, movimento reduzido | Animação gratuita distrai e pesa | Acompanha a explicação no ritmo certo | Toda animação mostra uma transformação (processo → sistema). Tudo pausável e econômico. |
| D8 | **Começar parece pequeno** | `01 / INSTALL · 02 / CONNECT · 03 / CHECK` | Medo de compromisso | "É fácil dar o primeiro passo" | **Como começar:** mensagem → conversa gratuita → proposta por escrito |
| D9 | **Franqueza como argumento** | FAQ que admite limites | Desconfiança de promessa exagerada | Confiança | Combina com a Zarco ("às vezes a resposta é uma ferramenta pronta") |
| D10 | **Um momento de decisão, com silêncio em volta** | CTA final com 28 rem de espaço vertical | Rodapé cheio dilui a ação | Decisão clara | CTA final em bloco de cor, isolado |
| D11 | **Uma geometria-assinatura** | Botão chanfrado | Botões genéricos | Memorabilidade | Derivar a assinatura da própria marca: o **módulo quadrado do Z** (ver §4.4) |

**Padrões de composição que se repetem:** (a) abertura de seção = rótulo mono pequeno + título comprimido + uma frase em cor recuada; (b) conteúdo em células delimitadas por linhas; (c) um elemento "vivo" (diagrama ou demonstração) por seção, nunca dois; (d) alternância de alinhamento (centralizado para afirmar, dividido em duas colunas para demonstrar).

---

## 3. Matriz de adaptação

**A diferença central:** a Rig vende um produto e mostra o produto funcionando. **A Zarco vende capacidade de entender e construir.** O que se demonstra é **o método aplicado a um caso ilustrativo**, sempre identificado como ilustração.

| Padrão da Rig | Decisão | Aplicação na Zarco | Motivo |
|---|---|---|---|
| Demonstração interativa do produto (D1) | **Adaptar** | **"Do processo ao sistema":** uma demonstração em fases que transforma uma operação bagunçada em sistema (mapa do processo com gargalo → decisão → escopo com "não incluído" → tela do sistema → evolução). Com *play/pause* e o selo "Ilustração do método". | É a peça central. Mostra a competência sem inventar cases. |
| Faixa de manchetes (D2) | **Adaptar** | Faixa de **sintomas reconhecíveis**, no formato de artefatos do dia a dia: `planilha_final_v7_AGORA_VAI.xlsx` · "quem atualizou isso?" · pedido redigitado no sistema · "me manda de novo no WhatsApp"… Sem números. | Prova pela identificação, não por estatística. Tom leve e humano. |
| Problemas numerados com diagrama (D4, D5) | **Preservar** | 4 sintomas `001`–`004` em células, mais uma coluna com o diagrama animado do **ciclo de retrabalho** (a informação circulando entre planilha, WhatsApp e sistema) | Já é a dor certa; ganha forma de engenharia |
| Painéis comparativos (seção 4) | **Adaptar** | **"Orçamento antes de entender" × "Diagnóstico antes do orçamento"**: dois painéis sem citar concorrentes, mais 3 pontos numerados (a solução mais simples; o código é seu; acompanhamento de perto) | É o posicionamento da Zarco em forma visual |
| Como funciona em passos com progresso | **Adaptar e fundir** | Fundido na demonstração. As fases **são** o método. Não há uma seção separada de passos. | A Zarco tinha removido a seção de método por excesso de seções. Fundir mantém a página curta. |
| Benefícios em 3 colunas | **Descartar** | — | É genérico e repete argumentos |
| Como começar em 3 passos (D8) | **Preservar** | `01 / MENSAGEM` → `02 / CONVERSA` (diagnóstico gratuito) → `03 / PROPOSTA` (escopo e valor por escrito), com o CTA ao lado | Reduz o medo de contatar; é a fricção real de quem contrata serviço |
| "Funciona com o seu stack" (logos) | **Descartar** | — | Aproxima de SaaS. Contraria "a tecnologia é consequência do problema". |
| FAQ franco (D9) | **Preservar** | 5 a 6 perguntas reais: preço, prazo, "minha empresa é pequena demais?", "e se eu não precisar de sistema?", "o código fica comigo?", manutenção | Trata objeções que hoje ficam sem resposta |
| CTA final isolado (D10) | **Preservar** | Bloco **laranja em toda a largura**, título enorme em grafite, botão grafite | É o único bloco grande de cor da página, então significa "aja aqui" |
| Hero de cor sólida | **Adaptar** | O hero fica em **papel**; a cor sólida vai para o CTA final. A demonstração fica em **grafite**, como uma bancada. | Mantém o tema claro aprovado e cria um ritmo papel → grafite → papel → laranja |
| Grade em perspectiva como chão | **Adaptar** | Um chão de grade em perspectiva sob o **Z 3D** do hero, como uma "planta" técnica | Dá contexto e profundidade ao Z, que Arthur aprovou |
| Botão chanfrado (D11) | **Adaptar** | Assinatura derivada do **módulo do Z**: botões retangulares com raio pequeno e um **quadrado marcador** no canto, que se move na interação | Autoral, nascido da marca da Zarco |
| *Scanlines*, ruído pesado, *glitch*, olho de vigilância | **Descartar** | — | É linguagem de ameaça e de hacker. Contraria clareza e profissionalismo, e pesa no desempenho. |
| Pausa fora da tela, *play/pause*, movimento reduzido (D7) | **Preservar** | Em todos os elementos animados | É qualidade técnica e acessibilidade (WCAG 2.2.2) |

---

## 4. Nova direção criativa: "Planta de engenharia"

**Ideia central:** a página da Zarco deve parecer o **documento de projeto de uma boa engenharia**: precisa, numerada e organizada em uma grade visível, e ao mesmo tempo viva, porque mostra a transformação de um processo em sistema. A Rig parece uma ferramenta de segurança; a Zarco deve parecer **uma bancada de projeto**.

### 4.1 Paleta e proporções

| Papel | Cor | Uso |
|---|---|---|
| Papel (fundo principal) | `#F4F3EF` | Hero, problemas, diferença, como começar, FAQ |
| Grafite (bancada) | `#17181A` / superfície `#1F2023` | Seção de demonstração; o texto principal no papel |
| Laranja-sinal | `#FF5A1F` | **Ação e estado ativo:** botões, passo ativo da demonstração, progresso, o bloco do CTA final |
| Tons de apoio | linhas `#D6D3CB` no papel; `rgba(237,235,230,.12)` no grafite; texto secundário `#5F6168` e `#9A9CA3` | Estrutura |
| Vermelho discreto | `#B42318` / `#F97066` | Só para "gargalo" e "problema" nos diagramas |

Proporção-alvo: papel ~70%, grafite ~22%, laranja ~5% (mais o bloco final), outros ~3%. A mudança importante em relação ao passado: **o laranja ganha permissão para preencher uma vez**, no CTA final, porque ali ele *significa* decisão.

### 4.2 Tipografia

| Papel | Família (proposta) | Tamanho | Regras |
|---|---|---|---|
| Display (títulos) | **Inter Tight** 600 | Hero `clamp(48px, 8vw, 112px)`; seções `clamp(36px, 5vw, 64px)`; CTA final `clamp(56px, 9vw, 128px)` | Entrelinha de 0,92, espaçamento −0,035 em. Só em títulos. |
| Corpo | **Inter** 400/500 | 17 a 18 px | Entrelinha de 1,65, largura de 60 a 64 caracteres, cor secundária |
| Índices e metadados | **Geist Mono** 500 | **11 a 12 px**, maiúsculas, +0,12 em | **Só** em números (`001`, `01 / ...`), rótulos de diagrama e legendas. Nunca em frases. |

> Arthur rejeitou antes a combinação com mono. A diferença aqui é o **uso**: o mono aparece só em índices de 11 a 12 px, como na Rig, e nunca em blocos de texto. A decisão deve ser validada no protótipo, com a alternativa de manter tudo em Inter.

Escala: quase sem tamanhos intermediários. Ou é título, ou é corpo, ou é índice (D3).

### 4.3 Grid e composição

- Contêiner de 1200 px, com **trilhos verticais** de 1 px em toda a página e marcas de registro `+` nos cruzamentos com as divisórias de seção.
- 12 colunas; as seções se compõem em **células** com bordas compartilhadas, em vez de cartões soltos.
- **Abertura de seção padronizada:** índice mono (`01 / O PROBLEMA`) → título display → uma frase. Alinhamento à esquerda para "explicar"; centralizado só no CTA final e nas perguntas.
- Um único elemento "vivo" por seção.

### 4.4 Componentes

| Componente | Desenho |
|---|---|
| **Botão principal** | Laranja, texto grafite, raio de 6 px, 52 px de altura. **Assinatura:** um quadrado de 6 px em grafite no canto superior direito, eco do módulo do Z. No hover, o quadrado desliza até a seta. Sem brilho, sem degradê. |
| **Célula** | Borda de 1 px, sem raio nas bordas compartilhadas, fundo papel. No hover, o fundo clareia e o índice vira laranja. |
| **Janela de demonstração** | Moldura grafite com raio de 10 px e barra superior com título do artefato (`diagnostico.md`, `escopo.pdf`, `sistema / pedidos`). É a única superfície com sombra (longa, suave e tingida). |
| **Passo da demonstração** | Lista à esquerda com índice mono, título e uma barra de progresso **laranja** de 2 px no passo ativo |
| **Item de pergunta** | `<details>` com índice, pergunta em display de 20 a 24 px e um "+" que gira para "×" |
| **Faixa de sintomas** | Linha fina com texto mono de 12 px rolando devagar; pausa no hover e no foco e tem botão de pausa |

### 4.5 Superfícies e fundos

- Papel com grão quase imperceptível (2 a 3%), em uma camada estática, nunca animada.
- **Chão de grade em perspectiva** só no hero, sob o Z 3D, desvanecendo nas bordas.
- Seção grafite com uma grade sutil de pontos (4%) que dá textura de bancada.
- Sem *scanlines*, sem *glitch*, sem degradê decorativo.

---

## 5. Arquitetura da landing page

Narrativa: **reconhecer → entender → ver funcionando → comparar → saber como começar → tirar dúvidas → agir.**

### 0. Cabeçalho

| Item | Definição |
|---|---|
| Objetivo | Identidade e acesso permanente à ação |
| Composição | Barra fixa, papel a 90% com desfoque leve e linha inferior de 1 px. Wordmark à esquerda e botão principal compacto à direita. Sem menu. |
| Mobile | Só o wordmark; a ação vai para o botão fixo inferior |

### 1. Hero: "Sistemas feitos para o processo da sua empresa."

| Item | Definição |
|---|---|
| Objetivo | Em 5 segundos: o que é, para quem, quanto custa começar |
| Mensagem | Título + uma frase (tirar o processo da planilha, na medida do problema) + linha de apoio "Diagnóstico gratuito. Orçamento depois de entender o problema." |
| Composição | 7 colunas de texto à esquerda; 5 colunas com o **Z 3D sobre o chão de grade em perspectiva**. Na base do hero, a **faixa de sintomas** em toda a largura. |
| Hierarquia | Título → botão → linha de apoio → Z → faixa |
| Interação | O Z se monta (extrusão) e inclina levemente com o mouse no computador; a faixa rola a 30 px/s |
| Mobile | O título vem primeiro, com `clamp(40px, 11vw, 56px)`; botão em largura total; o Z fica menor, abaixo; a faixa permanece |
| CTA | Sim (principal) |
| Princípios | D2, D3, D6, D11 |

### 2. `01 / O PROBLEMA`: "Quando a operação já passou da planilha."

| Item | Definição |
|---|---|
| Objetivo | O visitante se reconhece |
| Conteúdo | 4 sintomas `001`–`004` (planilha; informação espalhada; sistemas que não conversam; tarefa repetida) |
| Composição | Grade 3 × 2 com bordas compartilhadas: 4 células de sintoma e **uma coluna de diagrama** ocupando duas linhas, como na grade de problemas da Rig |
| Demonstração | **Ciclo de retrabalho:** um ponto (o "pedido") circula entre os nós Planilha → WhatsApp → Sistema → Planilha. A cada volta, um contador "redigitado ×n" incrementa. É um SVG com CSS. |
| Interação | Toca só quando está visível. Passar o mouse sobre um sintoma destaca o trecho correspondente do diagrama. |
| Mobile | Diagrama primeiro, com 220 px de altura; sintomas empilhados abaixo |
| CTA | Não |
| Princípios | D4, D5, D7 |

### 3. `02 / DO PROCESSO AO SISTEMA` (seção grafite, peça central)

| Item | Definição |
|---|---|
| Objetivo | **Demonstrar a competência:** como a Zarco transforma um processo real em sistema |
| Mensagem | "Primeiro o problema. Depois o código." |
| Composição | Fundo grafite em toda a largura. Lista de 4 fases à esquerda (2fr) e janela de demonstração à direita (3fr). |
| Fases | **01 Diagnóstico**: mapa do processo atual com o gargalo pulsando em vermelho. **02 Decisão**: opções (ferramenta pronta, mudança de processo, sistema sob medida), com a recomendação marcada e justificada em uma linha. **03 Escopo**: documento com itens "incluído" e "não incluído" (este tracejado). **04 Sistema**: tela simples de um sistema de pedidos se montando (lista, status, filtros) e, no fim, o selo "em produção · documentado · código no seu nome". |
| Interação | Avanço automático de 6 s por fase com barra laranja de progresso; *play/pause/replay*; clique ou setas trocam de fase; pausa fora da tela e no hover. A janela anima só a mudança da fase (até 400 ms). |
| Honestidade | Selo fixo no canto: **"Ilustração do método. Não representa um cliente."** |
| Mobile | A janela vem primeiro (altura fixa, sem saltos de layout); as fases viram abas horizontais roláveis abaixo |
| CTA | Não (a próxima seção conduz) |
| Princípios | D1, D6, D7 |

### 4. `03 / A DIFERENÇA`: "Entender antes de orçar."

| Item | Definição |
|---|---|
| Objetivo | Posicionar a Zarco contra o caminho que o visitante já conhece |
| Composição | Dois painéis lado a lado, divididos por uma linha central: **"Orçamento antes de entender"** (o escopo vago, a surpresa no meio do projeto e o código preso ao fornecedor, em cinza, com marcadores tracejados) × **"Diagnóstico antes do orçamento"** (em grafite, com marcadores sólidos e um traço laranja). Abaixo, 3 pontos numerados: a solução mais simples que resolve; acompanhamento de perto por quem fez o diagnóstico; código, infraestrutura e documentação no nome da empresa. |
| Interação | Ao entrar na tela, os itens do segundo painel "se resolvem" (o tracejado vira sólido) em sequência |
| Mobile | Painéis empilhados; a ordem mantém a comparação (primeiro o "antes de entender") |
| CTA | Não |
| Princípios | D4, D6, D9 |

### 5. `04 / COMO COMEÇAR`: "Começar é uma conversa."

| Item | Definição |
|---|---|
| Objetivo | Tirar o medo do primeiro contato. **É a seção de maior impacto na conversão.** |
| Conteúdo | `01 / MENSAGEM` (conte o caso pelo WhatsApp) → `02 / CONVERSA` (diagnóstico gratuito, sem compromisso) → `03 / PROPOSTA` (escopo e valor por escrito, só se fizer sentido) |
| Composição | 3 células em linha, ligadas por uma linha que se desenha; à direita (ou abaixo), o botão principal e o número |
| Mobile | Células empilhadas, com a linha vertical; botão em largura total |
| CTA | Sim |
| Princípios | D8, D10 |

### 6. `05 / PERGUNTAS`

| Item | Definição |
|---|---|
| Objetivo | Responder às objeções com franqueza |
| Conteúdo (proposta, **respostas dependem de Arthur**) | Quanto custa? · Quanto tempo leva? · Minha empresa é pequena, faz sentido? · E se eu não precisar de um sistema? · O código fica comigo? · Vocês fazem manutenção depois? |
| Composição | Lista de `<details>` com bordas de 1 px, índice mono e "+" |
| Interação | Abre e fecha com animação de altura (`grid-template-rows`); funciona sem JavaScript |
| Mobile | Igual, com área de toque de pelo menos 56 px |
| Princípios | D5, D9 |

### 7. CTA final: "Conte o seu caso."

| Item | Definição |
|---|---|
| Objetivo | A decisão |
| Composição | **Bloco laranja em toda a largura**, com 160 a 220 px de espaço vertical, título display enorme em grafite, uma frase, botão **grafite** com texto papel e o número em mono. O Z em contorno, gigante e cortado, a 6% de opacidade. |
| Interação | O botão tem a assinatura do módulo; mais nada se mexe (silêncio, D10) |
| Mobile | Título `clamp(48px, 13vw, 72px)`, botão em largura total |
| CTA | Sim |

### 8. Rodapé

Lockup, região de atendimento, WhatsApp e direitos. Fundo papel, linha superior de 1 px.

### Impacto nos requisitos aprovados (precisa da decisão de Arthur)

| Mudança | Requisito afetado |
|---|---|
| A demonstração traz de volta o método | RF-LP-04 (removido), voltaria em outra forma |
| Seção "A diferença" | Evolução de RF-LP-05 |
| "Como começar" | Novo requisito |
| Perguntas | Novo requisito. A UX L8 recomendava não incluir; recomendação revista com base na Rig (D9). |
| Faixa de sintomas | Novo requisito |
| Bloco laranja e mono pequeno | Revisão das decisões visuais da Etapa 07 |

---

## 6. Direção de motion

**Regra:** cada animação mostra **uma transformação** (bagunça → ordem; problema → resolvido; passo → passo). Se não mostra, não existe.

| Momento | Comportamento | Duração e curva |
|---|---|---|
| Carregamento | Título e botão aparecem em 2 tempos; o Z se monta; a faixa começa a rolar | 600 a 900 ms, `cubic-bezier(.2,.7,.2,1)` |
| Rolagem | Cada seção revela o título e depois o elemento vivo, uma única vez | 500 a 700 ms, deslocamento de 16 px |
| Diagramas | Tocam só visíveis (`IntersectionObserver`); param fora da tela | Ciclos de 4 a 8 s |
| Demonstração | 6 s por fase, barra laranja, *play/pause/replay*, hover pausa, setas trocam | Troca de cena até 400 ms |
| Hover | Células clareiam e o índice fica laranja; o quadrado do botão desliza | 150 a 200 ms |
| Movimento reduzido | Nada rola sozinho; a demonstração mostra a fase final com as abas manuais; a faixa vira texto estático; o Z fica parado | — |
| Mobile | Sem inclinação por mouse; diagramas mais simples; mesma demonstração com abas | — |

**Acessibilidade de movimento:** tudo o que se move sozinho por mais de 5 s tem controle de pausa (WCAG 2.2.2): a faixa e a demonstração. Os diagramas param fora da tela e respeitam o movimento reduzido.

---

## 7. Viabilidade técnica

| Aspecto | Decisão |
|---|---|
| Stack | Astro estático (aprovado). Cada elemento interativo é um `<script>` local do componente, em **JavaScript puro, sem framework de UI e sem biblioteca de animação**. |
| Orçamento de JS | Até **15 KB** comprimidos para a página inteira (Z, faixa, demonstração, diagramas, revelação) |
| Fontes | Inter, Inter Tight e Geist Mono em subconjunto latino, `woff2`, servidas pelo domínio; só a display em `preload`. Até 120 KB no total. |
| LCP | O título do hero em texto HTML; nada bloqueia a primeira pintura. Meta ≤ 2,0 s em 4G. |
| CLS | Altura reservada para a demonstração e os diagramas; fontes com `size-adjust` ou métrica equivalente. Meta < 0,05. |
| INP | Interações leves; nenhum trabalho pesado no evento de rolagem (só `IntersectionObserver`). |
| Animações | Só `transform` e `opacity`; o SVG anima `stroke-dashoffset`. Nada de animar `filter` ou propriedades de layout. |
| Aparelhos fracos | Z 3D com menos camadas em telas pequenas; diagramas pausados fora da tela; grão estático em imagem pequena, repetida |
| Progressive enhancement | Sem JavaScript: todo o texto, os passos da demonstração (em lista estática com as 4 fases), as perguntas (`<details>`) e os botões funcionam |
| Acessibilidade | Demonstração com descrição textual de cada fase; abas acessíveis por teclado (Radix não se aplica ao Astro; padrão ARIA de abas); `aria-live` só em troca manual; contraste AA em todas as combinações, inclusive grafite sobre laranja (5,7:1) |

---

## 8. Plano de implementação

Primeiro um **protótipo (v8)** para aprovação visual; depois, a implementação em Astro (incremento L1).

| Ordem | Entrega | Impacto | Complexidade |
|---|---|---|---|
| 1 | Fundamentos: tipografia em 3 papéis, grid com trilhos e células, abertura de seção padronizada, botão-assinatura | Alto (toda a página) | Baixa |
| 2 | Hero com Z 3D sobre o chão de grade e a faixa de sintomas | Alto (primeira impressão) | Média |
| 3 | Como começar e CTA final laranja | **Alto (conversão)** | Baixa |
| 4 | O problema com o diagrama do ciclo de retrabalho | Médio | Média |
| 5 | A diferença | Médio | Baixa |
| 6 | **Demonstração "Do processo ao sistema"** | Alto (diferenciação) | **Alta** |
| 7 | Perguntas (depois das respostas de Arthur) | Médio (objeções) | Baixa |
| 8 | Revisão de motion, acessibilidade e desempenho (Lighthouse, teclado, movimento reduzido, 320 px) | Alto (qualidade) | Média |

A ordem faz o protótipo ser avaliável cedo: depois do passo 3, a página já tem começo, meio e fim.
