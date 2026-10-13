# Zarco Brand Assets

> ⚠️ **Atualização de 12/10/2026:** a marca está em revisão completa (decisão de Arthur). As **regras de aplicação em interfaces** deste documento (tipografia IBM Plex, raio 0, "um acento por peça", sem sombras) foram substituídas pelo design system em `specs/design/design-system/`. Os **arquivos** desta pasta continuam oficiais. As peças de social, documentos e apresentação serão atualizadas depois.

Pacote inicial de marca, gráficos, canais digitais e documentos da Zarco. Tudo deriva do **Zarco Brand System** (identidade visual v1). Nada aqui redesenha a marca: os paths do wordmark, do monograma, do lockup e das assinaturas foram extraídos do próprio Brand System.

```
assets/
├── brand/          logos, monograma, lockups, endorsement, favicons
├── graphics/       Z Percurso, grid, registro, cotas, fluxo, coordenadas, fundos
├── social/         LinkedIn, GitHub, Open Graph, templates de post
├── documents/      9 documentos .docx editáveis, em A4
├── presentation/   apresentação institucional .pptx editável
├── email/          assinatura de e-mail em HTML
└── README.md
```

---

## Logos

Pasta `brand/wordmark/`. Viewbox `0 0 192 41`. A altura das maiúsculas (40) é a unidade X das regras.

| Arquivo | Quando usar |
|---|---|
| `zarco-wordmark-dark.svg` | Grafite #17181A. Fundos claros: papel, branco, documentos. |
| `zarco-wordmark-light.svg` | Claro #EDEBE6 (foreground do tema escuro). Fundos escuros, grafite. |
| `zarco-wordmark-black.svg` | Preto puro. Impressão em uma cor, carimbo, gravação. |
| `zarco-wordmark-white.svg` | Branco puro. Vazado sobre preto ou imagem escura. |
| `zarco-wordmark-currentcolor.svg` | Herda a cor do elemento pai. Use inline em aplicações web. |

Regras: 1X de área livre em volta. Largura mínima de 64 px na tela e 18 mm no impresso. Abaixo de 80 px, prefira o monograma.

### Lockups

Pasta `brand/lockup/`. Cinco cores cada: dark, light, black, white, currentcolor.

- **Vertical** (`zarco-lockup-vertical-*.svg`). É o lockup oficial do Brand System: descriptor a 0,5X abaixo do wordmark, corpo de 0,45X, com a mesma largura do wordmark. Mínimo de 96 px na tela e 30 mm no impresso.
- **Horizontal** (`zarco-lockup-horizontal-*.svg`). **Derivado, pendente de aprovação.** O Brand System define só o lockup vertical. Esta versão usa as mesmas medidas (descriptor com corpo 0,45X, na linha de base do wordmark, a 1X de distância) para espaços baixos e largos, como cabeçalhos. Se não for aprovada, apague a versão e use a vertical.

O descriptor só aparece em contextos institucionais: propostas, contratos, rodapé do site, capa do LinkedIn.

---

## Monograma

Pasta `brand/monogram/`. **Z Percurso**, grid 5×5, barra superior recuada em 1 módulo.

| Arquivo | Uso |
|---|---|
| `zarco-monogram-dark.svg`, `-light`, `-black`, `-white` | Versões de uma cor. |
| `zarco-monogram-accent.svg` | Corpo grafite e o último módulo em laranja. O acento é um `rect` separado. |
| `zarco-monogram-accent-light.svg` | Mesmo acento, com corpo papel, para fundos escuros. |
| `zarco-monogram-currentcolor.svg` | Uma cor, herda currentColor. |

Use o monograma quando o wordmark ficaria abaixo de 80 px: avatares, favicon, ícone de app, selo. Mínimo de 16 px na tela e 5 mm no impresso. O acento laranja é opcional e nunca aparece no selo Built by Zarco.

### Favicon

Pasta `brand/favicon/`. Os tamanhos pequenos usam os **masters de pixel** do Brand System, com módulo inteiro e cantos no pixel.

| Arquivo | Detalhe |
|---|---|
| `favicon-16.svg` | Módulo de 3 px, glifo 15 × 15 em (0, 0). |
| `favicon-24.svg` | Módulo de 4 px, margem de 2 px. |
| `favicon-32.svg` | Módulo de 6 px, margem de 1 px. |
| `favicon-48.svg` | Módulo de 9 px, glifo 45 × 45 com 1 px à esquerda e no topo. Novo, segue a mesma regra dos outros masters. |
| `favicon.svg` | Master de 32 px que troca para papel no modo escuro do navegador. |
| `favicon.ico` | 16, 32 e 48 px, para navegadores antigos. |
| `apple-touch-icon.png` | 180 × 180, grafite com Z em papel e acento. |

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

---

## Built by Zarco

Pasta `brand/endorsement/`. Assina produtos feitos pela Zarco sem competir com a marca do produto.

| Arquivo | Uso |
|---|---|
| `built-by-zarco.svg` | Versão padrão: monograma e texto em grafite. Igual a `built-by-zarco-dark.svg`. |
| `built-by-zarco-dark.svg`, `-light`, `-currentcolor` | Monograma + texto. |
| `built-by-zarco-text-*.svg` | Só texto, para espaços apertados. |
| `produto-zarco.svg` e variações | "Um produto Zarco", para interfaces só em português. |

Onde aparece: rodapé, tela de login, página "Sobre", documentação. Nunca no header, nunca maior que o logo do produto. Mínimo: monograma de 12 px com texto de 11 px; só texto, 10 px. Cor: a cor de texto ou a cor secundária do produto.

---

## Graphic Assets

Pasta `graphics/`. Use no máximo três tipos de elemento gráfico por peça. Cada elemento precisa ter uma função.

| Pasta | Arquivos | Como usar |
|---|---|---|
| `z-path/` | `zarco-z-path.svg`, `-outline`, `-accent` | Z Percurso em escala grande (500 × 500) para capas, propostas e apresentações. Funciona cortado pela borda da peça. O contorno tem 1 px no tamanho nativo. |
| `grid/` | `zarco-grid.svg`, `zarco-grid-dark.svg` | Grid oficial de 12 colunas (1200 px de conteúdo, gutter de 24, margem de 64) com linhas a cada 64 px. Fundo leve, sem azul. |
| `registration/` | `registration-mark.svg`, `registration-corners.svg` | Só nos quatro cantos de um quadro, sobre interseções do grid. Nunca soltas como decoração. |
| `measurement/` | `measurement-horizontal.svg`, `-vertical`, `measurement-marker.svg`, `measurement-horizontal-accent.svg` | Cotas sem número fixo. As cotas horizontal e vertical esticam sem deformar o traço no navegador. Escreva o valor em Plex Mono, de 12 a 13 px. A versão laranja só quando a medida é o ponto da peça. |
| `flow/` | `flow-line.svg`, `flow-arrow.svg`, `flow-arrow-vertical.svg`, `flow-node.svg`, `flow-node-focus.svg` | Monte diagramas como Problema → Diagnóstico → Decisão → Engenharia → Software. Laranja (`flow-node-focus`) em exatamente um nó, o ponto do diagrama. Até 7 caixas. |
| `coordinates/` | `coordinate-marker.svg`, `coordinate-grid.svg` | Marcador de célula (A3, C1) e grade 5 × 4. Os valores entram depois, em Plex Mono. |
| `backgrounds/` | `background-structure-01.svg` a `-03.svg` | 1920 × 1080. 01: grid e poucos marcadores. 02: Z Percurso grande e linhas estruturais. 03: fluxo modular. Funcionam cortados e em grandes formatos. |

---

## Social

Arquivos SVG editáveis, com PNG pronto para upload onde a plataforma não aceita SVG.

| Arquivo | Dimensão | Finalidade |
|---|---|---|
| `linkedin/linkedin-avatar.svg` / `.png` | 400 × 400 | Logo da página da empresa. O Z ocupa metade do quadro e continua legível no corte circular. |
| `linkedin/linkedin-cover.svg` / `.png` | 1128 × 191 (PNG em 2×) | Capa da página da empresa. A área inferior esquerda fica livre para o logo sobreposto. |
| `github/github-avatar.svg` / `.png` | 500 × 500 | Avatar da organização. |
| `github/github-social-preview.svg` / `.png` | 1280 × 640 | Preview dos repositórios institucionais (Settings → Social preview). |
| `open-graph/zarco-og.svg` / `.png` | 1200 × 630 | Preview do site em links compartilhados. Use o PNG em `og:image`. |
| `posts/social-post-light.svg`, `-dark.svg` | 1080 × 1080 | Templates de post: número e categoria, título, área opcional para diagrama ou dado, wordmark. |

Os templates de post usam texto vivo nos campos entre colchetes para você editar, então precisam da IBM Plex instalada. Todos os outros arquivos têm o texto em contornos e não dependem de fonte.

```html
<meta property="og:image" content="https://[SITE]/zarco-og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

---

## Documents

Pasta `documents/`. Todos em `.docx`, A4, margens de 20 mm, editáveis no Word. Campos a preencher aparecem entre colchetes e em cinza. Caixas de seleção são o caractere ☐: troque por ☒ para marcar.

| Documento | Para que serve |
|---|---|
| `proposta/Zarco - Proposta Comercial.docx` | Capa e 11 seções: contexto, objetivo, solução, escopo com Sim/Não, fora do escopo, entregáveis, processo, cronograma em cotas, investimento com o total marcado em laranja, condições e próximo passo com assinaturas. |
| `escopo/Zarco - Escopo de Projeto.docx` | Anexo da proposta ou do contrato. 14 seções, de contexto a revisões. |
| `change-request/Zarco - Solicitação de Mudança.docx` | Demanda fora do escopo aprovado: motivo, impacto, novo valor, novo prazo e decisão. |
| `aceite/Zarco - Termo de Entrega e Aceite.docx` | Formaliza a entrega: itens, pendências, ambiente, responsabilidades transferidas e assinaturas. |
| `diagnostico/Zarco - Diagnóstico.docx` | Relatório de diagnóstico. A recomendação inclui "ferramenta pronta", "mudança de processo" e "nenhuma implementação neste momento". |
| `relatorio/Zarco - Relatório de Projeto.docx` | Atualização periódica: status (no prazo, atenção, bloqueado), concluído, em andamento, decisões e bloqueios. |
| `manutencao/Zarco - Plano de Manutenção.docx` | Proposta recorrente. Itens incluídos são opcionais e o SLA fica em branco para você definir. |
| `contrato/Zarco - Contrato Base.docx` | **Base operacional para revisão jurídica. Não é aconselhamento jurídico.** Os pontos que exigem atenção estão marcados com "[Revisão jurídica: ...]". |
| `papel-timbrado/Zarco - Papel Timbrado.docx` | Lockup no cabeçalho e dados da empresa no rodapé, como campos a preencher. |

Antes de enviar um documento, substitua todos os colchetes. Busque por `[` no Word para encontrar os que faltam.

### Apresentação

`presentation/Zarco - Apresentação Institucional.pptx`, 16:9, 10 slides. Tem tema próprio (cores e fontes da Zarco) e quatro layouts editáveis: capa, frase, conteúdo e encerramento. O Z da capa e do encerramento é forma nativa do PowerPoint, então dá para mudar tamanho e posição sem perder qualidade.

### Assinatura de e-mail

Pasta `email/`.

- `zarco-email-signature.html`: só texto. É a versão recomendada, porque funciona em qualquer cliente de e-mail.
- `zarco-email-signature-wordmark.html`: com o wordmark pequeno. Antes de usar, hospede `zarco-wordmark-email.png` em um endereço público e troque o `src`. Clientes de e-mail bloqueiam SVG e arquivos locais.

Abra o HTML no navegador, selecione a assinatura, copie e cole no campo de assinatura do Gmail ou do Outlook.

---

## Colors

| Token | Light | Dark | Uso |
|---|---|---|---|
| Papel (background) | `#F4F3EF` | `#141517` | Fundo |
| Surface | `#FAF9F6` | `#1C1D20` | Superfícies |
| Grafite (foreground) | `#17181A` | `#EDEBE6` | Texto e logo |
| Muted | `#E9E7E1` | `#26272B` | Áreas neutras |
| Muted foreground | `#5F6168` | `#9A9CA3` | Texto secundário, rótulos |
| Border | `#D6D3CB` | `#33353A` | Divisórias |
| Laranja-sinal (accent) | `#FF5A1F` | `#FF5A1F` | Marcação |
| Accent text | `#C2410C` | `#FF7A45` | Texto laranja sobre fundo claro |

O laranja marca, não preenche. Um acento por tela ou página. Texto sobre laranja é sempre grafite.

---

## Typography

- **IBM Plex Sans**: títulos, corpo, interface.
- **IBM Plex Mono**: rótulos, metadata, numeração, dados, código. Nunca em títulos ou parágrafos.

As duas são gratuitas (SIL Open Font License): https://github.com/IBM/plex. **Instale as duas antes de abrir os documentos e a apresentação.** Sem elas, o Word e o PowerPoint usam outra fonte. No Word, os títulos usam o negrito da Plex Sans, porque o Word não oferece o peso SemiBold diretamente.

---

## Rules

- Não distorcer, girar, contornar, aplicar sombra, gradiente ou brilho ao logo.
- Não usar o wordmark em laranja.
- Não redesenhar o logo com fonte digitada.
- Não colocar o selo Built by Zarco no header nem maior que o logo do produto.
- Não usar Plex Mono em títulos ou textos longos.
- Laranja só como marcação: um acento por peça, sem grandes blocos laranja.
- Sem estética de blueprint (azul e branco), engenharia civil, terminal hacker, cyberpunk, gradiente de SaaS, consultoria antiga ou agência criativa.
- Linha tracejada só para o que é futuro, opcional ou fora do escopo.
- Raio: 0 por padrão, 2 px em controles, 4 px em elementos flutuantes, 8 px só em molduras de captura de tela.

---

## Notas técnicas

- Todos os SVGs têm `viewBox`, `<title>` e paths simples. Nenhum usa raster, Base64, fonte embutida, script, filtro, máscara, clipPath ou `foreignObject`.
- As cotas e a linha de fluxo usam `vector-effect="non-scaling-stroke"` para esticar sem engrossar o traço. Fora do navegador (Figma, Illustrator), redimensione sem esticar.
- Lockup horizontal e favicon de 48 px são as duas peças novas deste pacote. As demais são extraídas do Brand System sem alteração.
- Nada neste pacote inventa dados da Zarco. CNPJ, endereço, e-mail, telefone, site e links de redes sociais estão como campos a preencher.
