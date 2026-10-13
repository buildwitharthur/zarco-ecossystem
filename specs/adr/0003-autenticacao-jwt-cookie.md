# ADR-0003 — Autenticação por JWT em cookie httpOnly

**Estado:** Aceita · **Data:** 12/10/2026

## Contexto

Há um único usuário (RN-CRM-01), sessão curta de 8 horas (CA-CRM-01.5), limite de tentativas de login (CA-CRM-01.3) e nenhuma recuperação de senha pela interface. A SPA e a API ficam no mesmo domínio ([apps/README.md](../apps/README.md) §3).

## Alternativas

| Alternativa | A favor | Contra |
|---|---|---|
| **A. JWT assinado em cookie `httpOnly`** | Sem estado no servidor. O token não fica acessível ao JavaScript, o que protege contra roubo por XSS. Decisão de Arthur. | Não pode ser revogado antes de expirar sem uma lista de bloqueio. |
| B. Sessão guardada no banco, em cookie `httpOnly` | Revogação imediata | Uma tabela e uma consulta a mais em cada requisição |
| C. JWT no `localStorage` com cabeçalho `Authorization` | Comum em SPAs | Exposto a XSS. Descartado. |

## Decisão

Alternativa **A**, decidida por Arthur:

- Token HS256 com `sub` (id do usuário) e `exp` de 8 horas. Segredo em `JWT_SECRET`.
- Cookie `httpOnly`, `Secure`, `SameSite=Strict`, `Path=/api`, com validade igual à do token.
- Não há token de renovação. Quando expira, Arthur faz login de novo, e a SPA o leva de volta à rota em que estava (G2).
- Logout apaga o cookie.
- A proteção contra CSRF vem do `SameSite=Strict` mais o mesmo domínio. Requisições que alteram dados exigem `Content-Type: application/json` ou `multipart/form-data`, vindas da própria origem.
- O usuário é criado e tem a senha alterada só por comando de terminal. Senha com hash argon2id (proposta).

## Consequências

- Um token vazado vale até expirar (no máximo 8 horas). Esse risco é aceitável para um único usuário com sessão curta. Se for preciso derrubar sessões, a troca de `JWT_SECRET` invalida todos os tokens.
- Se a SPA e a API forem para domínios diferentes no futuro, esta decisão precisa ser revista (CORS e `SameSite`).
