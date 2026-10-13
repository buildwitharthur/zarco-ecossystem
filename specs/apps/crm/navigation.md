# CRM — navegação e comportamentos globais

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Rotas e contratos de tela: [routes.md](routes.md) · UX: [ux-audit.md §2](../../experience/ux-audit.md) · Fluxos: [F-CRM](../../experience/user-flows.md#2-crm) · Domínio: [domain-model.md](../../product/domain-model.md)

Legenda: **[C]** aprovado em etapa anterior · **[H]** proposta desta etapa, aguardando aprovação

Este documento define estrutura e comportamento, não aparência.

---

## 1. Hierarquia

```text
Login (pública)
└── Área autenticada
    ├── Início ............................ faixa de projetos + quadro geral
    ├── Projetos .......................... lista (em andamento | encerrados | todos)
    │   ├── Novo projeto
    │   └── Projeto ....................... dados, links, fase, saúde, quadro do projeto
    │       └── Editar projeto
    ├── Clientes .......................... lista
    │   ├── Novo cliente
    │   └── Cliente ....................... dados e projetos do cliente
    │       └── Editar cliente
    └── Modelos ........................... modelos agrupados por categoria
        └── (painel) Gerenciar categorias
```

## 2. Menu principal **[C]**

Sempre visível na área autenticada, nesta ordem: **Início · Projetos · Clientes · Modelos**. O item da seção atual fica marcado. A ação **Sair** fica separada dos itens de navegação (CA-CRM-01.2).

## 3. Sobreposições (sem rota própria) **[C]**

Ações curtas, que não precisam de endereço próprio, abrem por cima da tela atual. Fechar uma sobreposição devolve o foco ao elemento que a abriu.

| ID | Sobreposição | Aberta a partir de |
|---|---|---|
| OV-01 | Tarefa (ver, editar título e prazo, mover, excluir) | Qualquer quadro |
| OV-02 | Novo cliente (rápido) | Formulário de projeto (UX C6) |
| OV-03 | Enviar modelo | Modelos |
| OV-04 | Editar modelo (nome e categoria) / Substituir arquivo | Modelos |
| OV-05 | Gerenciar categorias | Modelos |
| OV-06 | Confirmação de exclusão | Qualquer exclusão (UX C7) |

## 4. Componente compartilhado: Quadro de tarefas **[C]**

Um único componente, usado no **Início** (quadro geral) e no **Projeto** (quadro do projeto) (UX §2.3).

| Aspecto | Quadro geral (Início) | Quadro do projeto |
|---|---|---|
| Tarefas exibidas | Só de projetos em andamento (CA-CRM-06.6) | Só do projeto, em andamento ou encerrado |
| Coluna "Feito" | Concluídas nos últimos 14 dias (CA-CRM-06.7) | Concluídas nos últimos 14 dias, com a opção "Mostrar todas as concluídas (N)" (CA-CRM-06.8) **[C]** |
| Projeto no cartão | Sim | Não (é redundante) |
| Filtro por projeto | Sim, refletido na URL (`?projeto=`) **[C]** | Não se aplica |
| Criação rápida | Título + projeto. O projeto vem preenchido se houver filtro. Só lista projetos em andamento. | Título. O projeto é o da página. |

**Colunas:** A fazer · Fazendo · Feito (RN-CRM-07). Cada coluna mostra a quantidade de tarefas exibidas. **[C]**

**Cartão de tarefa:** título · projeto (só no quadro geral) · prazo, se houver · indicação de **atrasada** (domínio §4.3), que não depende só de cor. **[C]**

**Ações no quadro:**

| Ação | Como | Origem |
|---|---|---|
| Criar | Campo no topo de "A fazer". Enter cria; a tarefa entra no fim da coluna | UX C2 |
| Mover entre colunas | Arrastar, ou menu "Mover para…" | UX C3 |
| Reordenar na coluna | Arrastar, ou "Subir" / "Descer" | Domínio §4.3, UX C3 |
| Abrir | Clique no cartão abre OV-01 | — |
| Excluir | Em OV-01, com confirmação simples | UX C7 |

**Estados do quadro:**

| Estado | Comportamento |
|---|---|
| Carregando | Estrutura das colunas visível, com indicação de carregamento no lugar dos cartões |
| Vazio (sem projetos em andamento) | Mensagem: "Nenhum projeto em andamento." + ação "Cadastrar projeto" (UX C12) |
| Vazio (com projetos, sem tarefas) | Colunas vazias, com o campo de criação rápida em foco disponível |
| Erro ao carregar | Mensagem com a ação "Tentar de novo" |
| Erro ao salvar uma movimentação | O cartão volta à posição anterior e aparece uma mensagem de erro **[C]** |

## 5. Comportamentos globais **[C]**

| ID | Comportamento |
|---|---|
| G1 | **Autenticação:** toda rota, exceto `/login`, exige sessão ativa. Sem sessão, vai para `/login` (CA-CRM-01.1). |
| G2 | **Sessão expirada (CA-CRM-01.5):** a próxima ação leva ao login com a mensagem "Sua sessão expirou. Entre novamente." Depois do login, Arthur volta à rota em que estava (UX C10). Dados de um formulário não salvo podem ser perdidos; a mensagem não promete o contrário. **[C]** |
| G3 | **Confirmação de salvamento:** toda alteração salva mostra uma confirmação breve, que some sozinha (UX §2.5). |
| G4 | **Erros de validação:** aparecem junto ao campo, com o motivo. O formulário mantém o que foi digitado. |
| G5 | **Erro inesperado ao salvar:** mensagem geral, sem perder o que foi digitado, e a possibilidade de tentar de novo. |
| G6 | **Saída com alterações não salvas:** ao tentar sair de um formulário alterado, o sistema pergunta se Arthur quer descartar as alterações. **[C]** |
| G7 | **Exclusões:** sempre por OV-06, com a consequência descrita ("Excluir o projeto X e as N tarefas dele?"). Exclusões bloqueadas explicam o motivo e o caminho (UX C8). |
| G8 | **Rótulos consistentes:** fase, saúde e status usam sempre os mesmos nomes do domínio, em todas as telas (UX §2.5). |
| G9 | **Teclado:** tudo é operável pelo teclado, com foco visível. As sobreposições prendem o foco enquanto abertas e fecham com Esc (RNF-CRM-06). |
| G10 | **Indexação:** nenhuma página do CRM é indexável (CA-CRM-02N.3). |
| G11 | **Largura:** referência mínima de 1280 px (RNF-CRM-04). Abaixo disso, o CRM continua utilizável, mas sem otimização. |
| G12 | **Datas:** exibidas no formato brasileiro (DD/MM/AAAA), sem horário, exceto "atualizado em" dos modelos, que pode mostrar a hora. **[C]** |
