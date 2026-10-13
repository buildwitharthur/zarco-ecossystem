# CRM — rotas e contratos de tela

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Navegação, sobreposições, quadro de tarefas e comportamentos globais (G1–G12): [navigation.md](navigation.md)
> Requisitos: [RF-CRM / RNF-CRM](../../product/requirements.md#2-crm-ferramenta-interna) · Regras: [RN-CRM](../../product/business-rules.md#2-crm) · Domínio: [domain-model.md](../../product/domain-model.md)

Legenda: **[C]** aprovado em etapa anterior · **[H]** proposta desta etapa, aguardando aprovação

Este documento define comportamento, não aparência. Os comportamentos globais G1–G12 valem para todas as telas e não são repetidos.

---

## 1. Rotas

Os endereços estão em português, coerentes com a interface. O endereço base (por exemplo, um subdomínio) fica para a Etapa 08 (P-CRM-06).

| Rota | Tela | Parâmetros |
|---|---|---|
| `/login` | TELA-CRM-01 Login | `?voltar=` rota de retorno após o login (G2) |
| `/` | TELA-CRM-02 Início | `?projeto=` filtro do quadro geral |
| `/projetos` | TELA-CRM-03 Projetos | `?situacao=andamento` (padrão), `encerrados` ou `todos` |
| `/projetos/novo` | TELA-CRM-05 Formulário de projeto | `?cliente=` cliente pré-selecionado |
| `/projetos/:id` | TELA-CRM-04 Projeto | — |
| `/projetos/:id/editar` | TELA-CRM-05 Formulário de projeto | — |
| `/clientes` | TELA-CRM-06 Clientes | — |
| `/clientes/novo` | TELA-CRM-08 Formulário de cliente | — |
| `/clientes/:id` | TELA-CRM-07 Cliente | — |
| `/clientes/:id/editar` | TELA-CRM-08 Formulário de cliente | — |
| `/modelos` | TELA-CRM-09 Modelos | `?categoria=` filtro |
| qualquer outra, ou `:id` inexistente | TELA-CRM-10 Não encontrada | — |

O download de um modelo é uma ação, não uma tela. Seu endereço exato será definido nos contratos técnicos (Etapa 09) e exige sessão ativa (CA-CRM-02N.4).

---

## 2. Contratos de tela

### TELA-CRM-01 — Login

| # | Item | Contrato |
|---|---|---|
| 3 | Objetivo | Permitir que Arthur entre no CRM. |
| 4 | Atores | Qualquer pessoa vê a tela; só Arthur consegue entrar. |
| 5 | Requisitos | RF-CRM-01, RN-CRM-01, UC-CRM-01, F-CRM-01 |
| 6 | Informações | Identificador de login e senha. O tipo de identificador (e-mail ou usuário) será definido na Etapa 08. |
| 7–8 | Componentes e ações | Campos de identificador e senha, ação "Entrar". Sem "criar conta" (CA-CRM-01.4). Sem "esqueci a senha": decisão de Arthur (12/10/2026). A recuperação de acesso é feita por Arthur diretamente no servidor, por um procedimento administrativo a definir na Etapa 08. |
| 9 | Comportamentos | Com sessão ativa, `/login` redireciona para `/`. Após o login, vai para `?voltar=` se for uma rota interna válida, senão para `/`. |
| 10 | Estados | **Padrão** · **Enviando:** ação desabilitada até a resposta · **Credenciais inválidas:** "Identificador ou senha incorretos.", sem dizer qual · **Bloqueio temporário:** mensagem informando que é preciso aguardar · **Sessão expirada:** mensagem de G2 |
| 11 | Entrada e saída | Entrada: acesso direto, G1 ou G2. Saída: Início ou rota de retorno. |
| 12 | Critérios | **CA-TCRM01.1** Credenciais erradas nunca indicam se o erro foi no identificador ou na senha. **CA-TCRM01.2** `?voltar=` só aceita rotas do próprio CRM (nunca um endereço externo). |

### TELA-CRM-02 — Início

| # | Item | Contrato |
|---|---|---|
| 3 | Objetivo | Responder, sem nenhum clique, a duas perguntas: o que preciso fazer e como estão os projetos. |
| 4 | Atores | Arthur |
| 5 | Requisitos | RF-CRM-05, RF-CRM-06, RN-CRM-03, RN-CRM-04, UC-CRM-03, UC-CRM-05, F-CRM-02 |
| 6 | Informações | **Cabeçalho:** saudação ("Bom dia, Arthur", conforme o horário) e a data por extenso, como no protótipo oficial. **Faixa de projetos:** um cartão por projeto em andamento com nome, cliente, fase (com progresso), saúde e previsão de entrega. **Quadro geral:** ver navigation.md §4. |
| 7 | Componentes | Faixa de projetos · Quadro de tarefas (modo geral) · ação "Novo projeto" |
| 8 | Ações | Abrir um projeto (clique no cartão) · filtrar o quadro por projeto · todas as ações do quadro · "Novo projeto" |
| 9 | Comportamentos | Ordem da faixa: Bloqueado, depois Atenção, depois No prazo, depois sem saúde. Em caso de empate, a previsão de entrega mais próxima primeiro; sem previsão, por último. **[C]** Projetos Bloqueado e Atenção se destacam com mais do que cor (CA-CRM-05.1). O filtro do quadro fica na URL e sobrevive a um recarregamento. |
| 10 | Estados | **Carregando:** faixa e quadro com indicação de carregamento. **Vazio:** sem projetos em andamento, a faixa e o quadro são substituídos por "Nenhum projeto em andamento." + "Cadastrar projeto". **Erro:** mensagem com "Tentar de novo", independente para a faixa e para o quadro. |
| 11 | Entrada e saída | Entrada: login, menu. Saída: Projeto, Novo projeto, OV-01. |
| 12 | Critérios | **CA-TCRM02.1** Projetos concluídos ou cancelados não aparecem na faixa nem no quadro. **CA-TCRM02.2** Com 5 projetos em andamento, a faixa inteira fica visível em 1280 px, sem rolagem horizontal. |

### TELA-CRM-03 — Projetos

| # | Item | Contrato |
|---|---|---|
| 3 | Objetivo | Consultar todos os projetos, inclusive os encerrados. |
| 5 | Requisitos | RF-CRM-03, CA-CRM-05.2, F-CRM-05 |
| 6 | Informações | Por projeto: nome, cliente, fase, saúde e previsão de entrega. |
| 7–8 | Componentes e ações | Filtro de situação (Em andamento · Encerrados · Todos) · lista · "Novo projeto" · clique abre o Projeto |
| 9 | Comportamentos | Padrão: Em andamento. Ordem: previsão de entrega mais próxima primeiro; sem previsão, por último. Para encerrados, a ordem é pelo nome. **[C]** O filtro fica na URL. |
| 10 | Estados | Carregando · Vazio por filtro ("Nenhum projeto encerrado.") · Vazio total ("Nenhum projeto cadastrado." + "Cadastrar projeto") · Erro com "Tentar de novo" |
| 11 | Entrada e saída | Entrada: menu, exclusão de projeto. Saída: Projeto, Novo projeto. |
| 12 | Critérios | **CA-TCRM03.1** O filtro "Encerrados" mostra apenas Concluído e Cancelado. "Em manutenção" aparece em "Em andamento". |

### TELA-CRM-04 — Projeto

| # | Item | Contrato |
|---|---|---|
| 3 | Objetivo | Ver e atualizar tudo sobre um projeto em um só lugar. |
| 5 | Requisitos | RF-CRM-03, RF-CRM-04, RF-CRM-06, RN-CRM-03, RN-CRM-04, RN-CRM-11, UC-CRM-04, UC-CRM-05, F-CRM-04, F-CRM-06 |
| 6 | Informações | Nome, cliente (link para o Cliente), fase, saúde, data de início, previsão de entrega, links (produção, repositório, documentação). Quadro do projeto. |
| 7 | Componentes | Seletor de fase · seletor de saúde · links · Quadro de tarefas (modo projeto) · ações "Editar" e "Excluir" |
| 8 | Ações | Mudar fase · mudar saúde · abrir link (nova aba) · editar · excluir · ações do quadro |
| 9 | Comportamentos | Fase e saúde salvam na hora, com G3 (UX C4). Ao escolher Concluído ou Cancelado, aparece o aviso "A saúde do projeto deixa de ser acompanhada." e a saúde é apagada (UX C5). Com o projeto encerrado, o seletor de saúde fica indisponível. Links não informados não aparecem; se nenhum existir, aparece "Nenhum link cadastrado." **[C]** Excluir abre OV-06 com a quantidade de tarefas. Depois de excluir, vai para Projetos. |
| 10 | Estados | Carregando · Erro ao carregar · **Não encontrado:** TELA-CRM-10 · Erro ao salvar fase ou saúde: o seletor volta ao valor anterior e aparece uma mensagem **[C]** |
| 11 | Entrada e saída | Entrada: Início, Projetos, Cliente, criação. Saída: Editar, Cliente, Projetos (após excluir). |
| 12 | Critérios | **CA-TCRM04.1** Mudar a fase não exige abrir nenhum formulário. **CA-TCRM04.2** Encerrar o projeto apaga a saúde e mostra o aviso. **CA-TCRM04.3** A exclusão informa o número de tarefas que serão apagadas. |

### TELA-CRM-05 — Formulário de projeto (novo e editar)

| # | Item | Contrato |
|---|---|---|
| 3 | Objetivo | Cadastrar ou editar os dados de um projeto. |
| 5 | Requisitos | RF-CRM-03, RN-CRM-02, RN-CRM-05, UC-CRM-02, F-CRM-03, domínio §4.2 |
| 6 | Campos | Nome* · Cliente* · Fase* (padrão no novo: Diagnóstico **[C]**) · Saúde (vazia no novo) · Data de início · Previsão de entrega · Link de produção · Link do repositório · Link da documentação. *Obrigatório. |
| 7 | Componentes | Formulário · seletor de cliente com a opção "Novo cliente" (OV-02) |
| 8 | Ações | Salvar · Cancelar |
| 9 | Validações | Obrigatórios preenchidos · previsão ≥ início, quando houver as duas · links com http ou https · saúde indisponível se a fase for de encerramento. Validação ao salvar e ao sair do campo. **[C]** |
| 10 | Estados | Padrão · Salvando (ação desabilitada) · Erros por campo (G4) · Erro geral (G5) · Sem clientes cadastrados: o seletor mostra só "Novo cliente" |
| 11 | Entrada e saída | Entrada: "Novo projeto", "Editar", `?cliente=`. Saída: Salvar vai para o Projeto. Cancelar volta à tela anterior (G6 se houver alterações). |
| 12 | Critérios | **CA-TCRM05.1** Criar um cliente por OV-02 não apaga o que já foi preenchido no projeto, e o cliente novo vem selecionado. |

### TELA-CRM-06 — Clientes

| # | Item | Contrato |
|---|---|---|
| 3 | Objetivo | Consultar os clientes. |
| 5 | Requisitos | RF-CRM-02 |
| 6 | Informações | Por cliente: empresa, nome do contato, quantidade de projetos. |
| 7–8 | Componentes e ações | Lista · "Novo cliente" · clique abre o Cliente |
| 9 | Comportamentos | Ordem alfabética pela empresa. **[C]** |
| 10 | Estados | Carregando · Vazio ("Nenhum cliente cadastrado." + "Cadastrar cliente") · Erro |
| 11 | Entrada e saída | Entrada: menu. Saída: Cliente, Novo cliente. |

### TELA-CRM-07 — Cliente

| # | Item | Contrato |
|---|---|---|
| 3 | Objetivo | Ver os dados de contato e os projetos de um cliente. |
| 5 | Requisitos | RF-CRM-02, RN-CRM-05, RN-CRM-10, F-CRM-06 |
| 6 | Informações | Empresa, contato, telefone/WhatsApp, e-mail. Lista de projetos do cliente (nome, fase, saúde). |
| 7–8 | Componentes e ações | "Editar" · "Excluir" · "Novo projeto para este cliente" (vai para `/projetos/novo?cliente=`) **[C]** · clique em um projeto · telefone e e-mail como links de contato **[C]** |
| 9 | Comportamentos | Excluir sem projetos: OV-06 e depois Clientes. Excluir com projetos: mensagem de bloqueio (UX C8), sem excluir. |
| 10 | Estados | Carregando · Erro · Não encontrado (TELA-CRM-10) · Sem projetos: "Nenhum projeto para este cliente." |
| 12 | Critérios | **CA-TCRM07.1** Um cliente com projetos nunca é excluído, e a mensagem informa quantos projetos existem. |

### TELA-CRM-08 — Formulário de cliente (novo e editar; também usado em OV-02)

| # | Item | Contrato |
|---|---|---|
| 3 | Objetivo | Cadastrar ou editar um cliente. |
| 5 | Requisitos | RF-CRM-02, RNF-CRM-07, domínio §4.1 |
| 6 | Campos | Nome da empresa* · Nome do contato · Telefone/WhatsApp · E-mail. *Obrigatório. |
| 9 | Validações | Empresa obrigatória e única, sem diferenciar maiúsculas e minúsculas ("Já existe um cliente com este nome.") · e-mail em formato válido, quando informado. O telefone não tem formato obrigatório. **[C]** |
| 10 | Estados | Padrão · Salvando · Erros por campo · Erro geral |
| 11 | Entrada e saída | Página: salvar vai para o Cliente. OV-02: salvar fecha a sobreposição e seleciona o cliente no projeto. |

### TELA-CRM-09 — Modelos

| # | Item | Contrato |
|---|---|---|
| 3 | Objetivo | Encontrar e baixar um modelo rapidamente e manter a biblioteca organizada. |
| 5 | Requisitos | RF-CRM-07, RF-CRM-08, RN-CRM-08, RN-CRM-09, UC-CRM-06 a 08, F-CRM-07 a 09 |
| 6 | Informações | Modelos agrupados por categoria. Por modelo: nome, formato (ex.: DOCX), tamanho e data da última atualização. |
| 7 | Componentes | Lista agrupada · filtro por categoria · "Enviar modelo" (OV-03) · área para arrastar arquivos · "Gerenciar categorias" (OV-05) · menu de ações por modelo |
| 8 | Ações | Baixar (clique no nome; UX C11) · Substituir arquivo, Editar nome e categoria (OV-04) · Excluir (OV-06) · Enviar · Gerenciar categorias |
| 9 | Comportamentos | Categorias sem modelos não aparecem na lista, só em OV-05. **[C]** Ordem: categorias e modelos em ordem alfabética. **[C]** Arrastar um arquivo para a tela abre OV-03 com o arquivo já escolhido. |
| 10 | Estados | Carregando · Vazio ("Nenhum modelo guardado." + "Enviar modelo") · Erro · Enviando (progresso do envio) · Envio recusado (formato ou tamanho, com o motivo e os limites) |
| 12 | Critérios | **CA-TCRM09.1** Baixar um modelo exige um único clique a partir da lista. **CA-TCRM09.2** O arquivo baixado é idêntico ao enviado, com o nome original. |

**OV-03 / OV-04 — Enviar, editar e substituir modelo:** campos Arquivo* (no envio e na substituição), Nome* e Categoria*. Validações: formato aceito, até 20 MB, nome único na categoria. Substituir mantém nome e categoria e atualiza a data. Se o envio falhar, nada é salvo (domínio §5).

**OV-05 — Gerenciar categorias:** lista de todas as categorias, com a quantidade de modelos de cada uma. Ações: criar, renomear e excluir. Nome obrigatório e único. Excluir uma categoria com modelos é bloqueado com a mensagem de UC-CRM-08 E1.

### TELA-CRM-10 — Não encontrada

Mensagem "Página não encontrada." e link para o Início. Também usada quando o `:id` de um projeto ou cliente não existe, por exemplo depois de uma exclusão.
