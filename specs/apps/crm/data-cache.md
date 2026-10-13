# CRM — estado do servidor e cache (TanStack Query)

> **Estado:** Rascunho de referência. **Não é pendência:** a estratégia de cache será decidida durante o desenvolvimento do CRM web (decisão de Arthur, 12/10/2026). Nada aqui é obrigatório.
> **Última atualização:** 12/10/2026
> Arquitetura: [architecture.md](architecture.md) §2.3 · Contratos: [contracts/](contracts/README.md)

Legenda: **[C]** decidido por Arthur · **[H]** proposta, aguardando aprovação

## Princípio **[C]**

**Mutações atualizam o cache. Elas não disparam um novo GET.** Criar, editar, mover e excluir aplicam a mudança no cache, de forma otimista quando o resultado é previsível, e confirmam com o recurso devolvido pela API. Um refetch só acontece nos casos listados em §5.

Isso é seguro porque há **um único usuário** e os dados só mudam por esta interface.

## 1. Configuração do QueryClient **[H]**

| Opção | Valor | Motivo |
|---|---|---|
| `staleTime` | 5 min | As mutações mantêm o cache correto. Um refetch frequente só gastaria requisições. |
| `gcTime` | 30 min | Voltar a uma tela já visitada é instantâneo. |
| `refetchOnWindowFocus` | `true`, mas só quando o dado está vencido (`staleTime`) | Cobre o caso de duas abas abertas sem gerar requisições a cada foco. |
| `refetchOnReconnect` | `true` | Depois de queda de rede, o cache pode estar desatualizado. |
| `retry` (consultas) | 1 vez, só em erro de rede ou 5xx; **nunca** em 4xx | Um 401, 404 ou 422 não muda com uma nova tentativa. |
| `retry` (mutações) | 0 | Evita duplicar criações. |
| Erro 401 | Interceptor do Axios: `queryClient.clear()` e redireciona para `/login?voltar=` (G2) | Não deixa dados no cache depois que a sessão expira. |

## 2. Chaves de consulta **[H]**

Centralizadas em `src/lib/query-keys.ts`. Nenhuma chave é escrita à mão nos componentes.

| Chave | Endpoint | Observação |
|---|---|---|
| `['auth', 'me']` | `GET /auth/me` | |
| `['clients']` | `GET /clients` | |
| `['clients', id]` | `GET /clients/:id` | |
| `['projects']` | `GET /projects?status=all` | **Uma única lista.** O filtro de situação (em andamento, encerrados, todos) é aplicado no cliente, porque o volume é pequeno. Uma lista única evita manter três caches coerentes. |
| `['projects', id]` | `GET /projects/:id` | Na lista, `initialData` vem de `['projects']`. |
| `['tasks', 'board']` | `GET /tasks` | Quadro geral |
| `['tasks', 'project', id, { includeAllDone }]` | `GET /tasks?projectId=` | Quadro do projeto |
| `['template-categories']` | `GET /template-categories` | |
| `['templates']` | `GET /templates` | Uma única lista; o filtro por categoria é aplicado no cliente. |

## 3. Funções de atualização do cache **[H]**

Uma tarefa pode aparecer **em dois caches ao mesmo tempo** (o quadro geral e o quadro do projeto). Para isso não virar fonte de divergência, toda alteração de tarefa passa por funções únicas em `src/lib/cache/tasks.ts`, que usam `setQueriesData` com o prefixo `['tasks']` e atualizam todas as listas onde a tarefa está:

- `upsertTask(task)`: insere ou substitui, respeitando o status e a posição.
- `removeTask(id)`
- `removeTasksOfProject(projectId)`

O mesmo padrão vale para projetos (`upsertProject`, `removeProject`) e modelos. **Componentes e hooks de rota não chamam `setQueryData` diretamente.**

## 4. Mutações

| Ação | Otimista | Atualização no sucesso | Também ajusta |
|---|---|---|---|
| Criar tarefa | Sim. Entra no fim de "A fazer" com id temporário. | Troca a temporária pela tarefa devolvida | — |
| Mover tarefa | Sim. Muda de coluna e de posição na hora. | `upsertTask` com a resposta (`position`, `completedAt`) | Se `rebalanced: true`, ver §5 |
| Editar tarefa (título, prazo) | Sim | `upsertTask` | — |
| Excluir tarefa | Sim. Some na hora. | — | `taskCount` do projeto |
| Criar projeto | Não. Espera a resposta, que leva para a página do projeto. | `upsertProject` | `projectCount` do cliente |
| Mudar fase ou saúde | Sim | `upsertProject` | Se o projeto foi encerrado, `removeTasksOfProject` no quadro geral (CA-CRM-06.6) |
| Editar projeto | Não | `upsertProject` | Se o cliente mudou, o `projectCount` dos dois clientes |
| Excluir projeto | Não. Exige confirmação. | `removeProject`, `removeTasksOfProject`, remove `['tasks','project',id]` | `projectCount` do cliente |
| Criar, editar ou excluir cliente | Não | Lista e detalhe | Nome do cliente dentro dos projetos em cache (ao renomear) |
| Enviar, substituir, editar ou excluir modelo | Não. Arquivo grande, com progresso. | Lista de modelos | `templateCount` das categorias |
| Criar, renomear ou excluir categoria | Não | Lista de categorias | Nome da categoria nos modelos em cache (ao renomear) |

**Mutações otimistas seguem sempre o mesmo roteiro:** `cancelQueries` nas chaves afetadas → guardar o estado anterior → aplicar a mudança → em erro, restaurar o estado anterior e mostrar o aviso de erro (patterns §5) → em sucesso, aplicar a resposta do servidor.

**Valores calculados:** "atrasada" é calculada no cliente a partir de `dueDate`, com a mesma função usada pela API, exportada por `packages/contracts` (`isTaskOverdue`). Assim, o cache nunca guarda um "atrasada" desatualizado.

## 5. Quando há refetch (exceções)

| Situação | Ação |
|---|---|
| O `move` devolve `rebalanced: true` (as posições da coluna foram renumeradas no servidor) | Invalidar só as listas de tarefas do projeto afetado |
| Erro `409` ou `422` que indica que o cache está desatualizado (ex.: excluir cliente que, na verdade, tem projetos) | Invalidar a chave do recurso envolvido |
| Login | Buscar `['auth','me']`. As outras consultas carregam conforme as telas são abertas. |
| Logout ou 401 | `queryClient.clear()` |
| Janela volta ao foco ou rede reconecta, com o dado vencido | Comportamento padrão do TanStack Query (§1) |
