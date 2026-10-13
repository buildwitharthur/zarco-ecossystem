# Regras de negócio

> **Estado:** Landing page aprovada (12/10/2026) · CRM aprovado (12/10/2026)
> **Última atualização:** 12/10/2026
> Requisitos: [requirements.md](requirements.md) · Fonte de marca: [../brand/briefing.md](../brand/briefing.md)

Legenda: **[C]** confirmado · **[H]** proposta, aguardando aprovação · **[P]** pendência

As regras de tom de voz, vocabulário e uso visual da marca estão no [briefing](../brand/briefing.md) e no [assets/README.md](../../assets/README.md) e não são repetidas aqui. Este documento registra apenas as regras específicas de cada aplicação ou as que precisam de um identificador para rastreabilidade.

---

## 1. Landing page

| ID | Regra | Origem | Requisitos |
|---|---|---|---|
| RN-LP-01 | Nenhum texto sugere equipe, clientes, depoimentos, cases, números, parceiros ou anos de mercado que não existam. Exemplos ilustrativos (ex.: nomes de estabelecimentos na demonstração) só aparecem com o selo visível "Ilustração do método. Não representa um cliente." | Briefing **[C]** | RF-LP-01 a 05 |
| RN-LP-02 | A página não cita o nome do fundador e não diz que a Zarco é uma empresa de uma pessoa. Pode dizer que o engenheiro (ou desenvolvedor) responsável acompanha o projeto de perto, do diagnóstico à entrega. Os textos usam a voz institucional ("a Zarco"), nunca "nós", "nossa equipe" ou a primeira pessoa. | Arthur **[C]** | RF-LP-05 |
| RN-LP-03 | A página não informa preço, faixa de preço ou "a partir de". Quando o assunto aparece, diz apenas que o orçamento é apresentado depois de entender o problema. | Arthur **[C]** | RF-LP-04 |
| RN-LP-04 | O diagnóstico inicial é gratuito: uma conversa para analisar a situação, que termina no orçamento. A página pode dizer isso, mas não promete um relatório escrito de diagnóstico, porque o diagnóstico detalhado faz parte do projeto contratado. | Arthur **[C]** | RF-LP-04, RF-LP-05 |
| RN-LP-05 | A única ação de conversão é abrir uma conversa no WhatsApp, com o rótulo "Converse sobre o seu caso" e a mensagem pré-preenchida: *"Olá! Vim pelo site da Zarco e quero conversar sobre um caso da minha empresa."* | Rótulo e pré-preenchimento: Arthur **[C]**. Texto da mensagem: proposto pelo agente e aprovado por Arthur **[C]** | RF-LP-06 |
| RN-LP-06 | A região de atendimento (São Gonçalo, Niterói e região) aparece só no rodapé ou na área de contato e nos metadados de busca, nunca no título nem na apresentação principal. | Briefing + Arthur **[C]** | RF-LP-07, RNF-LP-02 |
| RN-LP-07 | Dados institucionais (CNPJ, e-mail, endereço, redes sociais) só aparecem quando existirem e forem aprovados por Arthur. | Arthur **[C]** | RF-LP-07 |
| RN-LP-08 | A página não carrega scripts de rastreamento, analytics ou publicidade. Introduzir qualquer um deles (por exemplo, para tráfego pago) exige revisar esta especificação e incluir um mecanismo de consentimento de acordo com a LGPD. | Arthur **[C]** | RNF-LP-07 |
| RN-LP-09 | Produtos próprios e o selo "Built by Zarco" não aparecem na landing. O selo é exclusivo de produtos. | Overview + assets/README **[C]** | — |

> **Briefing atualizado (12/10/2026):** o briefing dizia que o diagnóstico "pode ser vendido sozinho". Ele foi ajustado para refletir RN-LP-04: o diagnóstico inicial é gratuito e o diagnóstico detalhado faz parte do projeto contratado.

---

## 2. CRM

| ID | Regra | Origem | Requisitos |
|---|---|---|---|
| RN-CRM-01 | O CRM tem um único usuário: Arthur. | Arthur **[C]** | RF-CRM-01 |
| RN-CRM-02 | Um projeto só é cadastrado depois que a proposta é aprovada pelo cliente. Oportunidades e propostas em negociação não entram no CRM. | Arthur **[C]** | RF-CRM-03 |
| RN-CRM-03 | A fase de um projeto é uma destas: **Diagnóstico, Projeto, Construção, Validação, Entrega** (em andamento) ou **Em manutenção, Concluído, Cancelado** (encerramento). Um projeto está "em andamento" nas cinco primeiras e em "Em manutenção". | Arthur **[C]**; agrupamento em um único campo: agente, aprovado por Arthur **[C]** | RF-CRM-04, RF-CRM-05 |
| RN-CRM-04 | A saúde de um projeto é **No prazo, Atenção** ou **Bloqueado**, e só se aplica a projetos em andamento. | Arthur **[C]**; restrição aos em andamento: agente, aprovado por Arthur **[C]** | RF-CRM-04, RF-CRM-05 |
| RN-CRM-05 | Todo projeto pertence a exatamente um cliente. Um cliente pode ter vários projetos. | Arthur **[C]** | RF-CRM-02, RF-CRM-03 |
| RN-CRM-06 | Toda tarefa pertence a exatamente um projeto. | Arthur **[C]** | RF-CRM-06 |
| RN-CRM-07 | O status de uma tarefa é **A fazer, Fazendo** ou **Feito**. | Arthur **[C]** | RF-CRM-06 |
| RN-CRM-08 | A área de documentos guarda apenas **modelos** da Zarco. Documentos preenchidos com dados de clientes não são guardados no CRM. Ao enviar uma nova versão de um modelo, ela substitui a anterior, sem histórico de versões. | Modelos: Arthur **[C]**; substituição sem histórico: agente, aprovado por Arthur **[C]** | RF-CRM-07 |
| RN-CRM-09 | Todo modelo pertence a exatamente uma categoria. Uma categoria com modelos não pode ser excluída. | Arthur **[C]**; bloqueio de exclusão: agente, aprovado por Arthur **[C]** | RF-CRM-07, RF-CRM-08 |
| RN-CRM-10 | Um cliente com projetos não pode ser excluído. | Agente **[C]** | RF-CRM-02 |
| RN-CRM-11 | Excluir um projeto exige confirmação e exclui também as tarefas dele. Para encerrar um projeto que existiu de fato, o caminho esperado é a fase "Cancelado", não a exclusão. | Agente **[C]** | RF-CRM-03 |
