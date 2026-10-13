# Contratos — autenticação e saúde do serviço

> **Estado:** Aprovada (12/10/2026). Convenções e erros: [README.md](README.md).
> Requisitos: RF-CRM-01, CA-CRM-01.x · Decisão: [ADR-0003](../../../adr/0003-autenticacao-jwt-cookie.md) · Tela: TELA-CRM-01

## POST /api/auth/login

Pública.

**Requisição**

```json
{ "email": "arthur@exemplo.com", "password": "••••••••" }
```

| Campo | Regra |
|---|---|
| `email` | Obrigatório, formato de e-mail. É o identificador de login **[C]**. |
| `password` | Obrigatório, de 1 a 200 caracteres |

**Respostas**

| Status | Situação |
|---|---|
| `204` | Credenciais válidas. `Set-Cookie: zarco_session=<jwt>; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=28800` |
| `400 VALIDATION_ERROR` | Campos ausentes ou mal formados |
| `401 INVALID_CREDENTIALS` | E-mail ou senha incorretos, sem indicar qual (CA-TCRM01.1) |
| `429 TOO_MANY_ATTEMPTS` | Mais de **5 tentativas erradas em 15 minutos** pelo mesmo IP. Bloqueio de 15 minutos, com `Retry-After` **[C]** |

## POST /api/auth/logout

Autenticada. `204` e `Set-Cookie` que apaga `zarco_session`. Também responde `204` quando já não há sessão, para que o logout nunca falhe.

## GET /api/auth/me

Autenticada. Usada pela SPA ao carregar, para saber se existe sessão (G1).

```json
{ "id": "5f0c…", "email": "arthur@exemplo.com", "sessionExpiresAt": "2026-10-12T22:03:00.000Z" }
```

`401 UNAUTHENTICATED` quando não há sessão válida.

## GET /api/health

Pública. Usada pelo Coolify e pelo CI para verificar se o serviço está no ar.

```json
{ "ok": true }
```

Na I0 não verifica o banco (decisão de Arthur, 13/10/2026). O schema está em `packages/contracts` (`healthResponseSchema`).

## Comando administrativo (fora da API)

`pnpm --filter crm-api user:set-password --email <e-mail>`: cria o usuário único, se ainda não existir, ou troca a senha. A senha é pedida no terminal, sem aparecer na tela. Não existe rota HTTP equivalente (TELA-CRM-01).
