# Modelo de domínio

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Requisitos: [requirements.md](requirements.md) · Regras: [business-rules.md](business-rules.md)

Legenda: **[C]** derivado de requisito ou regra aprovados · **[H]** proposta do agente, aguardando aprovação

Este documento descreve os **conceitos do negócio** e suas regras. Ele não é o esquema do banco de dados: tabelas, chaves, índices e tipos físicos serão definidos nas Etapas 08 e 09.

---

## 1. Escopo

| Aplicação | Tem domínio próprio? |
|---|---|
| Landing page | **Não.** É conteúdo estático. O número do WhatsApp, a mensagem pré-preenchida e os textos são configuração de conteúdo (RNF-LP-09), não entidades de negócio. |
| CRM | **Sim.** Descrito a seguir. |

Conceitos de DDD (agregados, contextos delimitados, eventos) não são usados formalmente. O domínio tem cinco conceitos e um usuário, e a formalização não traria ganho. As fronteiras de consistência são descritas em linguagem simples na seção 5.

## 2. Glossário

| Termo | Significado |
|---|---|
| **Cliente** | Empresa para a qual a Zarco tem ou teve um projeto contratado, com uma pessoa de contato. |
| **Projeto** | Trabalho contratado por um cliente, cadastrado depois da aprovação da proposta. |
| **Fase** | Em que ponto do ciclo o projeto está (RN-CRM-03). |
| **Em andamento** | Projeto nas fases Diagnóstico, Projeto, Construção, Validação, Entrega ou Em manutenção. |
| **Encerrado** | Projeto nas fases Concluído ou Cancelado. |
| **Saúde** | Avaliação de Arthur sobre o andamento: No prazo, Atenção ou Bloqueado (RN-CRM-04). |
| **Tarefa** | Item de trabalho de um projeto, acompanhado no kanban. |
| **Modelo** | Arquivo-modelo de documento da Zarco (proposta, contrato etc.), sem dados de clientes. |
| **Categoria** | Agrupamento de modelos, criado por Arthur. |
| **Usuário** | Arthur, a única pessoa com acesso ao CRM. |

O termo "documento" na interface se refere sempre a um **modelo**. Documentos preenchidos de clientes não existem no CRM (RN-CRM-08).

## 3. Áreas do domínio

```text
┌────────────────────────────┐   ┌──────────────────────────────┐
│ Projetos                   │   │ Modelos de documento         │
│                            │   │                              │
│  Cliente 1 ──── * Projeto  │   │  Categoria 1 ──── * Modelo   │
│                     1      │   │                              │
│                     │      │   └──────────────────────────────┘
│                     *      │
│                   Tarefa   │   ┌──────────────────────────────┐
│                            │   │ Acesso                       │
└────────────────────────────┘   │  Usuário (Arthur)            │
                                 └──────────────────────────────┘
```

Leitura: um cliente tem vários projetos (`1 ── *`); um projeto tem várias tarefas; uma categoria tem vários modelos.

| Área | Conceitos | Relação com as outras áreas |
|---|---|---|
| Projetos | Cliente, Projeto, Tarefa | Nenhuma com Modelos. Modelos não se ligam a projetos nem a clientes (RN-CRM-08). |
| Modelos de documento | Categoria, Modelo | Nenhuma com Projetos. |
| Acesso | Usuário | Protege tudo. Não há dono por registro, porque há um único usuário (RN-CRM-01). |

As três áreas são independentes. Isso é uma informação útil para a arquitetura, mas não obriga a separá-las em módulos ou serviços.

## 4. Conceitos

### 4.1 Cliente

| Atributo | Obrigatório | Observação |
|---|---|---|
| Nome da empresa | Sim | |
| Nome do contato | Não | Dado pessoal |
| Telefone/WhatsApp do contato | Não | Dado pessoal |
| E-mail do contato | Não | Dado pessoal |

**Regras e invariantes**

- Pode ter zero ou mais projetos (RN-CRM-05). **[C]**
- Não pode ser excluído enquanto tiver projetos (RN-CRM-10). **[C]**
- Ao ser excluído, os dados pessoais do contato deixam de existir no CRM (RNF-CRM-07). **[C]**
- O nome da empresa é único, sem diferenciar maiúsculas e minúsculas, para evitar cadastro duplicado. **[C]**
- Se o e-mail for informado, deve ter formato válido. **[C]**

### 4.2 Projeto

| Atributo | Obrigatório | Observação |
|---|---|---|
| Nome | Sim | |
| Cliente | Sim | Exatamente um (RN-CRM-05) |
| Fase | Sim | Diagnóstico, Projeto, Construção, Validação, Entrega, Em manutenção, Concluído, Cancelado |
| Saúde | Não | No prazo, Atenção, Bloqueado |
| Data de início | Não | |
| Previsão de entrega | Não | |
| Link de produção | Não | |
| Link do repositório | Não | |
| Link da documentação | Não | |

**Regras e invariantes**

- Só é cadastrado após a aprovação da proposta (RN-CRM-02). Essa é uma regra de uso, não verificável pelo sistema. **[C]**
- A fase pode mudar para qualquer outra, inclusive para trás (CA-CRM-04.1). **[C]**
- A saúde só se aplica a projetos em andamento (RN-CRM-04). Quando o projeto é encerrado (Concluído ou Cancelado), a saúde é apagada. Se ele for reaberto, a saúde começa vazia. **[C]**
- Um projeto novo começa com saúde vazia, e não "No prazo", para não afirmar algo que Arthur ainda não avaliou. **[C]**
- Se as duas datas forem informadas, a previsão de entrega não pode ser anterior à data de início. **[C]**
- Os links, quando informados, são endereços web válidos (http ou https). **[C]**
- O nome não precisa ser único. Dois clientes podem ter um projeto chamado "Sistema interno". **[C]**
- A exclusão exige confirmação e apaga as tarefas do projeto (RN-CRM-11). **[C]**

### 4.3 Tarefa

| Atributo | Obrigatório | Observação |
|---|---|---|
| Título | Sim | |
| Status | Sim | A fazer, Fazendo, Feito. Começa em "A fazer". |
| Projeto | Sim | Exatamente um (RN-CRM-06) |
| Prazo | Não | Data, sem horário **[C]** |
| Data de conclusão | Não | Registrada pelo sistema (ver regra abaixo) **[C — adicionado na Etapa 04]** |

**Regras e invariantes**

- Não muda de projeto depois de criada. **[C]**
- A data de conclusão é registrada automaticamente quando a tarefa passa para "Feito" e é apagada se ela sair de "Feito". Não é editável. **[C]**
- Está **atrasada** quando tem prazo anterior à data de hoje e status diferente de "Feito" (CA-CRM-06.3). **[C]**
- Tarefas de projetos encerrados continuam existindo e podem ser editadas. **[C]**
- Dentro de uma coluna, a ordem é definida manualmente por Arthur (arrastar ou mover para cima e para baixo). Uma tarefa nova entra no fim da coluna "A fazer". **[C]**

### 4.4 Categoria

| Atributo | Obrigatório | Observação |
|---|---|---|
| Nome | Sim | Único, sem diferenciar maiúsculas e minúsculas **[C]** |

**Regras e invariantes**

- O CRM começa com nove categorias (CA-CRM-08.1). Depois disso, elas são categorias comuns, que podem ser renomeadas ou excluídas. **[C]**
- Não pode ser excluída enquanto tiver modelos (RN-CRM-09). **[C]**

### 4.5 Modelo

| Atributo | Obrigatório | Observação |
|---|---|---|
| Nome | Sim | |
| Categoria | Sim | Exatamente uma (RN-CRM-09) |
| Arquivo | Sim | `.docx`, `.xlsx`, `.pptx` ou `.pdf`, com até 20 MB (CA-CRM-07.6) |
| Nome original do arquivo | Sim | Usado no download |
| Data da última atualização | Sim | Registrada pelo sistema |

**Regras e invariantes**

- Enviar uma nova versão substitui o arquivo, sem guardar histórico (RN-CRM-08). A nova versão pode ter outro formato aceito. **[C]**
- O download entrega o arquivo exatamente como foi enviado (CA-CRM-07.3). **[C]**
- O nome é único dentro da categoria. **[C]**
- Pode mudar de categoria. **[C]**

### 4.6 Usuário

| Atributo | Observação |
|---|---|
| Identificador de login | E-mail ou nome de usuário. A decisão fica para a Etapa 08. |
| Credencial | Nunca guardada em texto puro (CA-CRM-02N.2) |

**Regras e invariantes**

- Existe um único usuário, criado na instalação do sistema e não pela interface (CA-CRM-01.4). **[C]**

## 5. Fronteiras de consistência

- **Projeto e suas tarefas** formam uma unidade. Excluir o projeto exclui as tarefas na mesma operação; nunca sobra uma tarefa sem projeto. **[C]**
- **Cliente e projetos:** a exclusão do cliente é bloqueada enquanto existir um projeto dele. **[C]**
- **Categoria e modelos:** a exclusão da categoria é bloqueada enquanto existir um modelo nela. **[C]**
- **Modelo e arquivo:** o registro do modelo e o arquivo guardado mudam juntos. Um modelo nunca aponta para um arquivo inexistente, e um arquivo nunca fica guardado sem modelo. **[C]**

## 6. Mapa de regras

| Regra | Conceito responsável |
|---|---|
| RN-CRM-01 | Usuário |
| RN-CRM-02 | Projeto (regra de uso) |
| RN-CRM-03 | Projeto (fase) |
| RN-CRM-04 | Projeto (saúde) |
| RN-CRM-05 | Cliente e Projeto |
| RN-CRM-06 | Tarefa |
| RN-CRM-07 | Tarefa (status) |
| RN-CRM-08 | Modelo |
| RN-CRM-09 | Categoria e Modelo |
| RN-CRM-10 | Cliente |
| RN-CRM-11 | Projeto e Tarefa |

## 7. Verificação contra os casos de uso

| Caso de uso | Conceitos envolvidos | Coberto |
|---|---|---|
| UC-CRM-01 Entrar | Usuário | Sim |
| UC-CRM-02 Começar um projeto | Cliente, Projeto | Sim |
| UC-CRM-03 Acompanhar projetos | Projeto (fase, saúde, previsão), Tarefa (atrasada) | Sim |
| UC-CRM-04 Atualizar projeto | Projeto | Sim |
| UC-CRM-05 Kanban (por projeto e geral) | Tarefa | Sim |
| UC-CRM-06 Guardar modelo | Modelo, Categoria | Sim |
| UC-CRM-07 Usar e atualizar modelo | Modelo | Sim |
| UC-CRM-08 Organizar categorias | Categoria | Sim |
