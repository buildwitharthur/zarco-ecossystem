# CRM — contratos da API

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Arquitetura: [../architecture.md](../architecture.md) · Módulos: [../modules.md](../modules.md) · Domínio: [../../../product/domain-model.md](../../../product/domain-model.md)

Legenda: **[C]** decidido · **[H]** proposta, aguardando aprovação

## Fonte oficial

Até a implementação, **estes documentos** são a fonte oficial dos contratos. Na implementação, eles são traduzidos para schemas Zod em `packages/contracts`, que passam a ser a fonte oficial. A partir daí, estes documentos descrevem só as **regras e decisões** de cada endpoint e apontam para o código, sem repetir os formatos (DRY).

A landing não tem contrato de API. A única integração externa dela é o link `wa.me`, definido em [../../landing/routes.md](../../landing/routes.md) §2.

| Módulo | Documento |
|---|---|
| Autenticação e saúde do serviço | [auth.md](auth.md) |
| Clientes | [clients.md](clients.md) |
| Projetos | [projects.md](projects.md) |
| Tarefas | [tasks.md](tasks.md) |
| Modelos e categorias | [templates.md](templates.md) |

---

## 1. Convenções gerais **[C]**

| Item | Convenção |
|---|---|
| Protocolo | REST sobre HTTPS, mesmo domínio da SPA, prefixo `/api` **[C]** |
| Formato | JSON (`application/json; charset=utf-8`). Envio de arquivos em `multipart/form-data`. |
| Nomes de campos | `camelCase`, em inglês, como no código |
| Identificadores | UUID v4 em texto |
| Datas sem horário (prazo, início, previsão) | `"YYYY-MM-DD"` |
| Instantes (criação, atualização, conclusão) | ISO 8601 em UTC (`"2026-10-12T14:03:00.000Z"`) |
| Campos opcionais vazios | `null` na resposta. Na requisição, `null` apaga o valor e um campo ausente não é alterado (PATCH). |
| Textos | Sem espaços nas pontas (o servidor remove). Texto vazio em campo opcional é tratado como `null`. |
| Listagens | Sem paginação: o volume é pequeno (até 5 projetos em andamento; poucos clientes e modelos). Revisitar se alguma lista passar de algumas centenas de itens. |
| Ordenação | Definida em cada endpoint. A SPA pode reordenar para exibição (ex.: a faixa do Início ordena por saúde, TELA-CRM-02). |
| Versionamento | Nenhum. A API tem um único consumidor, no mesmo repositório e implantado junto. Uma mudança que quebra a web é detectada pela verificação de tipos do pacote `contracts` no CI (ADR-0001). |
| Autenticação | Cookie `zarco_session` (JWT, ADR-0003) em todas as rotas, exceto `POST /api/auth/login` e `GET /api/health` **[C]** |

### Valores enumerados

Códigos em inglês na API; os rótulos em português ficam na SPA (navigation.md G8).

| Conceito | Valores da API | Rótulo na interface |
|---|---|---|
| Fase do projeto | `diagnosis` · `design` · `construction` · `validation` · `delivery` · `maintenance` · `completed` · `canceled` | Diagnóstico · Projeto · Construção · Validação · Entrega · Em manutenção · Concluído · Cancelado |
| Saúde | `on_track` · `attention` · `blocked` · `null` | No prazo · Atenção · Bloqueado · Sem avaliação |
| Status da tarefa | `todo` · `doing` · `done` | A fazer · Fazendo · Feito |
| Situação (filtro de projetos) | `active` · `closed` · `all` | Em andamento · Encerrados · Todos |

`active` = fases `diagnosis` a `delivery`, mais `maintenance`. `closed` = `completed` e `canceled` (RN-CRM-03).

## 2. Respostas de sucesso **[C]**

| Situação | Status | Corpo |
|---|---|---|
| Leitura | `200` | O recurso ou `{ "items": [...] }` nas listagens |
| Criação | `201` | O recurso criado |
| Alteração | `200` | O recurso atualizado, já com os efeitos das regras (ex.: saúde apagada no encerramento) |
| Exclusão, login, logout | `204` | Vazio |
| Download | `200` | O arquivo (stream) |

As listagens usam `{ "items": [...] }` em vez de um array solto. Assim, metadados podem ser acrescentados no futuro sem quebrar a web.

## 3. Erros **[C]**

Todos os erros têm o mesmo formato, produzido pelo middleware global a partir de `AppError` (architecture.md §1.3):

```json
{
  "error": {
    "code": "CLIENT_HAS_PROJECTS",
    "message": "Este cliente tem 2 projetos. Exclua ou transfira os projetos antes.",
    "details": { "projectCount": 2 }
  }
}
```

- `code`: identificador estável, em `UPPER_SNAKE_CASE`. **A SPA decide o comportamento pelo `code`, nunca pela `message`.**
- `message`: texto em português, pronto para exibir.
- `details`: opcional, com dados estruturados. Em erros de validação, traz a lista de campos:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Alguns campos estão inválidos.",
    "details": { "fields": [ { "field": "dueDate", "message": "A previsão de entrega não pode ser anterior à data de início." } ] }
  }
}
```

| Status | `code` | Classe | Quando |
|---|---|---|---|
| 400 | `VALIDATION_ERROR` | `ValidationError` | Corpo, parâmetros ou query inválidos (Zod) |
| 401 | `UNAUTHENTICATED` | `UnauthorizedError` | Sem cookie, token inválido ou expirado (a SPA aplica G2) |
| 401 | `INVALID_CREDENTIALS` | `UnauthorizedError` | Login com identificador ou senha incorretos (sem dizer qual) |
| 404 | `<RECURSO>_NOT_FOUND` | `NotFoundError` | Ex.: `PROJECT_NOT_FOUND`, `CLIENT_NOT_FOUND` |
| 404 | `ROUTE_NOT_FOUND` | `NotFoundError` | Endpoint inexistente |
| 409 | `<RECURSO>_NAME_TAKEN` | `ConflictError` | Nome único violado (cliente, categoria, modelo na categoria) |
| 413 | `FILE_TOO_LARGE` | `ValidationError` | Arquivo acima de 20 MB |
| 415 | `UNSUPPORTED_FILE_TYPE` | `ValidationError` | Formato fora de `.docx`, `.xlsx`, `.pptx`, `.pdf` |
| 422 | Específico da regra | `BusinessRuleError` | Regra de negócio violada (ex.: `CLIENT_HAS_PROJECTS`) |
| 429 | `TOO_MANY_ATTEMPTS` | `TooManyRequestsError` | Limite de tentativas de login. Cabeçalho `Retry-After` em segundos. |
| 500 | `INTERNAL_ERROR` | — | Erro inesperado. Mensagem genérica, sem detalhes internos; o erro é registrado em log. |

## 4. Segurança dos contratos **[C]**

- Todas as rotas, exceto login e saúde do serviço, respondem `401 UNAUTHENTICATED` sem cookie válido (CA-CRM-01.1).
- Corpos JSON com no máximo 100 KB; arquivos com no máximo 20 MB.
- Campos desconhecidos no corpo são rejeitados (`VALIDATION_ERROR`), em vez de ignorados, para expor erros de integração cedo.
- Respostas da API usam `Cache-Control: no-store`.
