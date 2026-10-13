# Análise de UX

> ⚠️ **Documento histórico.** A **§1 (landing)** foi substituída pela [direção criativa](../design/landing-creative-direction.md) e pelo [contrato de tela](../apps/landing/routes.md). Continuam valendo o L1 (sem menu), o L2 (ação acessível na rolagem), o L3 (ícone e nome acessível), o L6 (sem prazo de resposta) e o L7 (nova aba no computador). O L8 (sem perguntas frequentes) foi revertido. A **§2 (CRM) continua vigente.**

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> **Natureza:** análise preventiva dos fluxos propostos. Não há interface implementada nem testes com usuários. Nenhuma métrica ou resultado de usabilidade citado aqui foi medido; as recomendações vêm de princípios de UX aplicados aos requisitos aprovados.
> Fluxos resultantes: [user-flows.md](user-flows.md) · Requisitos: [../product/requirements.md](../product/requirements.md)

Legenda: **[C]** aprovado · **[H]** recomendação, aguardando aprovação · **[F]** recomendação que **altera ou acrescenta comportamento funcional**, exige aprovação explícita e atualização dos requisitos

---

## 1. Landing page

### 1.1 Tarefas

| Tarefa | Frequência | Criticidade |
|---|---|---|
| Entender o que a Zarco faz e se serve para o meu caso | Uma vez por visitante | Crítica: sem isso, não há contato |
| Iniciar conversa no WhatsApp | Uma vez por visitante | Crítica: é a única conversão |

O visitante não tem compromisso com a página. Toda fricção custa conversão, porque a alternativa dele é simplesmente sair.

**Hipótese de dispositivo (aprovada como premissa de projeto):** a maior parte dos visitantes chega pelo celular, por links compartilhados no WhatsApp e por buscas feitas no celular. Não há dados para confirmar. Por isso a página é projetada a partir do celular, e o computador recebe atenção específica no ponto em que o WhatsApp funciona de forma diferente (1.3, item L4, cuja recomendação foi recusada).

### 1.2 Hierarquia de informação [C]

A ordem segue as três perguntas que o visitante precisa responder (RF-LP-01): *o que é → serve para mim? → como funciona → por que confiar → agir*.

| # | Seção | Pergunta que responde | Requisitos |
|---|---|---|---|
| 1 | **Abertura**: o que a Zarco faz, para quem, botão de contato e uma linha de apoio ("Diagnóstico gratuito. Orçamento depois de entender o problema.") | O que é? Quanto custa começar? | RF-LP-01, RF-LP-06, RN-LP-04 |
| 2 | **Problemas**: situações em que o visitante se reconhece | Serve para mim? | RF-LP-02 |
| 3 | **O que a Zarco constrói**: sistemas em destaque; automação e evolução como linhas secundárias | O que exatamente eu recebo? | RF-LP-03 |
| ~~4~~ | ~~Como funciona~~: removida em 12/10/2026 por decisão de Arthur (poucas seções, bem feitas). A pergunta "o que acontece depois?" é respondida pela linha de apoio da abertura. | — | — |
| 5 | **Por que a Zarco**: diferenciais | Por que eles e não outro? | RF-LP-05 |
| 6 | **Chamada final**: repete a ação, com o número visível | Agir | RF-LP-06 |
| 7 | **Rodapé**: descriptor, WhatsApp, região | Quem são, onde estão | RF-LP-07 |

A linha de apoio na abertura antecipa a objeção mais comum ("quanto vai custar só para conversar?") no ponto de decisão. Ela usa somente informações aprovadas (RN-LP-03, RN-LP-04).

### 1.3 Pontos de atenção e recomendações

| # | Ponto | Risco | Recomendação | Tipo |
|---|---|---|---|---|
| L1 | Menu de navegação | Um menu com âncoras abre saídas e decisões que não levam à conversão. A página é curta. | **Sem menu.** O cabeçalho tem só o logo e o botão de contato. | [C] |
| L2 | Acesso à ação durante a rolagem (CA-LP-06.4) | Quem decide no meio da página precisa voltar ao topo. | **Celular:** um botão fixo no rodapé da tela aparece depois que a abertura sai da vista. **Computador:** o cabeçalho fica fixo e mostra o botão. | [C] |
| L3 | "Converse sobre o seu caso" não diz o canal | O visitante pode esperar um formulário e hesitar diante do desconhecido. | Manter o rótulo aprovado, com o ícone do WhatsApp ao lado. Para leitores de tela, o nome acessível é "Converse sobre o seu caso pelo WhatsApp". | [C] |
| L4 | WhatsApp no computador | O WhatsApp Web exige que o visitante já esteja conectado. Parte das conversões pode se perder na troca de aparelho. | ~~QR code no computador~~ **Recusado por Arthur (12/10/2026). Não implementar.** O número visível em texto (CA-LP-06.5) continua sendo a alternativa. | Recusada |
| L5 | Excesso de conteúdo | Muitos problemas, diferenciais e etapas aumentam a carga cognitiva e diluem a mensagem. | Limites para a copy: até **4 problemas**, até **4 diferenciais** e as **5 etapas** do método, cada item com uma frase. | [C] |
| L6 | Expectativa de resposta | Depois de enviar a mensagem, o visitante não sabe quando terá retorno. | **A página não menciona prazo nem horário de resposta** (decisão de Arthur, 12/10/2026). | [C] |
| L7 | Abertura em nova aba | O `wa.me` aberto na mesma aba tira o visitante da página no computador. | Abrir em nova aba no computador. No celular, o sistema já leva direto ao aplicativo. | [C] |
| L8 | Perguntas frequentes | Algumas objeções (preço, prazo, "minha empresa é pequena demais?") podem impedir o contato. | **Não incluir agora.** O diagnóstico gratuito e a conversa no WhatsApp já resolvem essas dúvidas melhor que um texto fixo. Reavaliar quando houver perguntas reais repetidas. | [C] |

### 1.4 Acessibilidade e prevenção de erros

- O botão de contato é um **link** (navega para outro destino) e não um botão de formulário. Assim, leitores de tela anunciam corretamente o que acontece. **[C]**
- O número exibido em texto (CA-LP-06.5) é selecionável e, no celular, também é um link de telefone/WhatsApp. **[C]**
- Não há formulário, portanto não há erros de entrada a prevenir. O único erro possível é o WhatsApp não abrir, tratado pelo número visível em texto.

## 2. CRM

### 2.1 Tarefas

| Tarefa | Frequência estimada | Criticidade |
|---|---|---|
| Ver o que precisa ser feito hoje (tarefas de todos os projetos) | Diária, várias vezes | Alta |
| Criar tarefa e mover entre colunas | Diária | Alta |
| Ver como estão os projetos (fase, saúde, prazos) | Semanal | Alta |
| Atualizar fase ou saúde | Semanal ou menos | Média |
| Abrir um link do projeto (produção, repositório) | Frequente | Média |
| Baixar um modelo | Ocasional | Média |
| Cadastrar projeto e cliente | Rara (até 5 projetos) | Média |
| Enviar ou substituir modelo, organizar categorias | Rara | Baixa |

A frequência é estimada, não medida. O critério de desenho é: **o que é diário tem que custar um clique; o que é raro pode custar três.**

### 2.2 Tela inicial — opção A aprovada

O pedido do quadro geral muda a tela mais usada do CRM. Há duas opções:

| Opção | Como funciona | Vantagem | Desvantagem |
|---|---|---|---|
| **A — Início combinado** (aprovada) | No topo, uma faixa com os projetos em andamento (até 5 cartões: nome, cliente, fase, saúde, previsão). Abaixo, o quadro geral de tarefas. | A rotina diária (tarefas) e a semanal (saúde dos projetos) ficam na mesma tela. Zero cliques depois do login. | Tela mais densa. Com mais de 5 a 6 projetos, a faixa precisa de outro formato. |
| B — Telas separadas | A tela inicial é a visão geral de projetos. O quadro geral fica em outro item do menu. | Cada tela tem um único foco. | A tarefa mais frequente custa um clique a mais, todos os dias. |

Com o limite de até 5 projetos simultâneos (overview), a opção A cabe bem em 1280 px. Se o número de projetos crescer muito, a faixa pode virar uma tela própria, sem mudar o resto.

### 2.3 Navegação [C]

Menu fixo com quatro itens, nesta ordem de frequência:

1. **Início**: faixa de projetos e quadro geral.
2. **Projetos**: lista completa, inclusive os encerrados (CA-CRM-05.2).
3. **Clientes**
4. **Modelos**: a gestão de categorias fica dentro desta tela, e não em um item próprio, porque é rara e só existe por causa dos modelos.

A página de um projeto reúne os dados, os links e o **mesmo quadro** do Início, já filtrado por aquele projeto. É um único componente de quadro, usado em dois lugares, com o mesmo comportamento.

### 2.4 Pontos de atenção e recomendações

| # | Ponto | Risco | Recomendação | Tipo |
|---|---|---|---|---|
| C1 | Coluna "Feito" cresce sem parar | Em poucas semanas, a coluna fica com dezenas de tarefas e o quadro perde a utilidade. | O quadro geral mostra tarefas **só de projetos em andamento**, e a coluna "Feito" mostra apenas as concluídas nos **últimos 14 dias**. Isso exige registrar **automaticamente a data de conclusão** da tarefa, um atributo novo no domínio. As tarefas mais antigas continuam acessíveis na página do projeto. | [C] — aplicada em RF-CRM-06 e no domínio §4.3 |
| C2 | Criar tarefa no quadro geral | Exigir o projeto em um formulário separado é lento para uma ação diária. | Criação rápida no topo da coluna "A fazer": digita o título e escolhe o projeto (já preenchido se o quadro estiver filtrado ou se for o quadro do projeto). O prazo é opcional e pode ser adicionado depois. | [C] |
| C3 | Mover tarefas | Arrastar não funciona pelo teclado nem é preciso em todos os casos (RNF-CRM-06). | Arrastar e soltar entre colunas e dentro da coluna, e também um menu na tarefa com "Mover para…" e "Subir / Descer". | [C] |
| C4 | Atualizar fase e saúde | Abrir um formulário completo para trocar um campo é desproporcional. | Na página do projeto, fase e saúde são **seletores editáveis no próprio lugar**, salvos na hora, com confirmação discreta. Os outros dados usam um formulário de edição. | [C] |
| C5 | Encerrar um projeto apaga a saúde (domínio §4.2) | Arthur pode não perceber que a saúde foi descartada. | Ao escolher Concluído ou Cancelado, mostrar o aviso: "A saúde do projeto deixa de ser acompanhada." Não pedir confirmação, porque a ação pode ser desfeita reabrindo o projeto. | [C] |
| C6 | Cadastrar projeto de um cliente novo (UC-CRM-02 A1) | Sair do formulário para cadastrar o cliente faz perder o contexto. | No seletor de cliente, a opção "Novo cliente" abre um pequeno formulário sobreposto. Ao salvar, o cliente já vem selecionado no projeto. | [C] |
| C7 | Exclusões | Excluir um projeto apaga as tarefas (RN-CRM-11), uma perda irreversível. | A confirmação diz o que será apagado ("Excluir o projeto X e as 12 tarefas dele?"). A ação destrutiva usa a cor *destructive* da paleta. Exclusão de tarefa: confirmação simples. | [C] |
| C8 | Exclusões bloqueadas (RN-CRM-09, RN-CRM-10) | Uma mensagem genérica de "não é possível" deixa Arthur sem saber o que fazer. | A mensagem diz o motivo e o caminho: "Este cliente tem 2 projetos. Exclua ou transfira os projetos antes." | [C] |
| C9 | Busca | — | **Sem busca** no primeiro recorte. Com até 5 projetos e poucos modelos agrupados por categoria, ela não se paga (YAGNI). | [C] |
| C10 | Duração da sessão | Sessões curtas pedem login mais vezes; sessões longas aumentam o risco se o computador ficar exposto. | **Sessão curta**, com referência de 8 horas (decisão de Arthur, 12/10/2026). Ao expirar, depois do login Arthur volta à tela em que estava. | [C] |
| C11 | Modelos | Baixar é a ação mais comum desta área. | Na lista, o nome do modelo é o próprio link de download. Substituir, renomear, mover e excluir ficam em um menu de ações. O envio aceita arrastar o arquivo para a tela. | [C] |
| C12 | Primeiro uso | Telas vazias sem orientação. | Estados vazios com a próxima ação: "Nenhum projeto em andamento. Cadastrar projeto." | [C] |

### 2.5 Feedback e consistência

- Toda ação que salva dados mostra uma confirmação breve. Erros de validação aparecem junto ao campo, com o motivo (domínio §4). **[C]**
- Fase, saúde e status de tarefa sempre usam o mesmo rótulo e a mesma representação visual em todas as telas. **[C]**
- Pela regra da marca (um acento laranja por tela), o laranja **não** é usado para estados como "Atenção". As cores de estado serão definidas no design system (Etapa 07). **[C]**

## 3. Recomendações que alteram requisitos (resumo)

| # | Recomendação | O que muda se for aprovada |
|---|---|---|
| ~~L4~~ | ~~QR code no computador~~ | Recusada. Nada muda. |
| C1 | Data de conclusão automática da tarefa; "Feito" mostra os últimos 14 dias; o quadro geral mostra só projetos em andamento | **Aprovada e aplicada:** atributo em Tarefa (domínio §4.3) e CA-CRM-06.6 a 06.8 |
