# Contratos — clientes

> **Estado:** Aprovada (12/10/2026). Convenções e erros: [README.md](README.md).
> Requisitos: RF-CRM-02, RNF-CRM-07 · Regras: RN-CRM-05, RN-CRM-10 · Domínio §4.1 · Telas: TELA-CRM-06, 07, 08

## Recurso `Client`

```json
{
  "id": "uuid",
  "companyName": "Distribuidora Litoral",
  "contactName": "Marina Souza",
  "phone": "(21) 99999-0000",
  "email": "marina@exemplo.com",
  "projectCount": 2,
  "createdAt": "2026-10-12T14:03:00.000Z",
  "updatedAt": "2026-10-12T14:03:00.000Z"
}
```

| Campo | Regra |
|---|---|
| `companyName` | Obrigatório, de 1 a 120 caracteres, único sem diferenciar maiúsculas e minúsculas |
| `contactName` | Opcional, até 120 caracteres |
| `phone` | Opcional, até 30 caracteres, sem formato obrigatório (TELA-CRM-08) |
| `email` | Opcional, formato de e-mail, até 254 caracteres |
| `projectCount` | Só leitura |

## GET /api/clients

`200 { "items": Client[] }`, em ordem alfabética de `companyName`.

## GET /api/clients/:id

`200` com `Client` mais a lista resumida de projetos:

```json
{ "...": "campos de Client", "projects": [ { "id": "uuid", "name": "Sistema de pedidos", "phase": "construction", "health": "blocked" } ] }
```

Erro: `404 CLIENT_NOT_FOUND`.

## POST /api/clients

Corpo: `companyName`, `contactName?`, `phone?`, `email?`. Resposta: `201 Client`.
Erros: `400 VALIDATION_ERROR`, `409 CLIENT_NAME_TAKEN` ("Já existe um cliente com este nome.").

## PATCH /api/clients/:id

Corpo parcial com os mesmos campos. Resposta: `200 Client`.
Erros: `400`, `404 CLIENT_NOT_FOUND`, `409 CLIENT_NAME_TAKEN`.

## DELETE /api/clients/:id

`204`. Os dados pessoais do contato deixam de existir (RNF-CRM-07).
Erros: `404 CLIENT_NOT_FOUND`, `422 CLIENT_HAS_PROJECTS` com `details.projectCount` (RN-CRM-10, CA-TCRM07.1).
