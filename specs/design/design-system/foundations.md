# Design system — fundamentos

> **Estado:** Aprovada (12/10/2026). Reescrito na Etapa 12 a partir dos **protótipos oficiais**: [landing](../../../prototypes/landing/index.html) e [CRM](../../../prototypes/crm/inicio.html). Substitui a versão anterior (v1, tema claro, Plex, raio 0).
> Direção da landing: [../landing-creative-direction.md](../landing-creative-direction.md) · Componentes: [components.md](components.md) · Padrões: [patterns.md](patterns.md)

**Regra de fonte única:** os valores abaixo são a fonte oficial. Na implementação, eles viram variáveis CSS e o tema do Tailwind de cada aplicação. Em caso de divergência com os protótipos, vale **este documento**.

---

## 1. Princípios

1. **Precisão de engenharia:** grade visível, índices numerados e alinhamento rigoroso.
2. **Profundidade por camadas e linhas, não por sombras.** A sombra é exceção: só em elementos táteis e flutuantes.
3. **Skeumorfismo só no que se toca ou representa um objeto:** botões, teclas, ficha técnica, janela da demonstração. Estrutura e texto ficam planos.
4. **Cor é sinal:** laranja = ação e estado ativo; vermelho = problema; o resto é neutro.
5. **Todo movimento mostra uma transformação**, é pausável e respeita "movimento reduzido".

## 2. Temas

| Aplicação | Tema | Requisito |
|---|---|---|
| Landing | Somente escuro | RNF-LP-06 |
| CRM | Somente escuro | RNF-CRM-08 |

Nenhuma aplicação alterna de tema. As duas usam a mesma família de cores, com ajustes próprios.

## 3. Cores

### 3.1 Landing

| Token | Valor | Uso |
|---|---|---|
| `bg` | `#111214` | Fundo da página |
| `surface` | `#17181B` | Faixa de sintomas, células em hover, painel "Zarco" da comparação |
| `surface-raised` | `#1C1D20` | Nós de diagrama, superfícies elevadas |
| `bench` | `#0B0C0D` | Seção "Do processo ao sistema" (mais funda que o fundo) |
| `bench-surface` / `bench-tile` | `#17181B` / `#202126` | Janela e peças da demonstração |
| `text` | `#EDEBE6` | Texto principal (15,7:1 sobre `bg`) |
| `text-2` | `#9A9CA3` | Texto secundário (6,8:1) |
| `text-3` | `#8A8D94` | Índices e legendas (5,6:1) |
| `line` / `line-2` | `rgba(237,235,230,.09)` / `.15` | Trilhos, divisórias, bordas de célula |
| `accent` | `#FF5A1F` | Botões, estado ativo, progresso, bloco do CTA final |
| `on-accent` | `#17181A` | Texto e ícones sobre laranja (5,7:1) |
| `danger` | `#F97066` | "Gargalo" e "problema" nos diagramas (6,7:1) |

### 3.2 CRM

| Token | Valor | Uso |
|---|---|---|
| `bg` | `#141517` | Fundo |
| `surface` | `#1B1C1F` | Cartões de projeto, colunas do quadro, navegação |
| `raised` | `#222327` | Cartões de tarefa, item ativo do menu, etiquetas |
| `hover` | `#2A2B30` | Hover e estado ativo de controles |
| `text` | `#E2E0DA` | Texto principal (levemente abaixo de `#EDEBE6`, para descansar a vista) |
| `text-2` | `#A3A5AB` | Texto secundário |
| `text-3` | `#7C7F86` | Dicas e textos de apoio, **só em tamanho ≥ 12 px e não essenciais** |
| `line` / `line-2` | `rgba(237,235,230,.07)` / `.12` | Bordas quase invisíveis |
| `accent` | `#FF5A1F` | **Só** o marcador do item ativo do menu |
| `danger` / `danger-bg` | `#F97066` / `rgba(249,112,102,.12)` | Bloqueado, atrasada, ação destrutiva |

### 3.3 Regras

- **Landing:** em qualquer tela visível, o laranja aparece só em ações (botões), no estado ativo da demonstração e no bloco do CTA final.
- **CRM:** um único laranja por tela (marcador do menu). Estados nunca usam laranja, amarelo ou verde.
- Estados não dependem só de cor (WCAG 1.4.1): sempre há rótulo e forma (components.md, Indicador de saúde).

## 4. Tipografia

| Papel | Landing | CRM |
|---|---|---|
| Títulos | **Inter Tight** 600 | Inter 600 |
| Corpo e interface | **Inter** 400/500/600 | Inter 400/500/600 |
| Índices e metadados | **Geist Mono** 500, **11 a 12,5 px**, maiúsculas, +0,12 em. Só números, rótulos de índice e legendas; nunca frases. | Não usa mono. Números com `font-variant-numeric: tabular-nums`. |

Fontes servidas pelo próprio domínio, em `woff2` com subconjunto latino (CA-LP-07N.3). Só a fonte de título da landing é pré-carregada.

### 4.1 Escala da landing

| Token | Tamanho | Entrelinha | Espaçamento |
|---|---|---|---|
| `display` (h1) | `clamp(44px, 7vw, 96px)`; ≤ 639 px: `clamp(40px, 11vw, 56px)`; ≤ 359 px: 36 px | 0,92 | −0,04 em |
| `h2` | `clamp(36px, 5vw, 64px)`; ≤ 639 px: `clamp(32px, 9vw, 42px)` | 0,95 | −0,035 em |
| `cta-display` (CTA final) | `clamp(52px, 10vw, 136px)`; ≤ 359 px: 44 px | 0,9 | −0,045 em |
| `h3` | 22 px | 1,15 | −0,02 em |
| `lead` | `clamp(18px, 1.5vw, 20px)` | 1,55 | 0 |
| `body` | 17 px (15,5 px em células) | 1,65 | 0 |
| `idx` | 11,5 px mono | 1,3 | +0,12 em |

Títulos usam `text-wrap: balance` e nunca cortam palavras.

### 4.2 Escala do CRM

| Token | Tamanho | Peso | Uso |
|---|---|---|---|
| `title` | 24 px, −0,02 em | 600 | Título da página |
| `heading` | 15 px | 600 | Título de seção ou coluna |
| `card-title` | 15 px, −0,01 em | 600 | Nome do projeto no cartão |
| `body` | 14 px, entrelinha 1,55 | 400/500 | Texto e campos |
| `small` | 13 px | 400/500 | Cliente, filtros, metadados |
| `micro` | 12 px | 500 | Etiquetas, contagens, datas |

## 5. Espaçamento e grid

Base de 4 px.

| Contexto | Landing | CRM |
|---|---|---|
| Margem lateral | 20 px · 24 px (≥ 640) · 32 px (≥ 960) | 28 px |
| Recuo interno dos trilhos | 20 · 32 · 48 px | — |
| Entre seções | 104 px; 152 px (≥ 960) | 28 px entre regiões |
| Interno de célula ou cartão | 22 px (≤ 639) · 28 · 32 px | 18 px (projeto) · 12/14 px (tarefa) |
| Espaço entre cartões | — | 12 px |

**Landing:** contêiner de 1200 px, com **trilhos verticais** de 1 px em toda a página e divisórias horizontais com marcas `+` nos cruzamentos. Conteúdo em **células** com bordas compartilhadas.
**CRM:** largura máxima de 1480 px; quadro em 3 colunas iguais; faixa de projetos em 5 colunas.

### Breakpoints

| Nome | Faixa | Principais mudanças (landing) |
|---|---|---|
| `xs` | < 360 | Títulos reduzidos, demonstração compacta |
| `sm` | < 640 | Uma coluna; botões em largura total; botão fixo inferior |
| `md` | 640–959 | Hero em uma coluna; demonstração com janela primeiro e abas horizontais |
| `lg` | ≥ 960 | Cabeçalho com botão; trilhos com 48 px de recuo; demonstração em 2 colunas |
| `xl` | ≥ 1040 | Hero com ficha técnica ao lado |

O CRM é só para computador (RNF-CRM-04), com referência de 1280 px e conteúdo mínimo de 1100 px.

## 6. Geometria

| Elemento | Landing | CRM |
|---|---|---|
| Células, faixas e seções | 0 (bordas compartilhadas) | — |
| Botões | 6 px | 10 px |
| Teclas e índices em relevo | 5–6 px | — |
| Ficha técnica e janela da demonstração | 12 px | — |
| Peças internas da demonstração | 6 px | — |
| Cartões e colunas | — | 16 px (projeto, coluna) · 12 px (tarefa) |
| Navegação e filtros | — | 12 px (contêiner) · 7–8 px (itens) |
| Etiquetas | 999 px (pílula) | 999 px (saúde) · 6 px (projeto na tarefa) |
| Menus e avisos flutuantes | — | 12 px |

## 7. Profundidade e materiais

### 7.1 Landing: superfícies planas + skeumorfismo funcional

Estrutura plana (células, faixas, texto). Material **apenas** em:

| Material | Onde | Receita |
|---|---|---|
| **Plástico macio laranja** | Botão principal | Degradê vertical `#FF7A47 → #FF5A1F → #EF4F18`; borda refletiva de 1 px (clara no alto, escura embaixo); brilho interno no topo; sombra curta. **Pressionado:** sombra interna, degradê invertido, desce 1 px. |
| **Metal escuro** | Botão sobre o laranja (CTA final) | Degradê `#2A2B30 → #17181A → #101113`, borda refletiva, brilho interno sutil |
| **Tecla** | Controles (pausar e rever), índices de "Como começar" e das perguntas | Degradê `#26272C → #1A1B1E`, borda refletiva, sombra de 1–2 px. Ativa ou pressionada: sombra interna. |
| **Painel em relevo** | Ficha técnica do hero, janela da demonstração | Degradê `#1D1E22 → #151619`, borda refletiva, brilho interno no topo, sombra longa e suave. Na janela, as "luzes" da barra são **escavadas**. |
| **Poço escavado** | Números da ficha técnica | Fundo `rgba(0,0,0,.3)` com sombra interna |

Regras: luz sempre de cima; um material por componente; sombras escuras tingidas, nunca preto puro; sem brilho laranja difuso.

**Fundo:** luz suave no topo (radial, 6%) e grão a 5%, em camada estática. A bancada da demonstração tem uma grade de pontos a 6%.

### 7.2 CRM: camadas

Profundidade por camadas `bg → surface → raised`, com bordas quase invisíveis. Sombra só no hover de cartões (`0 1px 2px rgba(0,0,0,.3), 0 8px 24px -8px rgba(0,0,0,.5)`) e em menus e avisos flutuantes. **Sem skeumorfismo no CRM.**

## 8. Foco

Contorno de 2 px na cor de `text`, com 2 a 3 px de afastamento, em todos os elementos interativos. Sobre o laranja, o contorno é `on-accent`. Nunca removido.

## 9. Movimento

| Token | Duração | Uso |
|---|---|---|
| `fast` | 150–200 ms | Hover, troca de estado |
| `base` | 250–400 ms | Troca de cena, menus, botão fixo |
| `reveal` | 600 ms, deslocamento de 16 px | Entrada de seção (uma vez) |
| `phase` | 6 s | Avanço automático da demonstração |
| `ticker` | 60 s por volta | Faixa de sintomas |

Curva padrão: `cubic-bezier(.2,.7,.2,1)`. Elementos com mais de 5 s de movimento automático têm controle de pausa (WCAG 2.2.2). Tudo para fora da tela. Com "movimento reduzido", nada se move sozinho.

## 10. Ícones

Ícones de traço (1,5 a 1,8 px) na cor do texto ao lado: 16 px no CRM, 18 a 20 px na landing. O ícone do WhatsApp é monocromático. O conjunto de ícones é escolhido na implementação, com preferência por SVG inline ou um pacote sem dependências.
