# Contratos — tarefas

> **Estado:** Aprovada (12/10/2026). Convenções e erros: [README.md](README.md).
> Requisitos: RF-CRM-06, CA-CRM-06.x · Regras: RN-CRM-06, RN-CRM-07 · Domínio §4.3 · Componente: quadro de tarefas (navigation.md §4)

## Recurso `Task`

```json
{
  "id": "uuid",
  "title": "Tela de conferência de pedidos",
  "status": "doing",
  "dueDate": "2026-10-17",
  "completedAt": null,
  "position": 3,
  "isOverdue": false,
  "project": { "id": "uuid", "name": "Sistema de pedidos" },
  "createdAt": "…",
  "updatedAt": "…"
}
```

| Campo | Regra |
|---|---|
| `title` | Obrigatório, de 1 a 300 caracteres |
| `status` | `todo`, `doing` ou `done`. Começa em `todo`. Só muda pela rota de movimentação. |
| `dueDate` | Opcional, data sem horário |
| `completedAt` | Só leitura. Preenchido ao entrar em `done` e apagado ao sair (domínio §4.3) |
| `position` | Só leitura. Ordem dentro da coluna, crescente. O valor em si não tem significado para a SPA. |
| `isOverdue` | Só leitura. `dueDate < hoje` e `status ≠ done`. "Hoje" no fuso `America/Sao_Paulo` **[C]** |
| `project` | Definido na criação. Não muda depois (domínio §4.3). |

## GET /api/tasks

| Parâmetro | Uso |
|---|---|
| `projectId` (opcional) | Ausente: **quadro geral**, só com tarefas de projetos em andamento (CA-CRM-06.6). Presente: **quadro do projeto**, de qualquer projeto. |
| `includeAllDone` (opcional, `true`) | Só com `projectId`. Inclui as concluídas há mais de 14 dias (CA-CRM-06.8). |

Sem `includeAllDone`, as tarefas `done` vêm só se `completedAt` estiver dentro dos últimos 14 dias (CA-CRM-06.7).

Resposta: `200 { "items": Task[], "hiddenDoneCount": 0 }`. `hiddenDoneCount` é o número de concluídas omitidas, usado no botão "Mostrar todas as concluídas (N)". Ordem: por `status` (`todo`, `doing`, `done`) e depois por `position`.

Erro: `404 PROJECT_NOT_FOUND` quando `projectId` não existe.

## POST /api/tasks

Corpo: `projectId`, `title`, `dueDate?`. Resposta: `201 Task`, com `status: "todo"` no fim da coluna (UX C2).
Erro: `404 PROJECT_NOT_FOUND`.

## PATCH /api/tasks/:id

Corpo parcial: `title?`, `dueDate?` (`null` apaga). Status e posição **não** mudam por aqui. Resposta: `200 Task`.
Erro: `404 TASK_NOT_FOUND`.

## POST /api/tasks/:id/move

Uma única operação cobre arrastar entre colunas, reordenar e "Subir/Descer" (patterns §6).

```json
{ "status": "done", "beforeTaskId": "uuid-da-tarefa-que-fica-depois" }
```

| Campo | Regra |
|---|---|
| `status` | Coluna de destino |
| `beforeTaskId` | Tarefa diante da qual a movida é inserida, na coluna de destino. `null` = fim da coluna. Precisa pertencer ao **mesmo projeto** e à coluna de destino. |

Resposta: `200 Task`, com `status`, `position` e `completedAt` atualizados. A forma de calcular as posições é um detalhe de implementação. Uma estratégia de posições espaçadas foi discutida junto com o cache e ficou adiada ([data-cache.md](../data-cache.md)).

Erros: `404 TASK_NOT_FOUND`, `422 INVALID_MOVE_TARGET` (`beforeTaskId` de outro projeto ou de outra coluna).

**Ordem no quadro geral:** como a ordem é guardada por projeto e por coluna, o quadro geral mostra as tarefas agrupadas na sequência de cada projeto. A ordem manual vale dentro de cada projeto **[C]**.

## DELETE /api/tasks/:id

`204`. Erro: `404 TASK_NOT_FOUND`.
