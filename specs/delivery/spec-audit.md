# Auditoria final das especificações (Etapa 12)

> **Estado:** Aprovada (12/10/2026).
> **Data:** 12/10/2026
> **Escopo:** todos os documentos de `specs/`, os protótipos oficiais e a nota em `assets/README.md`.

## 1. Método

1. Busca automática por termos de decisões superadas (Z 3D, tema claro, IBM Plex, raio 0, `NN / ROTULO`, seções removidas, GHCR, webhooks, backup, versões de protótipo) e por marcadores **[H]** ou "Em revisão" ainda abertos.
2. Revisão cruzada manual: requisitos ↔ regras ↔ casos de uso ↔ domínio ↔ contratos de tela ↔ contratos de API ↔ arquitetura ↔ estratégia de qualidade ↔ plano.
3. Conferência do texto do protótipo da landing contra as regras de comunicação (RN-LP-01 a 04 e o vocabulário do briefing): sem "nós", "nossa equipe", "especialistas", "soluções", "inovação"; sem números ou clientes inventados.

## 2. Correções feitas nesta etapa

| # | Problema encontrado | Correção |
|---|---|---|
| A1 | O design system (fundamentos, componentes e padrões) descrevia a v1 rejeitada: tema claro, Plex, raio 0 | **Reescrito** a partir dos protótipos oficiais. Resolve a pendência P1, que bloqueava a implementação das interfaces. |
| A2 | `visual-dna.md` e `brand-audit.md` contradiziam o design system | Marcados como **documentos históricos**, com o link para as fontes vigentes |
| A3 | O contrato TELA-LP-01 descrevia a estrutura antiga, com Z 3D e sem as seções novas | Seções S1–S10, comportamentos B1–B8 e critérios CA-TLP01.1–7 **reescritos** para a direção aprovada |
| A4 | A §1 da análise de UX (landing) tinha recomendações superadas, como a L8 (sem perguntas frequentes) | Aviso no topo indicando o que continua valendo e o que foi revertido |
| A5 | Os fluxos da landing citavam seções removidas | Fluxos atualizados para a nova ordem |
| A6 | A arquitetura da landing listava o componente Z3D | Lista de componentes, fontes e orçamento de JavaScript atualizados |
| A7 | O plano de implementação citava a v7 e o Z 3D, e a P1 aparecia aberta | L1 aponta para TELA-LP-01 e para o protótipo oficial; P1 resolvida; risco do Z trocado pelo da demonstração |
| A8 | A visão geral citava o Brand System v1 e o IBM Plex como regra visual | Aponta para o design system |
| A9 | O título do ADR-0005 citava o GHCR | Corrigido: CI no GitHub Actions, implantação pelo Coolify |
| A10 | A demonstração usa nomes fictícios de estabelecimentos | A RN-LP-01 agora exige o selo "Ilustração do método. Não representa um cliente." sempre que houver um exemplo ilustrativo |
| A11 | O índice dava ao `assets/README.md` o papel de fonte das regras visuais | Hierarquia de fontes explícita: briefing (estratégia e paleta) → design system (interface) → assets (arquivos) |
| A12 | O `assets/README.md` continuava prescrevendo regras de interface antigas, o que pode confundir agentes de código | Aviso no topo do arquivo, sem alterar o conteúdo (revisão da marca toda decidida por Arthur) |
| A13 | A estratégia de qualidade não cobria os critérios novos da landing | Checklist manual inclui pausa pelo teclado, movimento reduzido, 320–1920 px e revisão das perguntas |
| A14 | O cabeçalho do Início no protótipo do CRM ("Bom dia, Arthur") não estava no contrato | TELA-CRM-02 atualizada, seguindo o protótipo aprovado |
| A15 | Faltava definir como a fase "Em manutenção" aparece no cartão de projeto | Definido em components.md: barra completa com o rótulo da fase |

## 3. Rastreabilidade (amostra verificada)

| Requisito | Regra | Caso de uso | Tela | API | Teste |
|---|---|---|---|---|---|
| RF-LP-06 Contato | RN-LP-05 | UC-LP-01 | TELA-LP-01 S2, S7, S9, B1 | — (link `wa.me`) | Checklist manual (strategy §3.3) |
| RF-LP-04 Processo | RN-LP-01 | UC-LP-01 | S5, B7 | — | CA-TLP01.3 e .6 (manual) |
| RF-CRM-01 Acesso | RN-CRM-01 | UC-CRM-01 | TELA-CRM-01, G1, G2 | `auth.md` | Integração: auth (strategy §3.1) |
| RF-CRM-03/04 Projetos | RN-CRM-02 a 05, 11 | UC-CRM-02 a 04 | TELA-CRM-03 a 05 | `projects.md` | Integração: projects |
| RF-CRM-06 Tarefas | RN-CRM-06, 07 | UC-CRM-05 | Quadro (navigation §4), TELA-CRM-02/04 | `tasks.md` | Integração: tasks |
| RF-CRM-07/08 Modelos | RN-CRM-08, 09 | UC-CRM-06 a 08 | TELA-CRM-09, OV-03 a 05 | `templates.md` | Integração: templates |

Todos os endpoints dos contratos têm um módulo dono (modules.md) e casos de teste obrigatórios (strategy §3.1). Todas as regras RN-CRM estão mapeadas para um conceito do domínio (domain-model §6).

## 4. Decisões que permanecem como risco aceito

| Item | Decisão | Registro |
|---|---|---|
| Sem backup do CRM | Fora do escopo | RNF-CRM-03, overview §7, strategy R8 |
| Sem homologação | Só local, CI e produção | strategy §5 |
| Implantação pelo Coolify sem aguardar o CI | Mitigado pela proteção da `main` | ADR-0005 |
| Token JWT irrevogável antes de 8 horas | Aceito para um único usuário | ADR-0003 |

## 5. Pendências restantes

| # | Pendência | Bloqueia | Quando |
|---|---|---|---|
| P2 | Texto final da landing e termos de busca | **Publicação da landing (L2)** | Com a landing implementada |
| P8 | **Revisar as 6 respostas das perguntas** (preço, prazo, porte, "não preciso de sistema", código, manutenção) | **L2** | Antes de publicar |
| P9 | A imagem de compartilhamento (`assets/social/open-graph/zarco-og.png`) segue o visual antigo (claro, Plex) | Não (RF-LP-08 é S) | Junto com P6 |
| P5 | Atualizar por completo as regras do `assets/README.md` | Não | Revisão da marca |
| P6 | Refazer as peças de `assets/` (redes sociais, documentos, apresentação) | Não; fora do software | Revisão da marca |
| P7 | Consulta ao INPI | Não | Antes do lançamento público |
| — | Estratégia de cache do TanStack Query | Não | Durante C4 (decisão de Arthur) |
| ~~—~~ | `AGENTS.md` criado com autorização de Arthur (12/10/2026) | — | — |

**Nenhuma pendência bloqueia o primeiro incremento (I0, fundação).** Também não há bloqueio para L1 (landing) nem para C1–C5 (CRM).

## 6. Critérios de conclusão do processo

| Critério | Situação |
|---|---|
| Requisitos necessários aprovados | ✅ |
| Regras de negócio relevantes definidas | ✅ |
| Fluxos críticos claros | ✅ |
| Contratos necessários especificados | ✅ Telas e API |
| Decisões arquiteturais fundamentais aprovadas | ✅ ADR-0001 a 0005 |
| Padrões de desenvolvimento definidos | ✅ Camadas, erros, testes, lint, organização por rota |
| Design visual validado | ✅ Protótipos oficiais |
| Estratégia de testes estabelecida | ✅ |
| Plano de implementação organizado | ✅ |
| Nenhuma pendência bloqueante para o primeiro incremento | ✅ |
| **Autorização explícita de Arthur para iniciar a implementação** | ⏳ **Não concedida.** Arthur pediu para não iniciar a implementação (12/10/2026). |
