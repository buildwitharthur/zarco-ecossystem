# Casos de uso

> **Estado:** Landing page aprovada (12/10/2026) · CRM aprovado (12/10/2026)
> **Última atualização:** 12/10/2026
> Requisitos: [requirements.md](requirements.md) · Regras: [business-rules.md](business-rules.md)

Legenda: **[C]** confirmado · **[H]** proposta, aguardando aprovação

---

## 1. Landing page

### UC-LP-01 — Iniciar conversa pelo WhatsApp **[C]**

| Item | Descrição |
|---|---|
| Ator | Visitante (dono ou gestor de pequena ou média empresa) |
| Objetivo | Entender se a Zarco resolve o seu tipo de problema e iniciar uma conversa |
| Origem do visitante | Busca orgânica, link compartilhado ou digitação direta do endereço |
| Pré-condição | Nenhuma; o visitante não se identifica |
| Requisitos | RF-LP-01 a 07, RNF-LP-01 a 05 |
| Regras | RN-LP-01 a 06 |

**Fluxo principal (celular)**

1. O visitante abre a página.
2. Na primeira tela, entende o que a Zarco faz e vê o botão "Converse sobre o seu caso".
3. Se quiser, rola a página para ver os problemas, os serviços, o processo e os motivos para contratar.
4. Aciona "Converse sobre o seu caso".
5. O aplicativo do WhatsApp abre na conversa com a Zarco, com a mensagem pré-preenchida.
6. O visitante envia a mensagem, editada ou não.

**Fluxos alternativos**

- **A1 — Decide já na primeira tela:** o visitante pula o passo 3.
- **A2 — No computador:** no passo 5, abre o WhatsApp Web ou o aplicativo de desktop, com a mensagem pré-preenchida.
- **A3 — Prefere salvar o contato:** o visitante copia ou anota o número exibido em texto (CA-LP-06.5).

**Exceções**

- **E1 — Sem WhatsApp instalado no celular:** o link leva à página do WhatsApp, que oferece instalar o aplicativo ou abrir a versão web. O número continua visível na página (CA-LP-06.5).
- **E2 — O visitante não envia a mensagem:** nenhum dado é registrado e o contato não acontece. Isso é esperado, porque a página não coleta dados (RNF-LP-07).

**Pós-condição:** a conversa existe no WhatsApp da Zarco, identificada como vinda do site pela mensagem pré-preenchida (quando o visitante não a apaga).

### UC-LP-02 — Compartilhar a página **[C]**

| Item | Descrição |
|---|---|
| Ator | Visitante ou Arthur |
| Objetivo | Enviar o endereço da página a outra pessoa |
| Requisitos | RF-LP-08 |

**Fluxo principal**

1. O ator cola o endereço da página em uma conversa ou publicação.
2. A plataforma exibe uma prévia com título, descrição e imagem da Zarco.

### UC-LP-03 — Atualizar o conteúdo da página **[C]**

| Item | Descrição |
|---|---|
| Ator | Arthur |
| Objetivo | Mudar um texto, o número do WhatsApp ou a mensagem pré-preenchida |
| Requisitos | RNF-LP-09 |

**Fluxo principal**

1. Arthur altera o conteúdo no lugar em que ele é definido.
2. Arthur publica a nova versão.
3. A página atualizada fica disponível no domínio.

O "como" (edição de arquivo, painel, outro meio) será definido na Etapa 08. Um painel de edição não está previsto (YAGNI).

---

## 2. CRM

Ator em todos os casos: **Arthur**, com login ativo (exceto UC-CRM-01).

### UC-CRM-01 — Entrar no CRM **[C]**

Requisitos: RF-CRM-01 · Regras: RN-CRM-01

1. Arthur acessa o endereço do CRM.
2. Informa as credenciais.
3. Vê a visão geral dos projetos.

- **E1 — Credenciais inválidas:** mensagem de erro genérica, sem indicar qual dado está errado.
- **E2 — Tentativas demais:** novas tentativas ficam bloqueadas temporariamente (CA-CRM-01.3).

### UC-CRM-02 — Começar um projeto **[C]**

Requisitos: RF-CRM-02, RF-CRM-03 · Regras: RN-CRM-02, RN-CRM-05

Gatilho: o cliente aprovou a proposta.

1. Arthur cadastra o projeto, informando nome, cliente e fase (normalmente Diagnóstico).
2. Preenche, se já souber, datas e links.
3. O projeto aparece na visão geral.

- **A1 — Cliente ainda não cadastrado:** Arthur cadastra o cliente (empresa e contato) e volta ao cadastro do projeto, sem perder o que já preencheu. **[C]**

### UC-CRM-03 — Acompanhar os projetos **[C]**

Requisitos: RF-CRM-05 · Regras: RN-CRM-03, RN-CRM-04

1. Arthur abre a visão geral.
2. Identifica os projetos com atenção ou bloqueados e os prazos próximos.
3. Abre um projeto para ver os detalhes, as tarefas e os links.

### UC-CRM-04 — Atualizar fase, saúde ou dados do projeto **[C]**

Requisitos: RF-CRM-03, RF-CRM-04 · Regras: RN-CRM-03, RN-CRM-04

1. Arthur abre o projeto.
2. Altera a fase, a saúde, as datas ou os links.
3. A visão geral reflete a mudança.

- **A1 — Encerramento:** Arthur muda a fase para Em manutenção, Concluído ou Cancelado. Se for Concluído ou Cancelado, o projeto sai da visão padrão (CA-CRM-05.2).

### UC-CRM-05 — Gerenciar tarefas no kanban **[C]**

Requisitos: RF-CRM-06 · Regras: RN-CRM-06, RN-CRM-07

1. Arthur abre o quadro de tarefas do projeto ou o quadro geral.
2. Cria uma tarefa com título e, se quiser, prazo. No quadro geral, também escolhe o projeto. Ela entra no fim de "A fazer".
3. Move a tarefa entre colunas conforme o andamento.
4. Edita ou exclui tarefas quando necessário.

### UC-CRM-06 — Guardar um modelo de documento **[C]**

Requisitos: RF-CRM-07 · Regras: RN-CRM-08, RN-CRM-09

1. Arthur escolhe o arquivo, dá um nome e escolhe a categoria.
2. O modelo aparece na lista, na categoria escolhida.

- **E1 — Formato ou tamanho não aceito:** o envio é recusado com uma mensagem que diz o motivo e os limites.

### UC-CRM-07 — Usar e atualizar um modelo **[C]**

Requisitos: RF-CRM-07 · Regras: RN-CRM-08

1. Arthur baixa o modelo.
2. Edita no Word, fora do CRM.
3. Se o modelo mudou, envia a nova versão, que substitui a anterior.

- **A1 — Uso para um cliente:** o documento preenchido fica fora do CRM (RN-CRM-08).

### UC-CRM-08 — Organizar categorias **[C]**

Requisitos: RF-CRM-08 · Regras: RN-CRM-09

1. Arthur cria, renomeia ou exclui uma categoria.

- **E1 — Categoria com modelos:** a exclusão é recusada, com a indicação de quantos modelos precisam ser movidos ou excluídos antes.
