# Auditoria de marca

> ⚠️ **Documento histórico.** Audita o Brand System v1. As decisões de aplicação visual (P1–P7, raio 0, Plex, tema claro) foram **substituídas** pela revisão da marca toda (Etapa 07) e pelo [design system](design-system/foundations.md). A análise do pacote de marca continua válida como registro.

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> **Evidências analisadas:** [assets/README.md](../../assets/README.md) (Zarco Brand System v1); peças renderizadas `social/open-graph/zarco-og.png`, `social/linkedin/linkedin-cover.png`, `social/github/github-social-preview.png`, `brand/favicon/apple-touch-icon.png`; código-fonte dos SVGs de `graphics/` e `social/posts/`; [briefing](../brand/briefing.md) §3 e §5.
> **Não analisados:** os arquivos `.docx` e `.pptx` foram lidos apenas como texto; a aparência deles não foi verificada.

Legenda: **[C]** oficial ou aprovado · **[H]** proposta, aguardando aprovação · **[P]** pendência

Esta auditoria descreve a marca **como ela existe**. Ela não redefine nada. As propostas aparecem apenas nas seções 4 e 5.

---

## 1. Identidade e posicionamento (resumo)

Fonte oficial: [briefing](../brand/briefing.md). Os pontos com consequência visual são:

| Traço do briefing | Consequência visual observada no pacote |
|---|---|
| Técnica, mas acessível | Linguagem de engenharia (grid, cotas, registro, fluxo) sem jargão visual: nada de blueprint azul nem estética hacker |
| Direta, criteriosa | Composições com poucos elementos, muito espaço vazio e hierarquia clara |
| Pragmática, sem excesso | Sem gradiente, sombra, brilho, textura ou ilustração |
| Confiável | Traço fino e preciso, alinhamento rigoroso ao grid |
| Moderna | Paleta neutra quente, tipografia sem serifa contemporânea e cantos retos |

## 2. Elementos oficiais

| Elemento | Situação | Fonte |
|---|---|---|
| Wordmark ZARCO (5 cores) | Oficial; preservar | `brand/wordmark/` |
| Monograma **Z Percurso** (grid 5×5, barra superior recuada, módulo final como acento) | Oficial; preservar | `brand/monogram/` |
| Lockup vertical (wordmark + descriptor) | Oficial; preservar | `brand/lockup/*-vertical-*` |
| **Lockup horizontal** | **Derivado, pendente de aprovação** | `brand/lockup/*-horizontal-*` |
| Favicons (masters de pixel) | Oficial; o de 48 px é novo, mas segue a regra dos masters | `brand/favicon/` |
| Selo Built by Zarco / Um produto Zarco | Oficial; só para produtos | `brand/endorsement/` |
| Paleta (claro e escuro) | Oficial | Briefing §5 e assets/README |
| IBM Plex Sans (títulos, corpo, interface) e IBM Plex Mono (rótulos, metadata, números, dados) | Oficial | assets/README |
| Elementos gráficos: Z Percurso grande, grid de 12 colunas, registro, cotas, fluxo, coordenadas, fundos | Oficial | `graphics/` |
| Regras de uso (raio, acento, proibições estéticas) | Oficial | assets/README, "Rules" |

## 3. Linguagem visual observada

Observações feitas nas peças renderizadas e no código dos SVGs.

| Aspecto | O que se observa |
|---|---|
| **Superfície** | Fundo papel `#F4F3EF` chapado. Sem textura, gradiente ou sombra. |
| **Estrutura** | Colunas do grid visíveis como linhas verticais de 1 px em `border` (`#D6D3CB`), às vezes com opacidade reduzida. Linhas horizontais mais fracas (opacidade 0,5). O grid é mostrado, não só usado. |
| **Geometria** | Retângulos, linhas retas e diagonais do Z. Cantos retos. Traço fino de 1 px em grafite para contornos. |
| **Acento** | Um único bloco quadrado laranja: o "módulo final" do Z. Ocupa uma fração mínima da peça (próximo dos 4% do briefing). Nunca há texto sobre ele. |
| **Tipografia** | Títulos em Plex Sans Medium, grandes, com espaçamento entre letras levemente negativo. Rótulos em Plex Mono maiúsculo, pequeno, em `muted-foreground`, no padrão `NN / ROTULO` (ex.: "01 / ENGENHARIA DE SOFTWARE"). |
| **Composição** | Texto alinhado à esquerda, na margem do grid. O elemento gráfico grande (Z) fica à direita, cortado pela borda. Muito espaço vazio. |
| **Densidade** | Baixa nas peças institucionais: um título, um rótulo, uma assinatura. |
| **Linhas tracejadas** | Usadas só para o que é opcional ou futuro (ex.: área opcional no template de post), conforme a regra. |
| **Escuro** | O ícone de app usa fundo grafite, Z em papel e acento laranja. A versão escura existe e é coerente. |

## 4. Lacunas e tensões para aplicação em interface

O Brand System foi desenhado para peças institucionais (social, documentos, apresentação). A aplicação em uma **landing de conversão** e em um **CRM operacional** expõe pontos que o sistema ainda não cobre.

| # | Ponto | Por que importa | Encaminhamento |
|---|---|---|---|
| A1 | **Cor da ação de contato na landing.** A regra é "um acento laranja por peça; o laranja marca, não preenche". O botão de contato é o ponto mais importante da página, mas é um bloco preenchido e se repete (abertura, cabeçalho fixo, botão fixo no celular, chamada final). | Define a aparência do elemento de conversão. | **Decidido (12/10/2026):** o botão de contato é **laranja (`accent`) com texto grafite (`accent-foreground`)**. Para manter um único acento por tela, o laranja passa a significar "a ação": onde houver um botão de contato visível, os elementos gráficos da página (ex.: Z Percurso) aparecem **sem o módulo laranja**. |
| A2 | **Cores de estado no CRM.** A paleta só tem `destructive` (vermelho). O CRM precisa representar Atenção, Bloqueado, No prazo e tarefa atrasada. Um amarelo ou âmbar para "Atenção" ficaria perto demais do laranja da marca e seria confundido com o acento. | Sem isso, o design system vai inventar cores fora da marca. | Proposta na seção 5 (P2); decisão final na Etapa 07. |
| A3 | **Indicador de foco (acessibilidade).** O foco do teclado precisa ser muito visível (WCAG). Se usar laranja, compete com a regra de um acento por tela. | Afeta todos os elementos interativos. | Proposta na seção 5 (P3). |
| A4 | **Ícone do WhatsApp.** A cor oficial do WhatsApp (verde) não pertence à paleta e quebraria a disciplina cromática. | Afeta o botão de conversão. | Proposta na seção 5 (P4). |
| A5 | **Grid visível em interface.** Nas peças, as linhas do grid são um elemento de identidade. Em uma interface densa como o CRM, linhas decorativas competem com divisórias funcionais. | Afeta a leitura das telas do CRM. | Proposta na seção 5 (P5). |
| A6 | **Lockup horizontal pendente.** As interfaces precisam de um logo para cabeçalhos baixos e largos. | O cabeçalho da landing e o do CRM dependem disso. | Proposta na seção 5 (P6). |
| A7 | **Tema do CRM (P-CRM-02).** A paleta tem versão escura completa; a landing é só clara. | Define o escopo do design system. | **Decidido (12/10/2026):** o CRM usa **somente** o tema escuro da paleta (RNF-CRM-08). |
| A8 | **Pequena inconsistência de nomenclatura.** O assets/README chama de "Papel" o tom `#EDEBE6` do wordmark claro, mas papel é `#F4F3EF` no tema claro. `#EDEBE6` é o `foreground` do tema escuro. | Pode confundir quem implementa. | **Corrigido** no assets/README com autorização de Arthur (12/10/2026). |
| A9 | **A paleta do assets/README é um subconjunto da do briefing:** omite `border-strong`, `accent-foreground` e `destructive`. | Não é contradição, mas existem duas tabelas. | Para tokens, a fonte é o **briefing §5**, que é a tabela completa. |

## 5. Decisões aprovadas

| # | Proposta | Fundamento |
|---|---|---|
| P1 | O padrão de rótulo `NN / ROTULO` em Plex Mono é usado para numerar as seções da landing (ex.: "02 / COMO FUNCIONA"). | É o traço tipográfico mais característico do sistema e organiza a leitura sem decoração. |
| P2 | **Estados sem depender de cor:** cada estado tem rótulo e um marcador de forma (ex.: quadrado cheio, contorno, traço). A cor só reforça. Bloqueado e atrasada usam `destructive`. Atenção usa a cor de texto (`foreground`) com marcador próprio, **sem amarelo nem âmbar**. No prazo usa `muted-foreground`. | Evita competir com o laranja (A2), atende WCAG 1.4.1 (informação que não depende só de cor) e mantém a paleta intacta. |
| P3 | O foco do teclado é um contorno de 2 px na cor `border-strong` (grafite no tema claro, claro no escuro) com afastamento do elemento, igual em toda interface. O laranja não é usado para foco. | Visível nos dois temas e não consome o acento (A3). |
| P4 | O ícone do WhatsApp é **monocromático**, na cor do texto do botão. | Mantém a disciplina cromática (A4). |
| P5 | **Landing:** as linhas do grid podem aparecer como estrutura de fundo, como nas peças sociais. **CRM:** sem grid decorativo; só divisórias funcionais (`border`). | Identidade onde há espaço; clareza onde há densidade (A5). |
| P6 | Os dois cabeçalhos usam **só o wordmark**, sem o descriptor. O rodapé da landing usa o **lockup vertical**, que é oficial. O lockup horizontal **não é necessário** para o escopo atual e continua pendente, sem bloquear nada. | O assets/README restringe o descriptor a contextos institucionais, e o rodapé do site está entre eles (A6). |
| P7 | No CRM, o laranja aparece no máximo uma vez por tela: um pequeno módulo quadrado, eco do Z Percurso, que marca o item ativo do menu. Ações primárias usam `foreground` (claro sobre o fundo escuro do CRM). | Uma ferramenta de uso diário com laranja em toda parte perderia o significado do acento. |
