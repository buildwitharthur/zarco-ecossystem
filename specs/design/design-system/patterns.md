# Design system — padrões

> **Estado:** Aprovada (12/10/2026). Reescrito na Etapa 12 a partir dos protótipos oficiais.
> Fundamentos: [foundations.md](foundations.md) · Componentes: [components.md](components.md)

Padrões são combinações e regras que se repetem. O comportamento detalhado das telas está nos contratos (G1–G12 e TELA-*).

---

## 1. Ritmo da landing

- Toda seção abre do mesmo jeito: **índice → título → uma frase**. O conteúdo vem em células ou em um único elemento "vivo".
- **No máximo um elemento animado por seção** (faixa, ciclo, demonstração, resolução da comparação, linha dos passos).
- Alternância de fundo como pontuação: `bg` → `bench` (demonstração) → `bg` → **laranja** (decisão).

## 2. Laranja = ação

- **Landing:** botões, estado ativo da demonstração e o bloco do CTA final. Nenhum elemento decorativo é laranja.
- **CRM:** só o marcador do item ativo do menu.

## 3. Movimento

| Regra | Aplicação |
|---|---|
| Mostra uma transformação | Ciclo de retrabalho, fases, tracejado → sólido, linha entre passos |
| Para fora da tela | `IntersectionObserver` em todos os elementos animados |
| Pausável quando automático por mais de 5 s | Faixa de sintomas e demonstração (WCAG 2.2.2) |
| Interação manual vence o automático | Clicar ou usar as setas numa fase pausa o avanço; o `aria-live` só é ativado nesse momento |
| Movimento reduzido | Nada se move sozinho; a demonstração fica manual; a faixa fica parada |
| Hover só com ponteiro real | `@media (hover: hover)`; em telas de toque não há estados presos |

## 4. Aprimoramento progressivo (landing)

Sem JavaScript: todo o texto e os links funcionam; as 4 fases da demonstração aparecem empilhadas; as perguntas abrem (`<details>`); os controles de pausa ficam ocultos. A animação de entrada só é aplicada depois que o JavaScript confirma que está ativo (classe `js`).

## 5. Hierarquia de ações no CRM

- Uma ação primária por tela, no cabeçalho da página.
- Ações frequentes no próprio item (seletores de fase e saúde; criação rápida no quadro).
- Ações secundárias no menu "⋯". As destrutivas ficam no fim do menu e só usam vermelho dentro da confirmação.

## 6. Formulários no CRM

Uma coluna (máximo de 560 px); rótulo acima do campo; validação ao sair do campo e ao salvar; o foco vai ao primeiro erro; "Salvar" e "Cancelar" no fim.

## 7. Retorno de operações no CRM

| Situação | Retorno |
|---|---|
| Alteração salva | Aviso breve ("Tarefa criada", "Movida para Fazendo"). Em movimentações no quadro, a própria mudança visual basta. |
| Erro de validação | Mensagem no campo |
| Erro ao salvar | Aviso persistente com "Tentar de novo"; mudanças otimistas são revertidas |
| Carregando | Blocos na forma do conteúdo, só depois de 300 ms |

## 8. Arrastar e soltar

Toda movimentação por arraste tem equivalente no menu "⋯" ("Mover para…", "Subir", "Descer"), acessível pelo teclado.

## 9. Texto longo

Título de tarefa: até 3 linhas no cartão. Nomes de projeto e cliente: 1 linha com reticências e o nome completo como dica.

## 10. Formatos

- **CRM:** datas curtas nos cartões ("17 out") e completas (DD/MM/AAAA) em detalhes e formulários, com algarismos tabulares.
- **Landing:** telefone em mono, no formato `+55 21 97514-0550`.

## 11. Protótipos

`prototypes/landing/index.html` e `prototypes/crm/inicio.html` são **referências visuais oficiais, não código de produção**. A implementação reproduz o resultado com os componentes e tokens deste design system, sem copiar o código dos protótipos.
