# Contratos — modelos e categorias

> **Estado:** Aprovada (12/10/2026). Convenções e erros: [README.md](README.md).
> Requisitos: RF-CRM-07, RF-CRM-08, CA-CRM-02N.4/5 · Regras: RN-CRM-08, RN-CRM-09 · Domínio §4.4, §4.5 · Decisão: [ADR-0004](../../../adr/0004-armazenamento-de-arquivos.md) · Tela: TELA-CRM-09

## Recurso `TemplateCategory`

```json
{ "id": "uuid", "name": "Contrato", "templateCount": 3 }
```

`name`: obrigatório, de 1 a 60 caracteres, único sem diferenciar maiúsculas e minúsculas.

### GET /api/template-categories

`200 { "items": TemplateCategory[] }`, em ordem alfabética. Inclui as categorias vazias, porque a gestão de categorias (OV-05) precisa delas.

### POST /api/template-categories

Corpo `{ "name": "…" }`. `201`. Erro: `409 CATEGORY_NAME_TAKEN`.

### PATCH /api/template-categories/:id

Corpo `{ "name": "…" }`. `200`. Erros: `404 CATEGORY_NOT_FOUND`, `409 CATEGORY_NAME_TAKEN`.

### DELETE /api/template-categories/:id

`204`. Erros: `404 CATEGORY_NOT_FOUND`, `422 CATEGORY_HAS_TEMPLATES` com `details.templateCount` (RN-CRM-09).

As nove categorias iniciais (CA-CRM-08.1) são criadas pelo *seed* do banco, não por uma rota.

## Recurso `Template`

```json
{
  "id": "uuid",
  "name": "Contrato base",
  "category": { "id": "uuid", "name": "Contrato" },
  "file": { "originalName": "Zarco - Contrato Base.docx", "format": "docx", "sizeBytes": 48213 },
  "updatedAt": "2026-10-12T14:03:00.000Z"
}
```

`name`: obrigatório, de 1 a 120 caracteres, único dentro da categoria.

### GET /api/templates?categoryId=

`200 { "items": Template[] }`, ordenados pelo nome da categoria e depois pelo nome do modelo. Com `categoryId`, só os modelos daquela categoria.

### POST /api/templates

`multipart/form-data` com os campos `file`, `name` e `categoryId`. Resposta: `201 Template`.

| Validação | Erro |
|---|---|
| Extensão e tipo: `.docx`, `.xlsx`, `.pptx`, `.pdf`, conferindo extensão e assinatura do arquivo | `415 UNSUPPORTED_FILE_TYPE` |
| Até 20 MB | `413 FILE_TOO_LARGE` |
| Categoria existe | `404 CATEGORY_NOT_FOUND` |
| Nome único na categoria | `409 TEMPLATE_NAME_TAKEN` |

Se qualquer etapa falhar, nada é salvo: nem o registro nem o arquivo (domínio §5).

### PATCH /api/templates/:id

JSON com `name?` e `categoryId?`. `200 Template`. Erros: `404 TEMPLATE_NOT_FOUND`, `404 CATEGORY_NOT_FOUND`, `409 TEMPLATE_NAME_TAKEN`.

### PUT /api/templates/:id/file

`multipart/form-data` com o campo `file`. Substitui o arquivo e mantém nome e categoria (RN-CRM-08). O formato pode mudar entre os aceitos. `200 Template`, com `updatedAt` novo. Mesmas validações de arquivo do envio. O arquivo anterior só é removido depois que o novo foi gravado.

### GET /api/templates/:id/download

`200` com o arquivo original, sem alterações (CA-TCRM09.2):

- `Content-Type` do formato;
- `Content-Disposition: attachment; filename*=UTF-8''<nome original codificado>`;
- `Cache-Control: no-store`.

Exige sessão (CA-CRM-02N.4). Como o cookie tem `Path=/api`, um link comum `<a href="/api/templates/:id/download">` funciona sem JavaScript.
Erro: `404 TEMPLATE_NOT_FOUND`.

### DELETE /api/templates/:id

`204`. Remove registro e arquivo. Erro: `404 TEMPLATE_NOT_FOUND`.
