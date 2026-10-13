# ADR-0002 — Camadas da API: Controller → Use Case → Repository

**Estado:** Aceita · **Data:** 12/10/2026

## Contexto

Arthur quer regras de negócio independentes de framework HTTP, ORM e banco de dados, com responsabilidades claras e sem abstrações excessivas. O domínio do CRM é pequeno: cinco conceitos (domain-model §1), mas com regras reais (exclusões bloqueadas, saúde apagada no encerramento, data de conclusão automática, ordenação manual).

## Alternativas

| Alternativa | A favor | Contra |
|---|---|---|
| **A. Controller → Use Case → contrato de Repository → implementação Prisma**, composição explícita | Regras testáveis e independentes do Prisma. Cada camada tem um papel claro. É o padrão que Arthur já domina. | Um contrato com uma única implementação por módulo. Mais arquivos por funcionalidade. |
| B. Controller → Service usando Prisma diretamente | Menos arquivos | Regras acopladas ao Prisma. Contraria o objetivo declarado. |
| C. Clean/Hexagonal completa (entidades ricas, portas e adaptadores, unit of work) | Desacoplamento máximo | Complexidade desproporcional para cinco conceitos e um usuário. |

## Decisão

Alternativa **A**, decidida por Arthur, com estas regras:

1. O controller valida a entrada com os schemas de `contracts`, chama **um** use case e monta a resposta. Não tem regra de negócio nem acesso ao Prisma.
2. O use case contém as regras e só conhece **contratos** de repositório e erros da aplicação.
3. O repositório Prisma é o único lugar que importa o Prisma Client.
4. **Composição explícita no arquivo de rotas do módulo, sem factories nem contêiner de injeção de dependências.**
5. Erros: `AppError` e subclasses, convertidos por um middleware global.

## Justificativa do contrato com uma única implementação

O contrato existe para permitir **trocar a persistência sem alterar as regras de negócio**, um objetivo explícito de Arthur. Não é uma convenção a ser replicada em outros lugares. Novas interfaces só devem ser criadas quando houver um motivo concreto equivalente.

## Consequências

- Testes de integração (Supertest) cobrem a pilha inteira com banco real. Testes unitários de use cases são possíveis, mas não obrigatórios (Etapa 10).
- Agentes de código **não** devem acessar o Prisma em controllers ou use cases, nem introduzir factories ou contêineres de injeção de dependências.
