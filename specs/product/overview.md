# Visão geral do produto

> **Estado:** Aprovada com pendências (12/10/2026).
> **Última atualização:** 12/10/2026
> **Fonte de marca:** [specs/brand/briefing.md](../brand/briefing.md). Posicionamento, tom de voz, paleta e regras de comunicação são definidos lá e não são repetidos aqui.
> **Arquivos e regras visuais da marca:** [assets/README.md](../../assets/README.md)

Legenda: **[C]** confirmado por Arthur · **[P]** pendência

---

## 1. Contexto

A Zarco é uma empresa de engenharia de software fundada por Arthur de Souza Reis Costa. Atende pequenas e médias empresas cuja operação passou do que planilhas e tarefas manuais conseguem sustentar. Hoje é uma empresa de uma pessoa: quem faz o diagnóstico é quem projeta e escreve o código. **[C]**

Este repositório (`zarco-ecossystem`) reunirá todo o ecossistema de software da marca: landing pages, API, dashboards e o que mais for necessário. A divisão em aplicações e a tecnologia de cada uma serão decididas na etapa de arquitetura. **[C]**

O ecossistema crescerá em funcionalidades conforme a marca evoluir. O escopo inicial é deliberadamente pequeno. **[C]**

## 2. Problemas a resolver

### 2.1 Aquisição de clientes

A Zarco precisa de um canal próprio para ser encontrada e iniciar conversas com empresas que tenham problemas de operação. Hoje não existe presença digital própria da marca. **[C]**

### 2.2 Acompanhamento de projetos

Hoje o acompanhamento de projetos e a organização de documentos de clientes (como contratos) são feitos de memória, sem nenhuma ferramenta. **[C]** Isso tende a falhar conforme o número de projetos simultâneos cresce: risco de perder prazos, combinados e documentos.

A Zarco precisa de uma ferramenta interna, ajustada ao seu próprio processo, para registrar os projetos em andamento e guardar os documentos de cada um. **[C]** A opção por uma ferramenta própria, em vez de uma pronta, é deliberada: ela será personalizada para o processo da Zarco e evoluirá junto com a marca. **[C]**

## 3. Escopo inicial

Ordem de entrega: **landing page primeiro**, CRM em seguida. Sem prazo determinado. **[C]**

### 3.1 Landing page da Zarco

| Item | Definição |
|---|---|
| Objetivo | Trazer novos clientes para a Zarco **[C]** |
| Conversão | Levar o visitante a iniciar uma conversa no WhatsApp. É a única ação de conversão. **[C]** |
| WhatsApp | +55 21 97514-0550 **[C]** |
| Domínio | zarcosoftware.com.br **[C]** |
| Público | Donos e gestores de pequenas e médias empresas (ver briefing) **[C]** |
| Formato | Página única **[C]** |
| Idioma | Português **[C]** |
| Texto (copy) | Escrito pelo agente, seguindo o briefing, e revisado por Arthur **[C]** |
| Analytics / medição | Não haverá **[C]** |
| Formulário de contato | Não haverá; o contato acontece no WhatsApp **[C]** |
| Vitrine de produtos | Fora do escopo neste momento **[C]** |

Restrições de conteúdo que vêm do briefing: nenhum texto sugere equipe, clientes, depoimentos, números ou cases que ainda não existem. **[C]**

### 3.2 CRM inicial (ferramenta interna)

| Item | Definição |
|---|---|
| Usuário | Somente Arthur **[C]** |
| Natureza | Ferramenta interna da Zarco; não é produto comercial **[C]** |
| Acompanhamento de projetos | Registrar e acompanhar projetos em andamento, com tarefas em quadro kanban **[C]** |
| Hospedagem | Online, na VPS de Arthur gerenciada com Coolify, com acesso por login **[C]** |
| Dispositivo | Somente computador **[C]** |
| Documentos | Guardar os **modelos** de documento da Zarco (proposta, contrato etc.), organizados em categorias. Documentos preenchidos de clientes não são guardados. **[C — revisado em 12/10/2026]** |
| Pipeline comercial | Fora do escopo inicial; pode entrar depois **[C]** |
| Acesso de clientes | Não previsto **[C]** |
| Integração com a landing | Não há; a landing só leva ao WhatsApp **[C]** |

O que significa "acompanhar um projeto" (quais informações, etapas e eventos) será detalhado na Etapa 02.

> **Nota de nomenclatura:** sem pipeline comercial, a ferramenta funciona mais como gestão de projetos e documentos do que como um CRM no sentido usual. O nome "CRM" é mantido como nome de trabalho. **[P]**

## 4. Fora do escopo inicial

- Pipeline comercial (leads, oportunidades, propostas). **[C]**
- Vitrine ou seção de produtos próprios. **[C]**
- Formulário de contato e analytics na landing. **[C]**
- Portal ou acesso de clientes. **[C]**
- Uso do CRM por outras pessoas ou empresas. **[C]**
- Produtos próprios (ex.: Confirma). **[C]**
- Sites e serviços da ArthurLabs. **[C]**

## 5. Atores

| Ator | Descrição |
|---|---|
| Visitante | Potencial cliente que chega à landing page e pode iniciar uma conversa pelo WhatsApp. Não se identifica no sistema. |
| Arthur (fundador) | Único usuário do CRM. Responsável por todos os projetos e documentos. |

## 6. Restrições conhecidas

- Uma única pessoa constrói e mantém todo o ecossistema. A solução precisa ser simples de operar e manter. **[C]**
- Os textos seguem o tom de voz e o vocabulário do briefing. **[C]**
- A identidade parte da marca Zarco (logo, monograma, paleta). As regras de interface (tipografia, materiais, raios, movimento) estão no [design system](../design/design-system/foundations.md), que substitui as regras visuais do Brand System v1 (revisão da marca toda decidida na Etapa 07). **[C]**
- O CRM fica acessível pela internet e guarda dados de contato de clientes. Isso exige autenticação e cuidados de segurança. Como ele guarda só modelos, e não documentos preenchidos, o risco de exposição de contratos de clientes não se aplica. **[C]**
- Infraestrutura disponível: VPS de Arthur gerenciada com Coolify. Ela é tratada como restrição na Etapa 08. **[C]**

## 7. Riscos

| Risco | Impacto | Mitigação inicial |
|---|---|---|
| Acesso indevido ao CRM | Médio: expõe contatos de clientes e dados de projetos | Login obrigatório e HTTPS (ver requisitos do CRM) |
| Perda de dados do CRM | Alto se a VPS falhar: não há backup (RNF-CRM-03 fora do escopo, risco aceito por Arthur) | Revisitar quando o CRM concentrar informação única |
| Escopo do CRM crescer sem critério | Médio: aumenta o custo de manutenção para uma pessoa | Novas funcionalidades entram por decisão explícita, conforme a marca evoluir |
| Landing sem prova social | Médio: a Zarco ainda não tem cases nem clientes para mostrar | A copy se apoia em processo, clareza e no diferencial "quem projeta é quem constrói", sem inventar provas |

## 8. Pendências

| # | Pendência | Bloqueia | Resolver em |
|---|---|---|---|
| P1 | ~~Envio das logos~~ Resolvida: pacote da marca em `assets/`. Resta aprovar o lockup horizontal, marcado como "derivado, pendente de aprovação" | Não | Etapa 06 |
| P2 | Nome definitivo da ferramenta interna ("CRM" é o nome de trabalho) | Não | Quando conveniente |
| P3 | Consulta ao INPI (classes 9 e 42) | Não | Antes do lançamento público |
| P4 | Registro do domínio zarcosoftware.com.br, se ainda não foi feito | Não | Antes do lançamento da landing |
| P5 | Este repositório abrigar produtos próprios no futuro | Não | Etapa 08 |

> O briefing lista "verificar zarco.com.br" como pendência. Ela foi substituída pela decisão do domínio **zarcosoftware.com.br**.
