# Contratos — projetos

> **Estado:** Aprovada (12/10/2026). Convenções e erros: [README.md](README.md).
> Requisitos: RF-CRM-03, RF-CRM-04, RF-CRM-05 · Regras: RN-CRM-02 a 05, RN-CRM-11 · Domínio §4.2 · Telas: TELA-CRM-02 a 05

## Recurso `Project`

```json
{
  "id": "uuid",
  "name": "Sistema de pedidos",
  "client": { "id": "uuid", "companyName": "Distribuidora Litoral" },
  "phase": "construction",
  "health": "blocked",
  "startDate": "2026-09-01",
  "dueDate": "2026-11-06",
  "links": {
    "production": "https://pedidos.exemplo.com",
    "repository": null,
    "documentation": null
  },
  "taskCount": 12,
  "createdAt": "…",
  "updatedAt": "…"
}
```

| Campo | Regra |
|---|---|
| `name` | Obrigatório, de 1 a 120 caracteres, pode repetir (domínio §4.2) |
| `clientId` (entrada) / `client` (saída) | Obrigatório. O cliente precisa existir. |
| `phase` | Obrigatório. Padrão na criação: `diagnosis` |
| `health` | `on_track`, `attention`, `blocked` ou `null`. Começa `null`. |
| `startDate`, `dueDate` | Opcionais. Se houver os dois, `dueDate ≥ startDate`. |
| `links.*` | Opcionais, URL `http` ou `https`, até 2.000 caracteres |
| `taskCount` | Só leitura. Usado na confirmação de exclusão (CA-TCRM04.3). |

**Regras aplicadas pelo servidor**

- Se `phase` passar a `completed` ou `canceled`, `health` vira `null` automaticamente (domínio §4.2). A resposta já traz o valor atualizado.
- Enviar `health` diferente de `null` para um projeto encerrado, ou junto com uma fase de encerramento, gera `422 HEALTH_NOT_ALLOWED_WHEN_CLOSED`.

## GET /api/projects?status=active|closed|all

`status` padrão: `active`. Resposta: `200 { "items": Project[] }`.
Ordem: `dueDate` crescente, com os sem previsão no fim. Em `closed`, ordem alfabética por `name` (TELA-CRM-03).

## GET /api/projects/:id

`200 Project`. Erro: `404 PROJECT_NOT_FOUND`.

## POST /api/projects

Corpo: `name`, `clientId`, `phase?`, `health?`, `startDate?`, `dueDate?`, `links?` (objeto com qualquer um dos três).
Resposta: `201 Project`.
Erros: `400 VALIDATION_ERROR` (inclui previsão anterior ao início), `404 CLIENT_NOT_FOUND`, `422 HEALTH_NOT_ALLOWED_WHEN_CLOSED`.

## PATCH /api/projects/:id

Corpo parcial com os mesmos campos. Usado tanto pelo formulário quanto pelos seletores de fase e saúde na página do projeto (UX C4). Resposta: `200 Project`.
Erros: `400`, `404 PROJECT_NOT_FOUND`, `404 CLIENT_NOT_FOUND`, `422 HEALTH_NOT_ALLOWED_WHEN_CLOSED`.

## DELETE /api/projects/:id

`204`. Apaga também as tarefas, na mesma transação (RN-CRM-11).
Erro: `404 PROJECT_NOT_FOUND`.
