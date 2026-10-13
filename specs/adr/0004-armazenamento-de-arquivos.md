# ADR-0004 — Arquivos de modelo em volume persistente

**Estado:** Aceita · **Data:** 12/10/2026

## Contexto

O CRM guarda apenas modelos de documento da Zarco, sem dados de clientes (RN-CRM-08), com até 20 MB cada e em pequena quantidade. Os arquivos precisam ficar fora do Git (CA-CRM-02N.5) e só podem ser baixados por quem está autenticado (CA-CRM-02N.4).

## Alternativas

| Alternativa | A favor | Contra |
|---|---|---|
| **A. Volume persistente do Coolify montado no `crm-api`** | Zero dependências externas e zero custo. É o mais simples. | Os arquivos ficam só na VPS. Perda total se a VPS falhar, já que não há backup (RNF-CRM-03 fora do escopo). |
| B. Armazenamento de objetos S3 compatível (R2, B2) | Durável e fora da VPS | Uma conta e uma dependência a mais. Acesso por SDK. |
| C. Arquivo no PostgreSQL (`bytea`) | Um único lugar para fazer backup | Banco inchado. Não é recomendado para arquivos. |

## Decisão

Alternativa **A**. O acesso ao disco fica atrás de um contrato `FileStorage` (gravar, ler como stream, remover), usado pelos use cases de `templates`. Assim, migrar para B mais tarde só exige trocar a implementação, seguindo o mesmo raciocínio do ADR-0002.

## Consequências

- Os modelos têm originais versionados em `assets/documents/`, então uma perda do volume pode ser recuperada manualmente, enviando os arquivos de novo.
- Não há backup (RNF-CRM-03 fora do escopo). Se isso mudar, avaliar mover os arquivos para um armazenamento S3 compatível (alternativa B).
