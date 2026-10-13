# CRM — módulos da API

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Arquitetura: [architecture.md](architecture.md) · Domínio: [../../product/domain-model.md](../../product/domain-model.md)

Os módulos seguem as áreas do domínio (domain-model §3). Cada módulo é independente: não importa a implementação (Prisma) nem o controller de outro módulo. Quando um use case precisa de dados de outro módulo (ex.: impedir a exclusão de um cliente com projetos), ele recebe o contrato de repositório necessário por composição explícita.

---

## 1. Estrutura de um módulo **[C]**

```text
src/modules/projects/
├── projects.routes.ts              rotas + composição explícita (repo → use cases → controller)
├── projects.controller.ts
├── projects.repository.ts          contrato (interface) usado pelos use cases
├── prisma-projects.repository.ts   implementação com Prisma
└── use-cases/
    ├── create-project.ts
    ├── update-project.ts
    ├── change-project-phase.ts
    └── …
```

Nomes de arquivo em inglês e kebab-case. Textos de interface em português **[C]**.

## 2. Módulos

| Módulo | Conceitos | Use cases principais | Regras |
|---|---|---|---|
| `auth` | Usuário | login, logout, sessão atual | RN-CRM-01, CA-CRM-01.x |
| `clients` | Cliente | listar, detalhar (com projetos), criar, editar, excluir | RN-CRM-05, RN-CRM-10, domínio §4.1 |
| `projects` | Projeto | listar (por situação), detalhar, criar, editar, mudar fase, mudar saúde, excluir (com tarefas) | RN-CRM-02 a 05, RN-CRM-11, domínio §4.2 |
| `tasks` | Tarefa | listar (quadro geral ou por projeto, regra dos 14 dias), criar, editar, mover (status + ordem), excluir | RN-CRM-06, RN-CRM-07, CA-CRM-06.x, domínio §4.3 |
| `templates` | Modelo, Categoria | listar, enviar, baixar, substituir arquivo, editar, excluir; categorias: listar, criar, renomear, excluir | RN-CRM-08, RN-CRM-09, domínio §4.4 e §4.5 |

## 3. Dependências entre módulos

| Use case | Precisa de | Motivo |
|---|---|---|
| `clients/delete-client` | contrato de `projects` (contar projetos do cliente) | RN-CRM-10 |
| `projects/delete-project` | contrato de `tasks` (contar e apagar tarefas) | RN-CRM-11, na mesma transação |
| `tasks/create-task` | contrato de `projects` (verificar se o projeto existe) | RN-CRM-06 |
| `templates/delete-category` | contrato de modelos (contar modelos na categoria) | RN-CRM-09 |

**Transações [C]:** operações que alteram mais de um conceito (excluir projeto e tarefas) são executadas pelo repositório em uma única transação do Prisma. O contrato expõe uma operação com o significado de negócio (`deleteWithTasks`). Não existe um "unit of work" genérico (YAGNI).
