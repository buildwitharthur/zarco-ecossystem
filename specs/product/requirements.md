# Requisitos

> **Estado:** Landing page aprovada (12/10/2026) · CRM aprovado (12/10/2026)
> **Última atualização:** 12/10/2026
> Regras de negócio: [business-rules.md](business-rules.md) · Casos de uso: [use-cases.md](use-cases.md) · Visão geral: [overview.md](overview.md)

Legenda: **[C]** confirmado por Arthur · **[H]** proposta do agente, aguardando aprovação · **[P]** pendência

Prioridade (MoSCoW): **M** obrigatório no primeiro lançamento · **S** importante, pode vir logo depois · **C** desejável

Identificadores: `RF-LP-nn` (funcional, landing) · `RNF-LP-nn` (não funcional, landing) · `CA-LP-nn.m` (critério de aceite do RF nn) · `CA-LP-nnN.m` (critério de aceite do RNF nn).

---

## 1. Landing page

### 1.1 Objetivo

Levar donos e gestores de pequenas e médias empresas a iniciar uma conversa no WhatsApp. Em poucos segundos o visitante deve entender: **o que a Zarco faz**, **como ela trabalha** e **por que vale entrar em contato**. O foco da mensagem é a **construção de sistemas**. **[C]**

### 1.2 Requisitos funcionais

#### RF-LP-01 — Apresentação da Zarco · M · [C]

A primeira tela apresenta o que a Zarco faz, com foco na construção de sistemas para a operação de empresas, e a ação de contato pelo WhatsApp.

- **CA-LP-01.1** Sem rolar a página, nas resoluções 360 × 640 e 1366 × 768, o visitante vê: o que a Zarco faz, para que tipo de empresa e o botão de contato.
- **CA-LP-01.2** O título descreve um resultado ou atividade concreta, sem termos da lista "Evitar" do briefing.

#### RF-LP-02 — Problemas reconhecíveis · M · [C]

A página descreve situações de operação em que a Zarco ajuda, na linguagem do cliente, para que o visitante se reconheça (fonte: "Problemas que valem trazer", no briefing).

- **CA-LP-02.1** Cada situação descreve um sintoma da operação (ex.: planilha, redigitação, informação espalhada), não uma tecnologia.

#### RF-LP-03 — Serviços · **Removido** (12/10/2026)

Removido por decisão de Arthur (poucas seções, bem feitas). O foco em construção de sistemas fica na abertura (RF-LP-01). Automação, integrações e evolução de sistemas deixam de ser apresentadas na landing e são tratadas na conversa pelo WhatsApp.

#### RF-LP-04 — Processo · **Removido** (12/10/2026)

Removido por decisão de Arthur: a landing aposta em poucas seções. A mensagem essencial do método continua na página: a linha de apoio da abertura ("Diagnóstico gratuito. Orçamento depois de entender o problema."), o motivo "Diagnóstico gratuito" (RF-LP-05) e os destaques da abertura. RN-LP-03 e RN-LP-04 continuam valendo onde o assunto aparece.

#### RF-LP-05 — Motivos para contratar · M · [C]

A página apresenta os motivos para falar com a Zarco, usando somente diferenciais que a Zarco já pratica (ver RN-LP-01 e RN-LP-02).

Diferenciais elegíveis: o engenheiro que faz o diagnóstico acompanha o projeto de perto até a entrega (sem citar nome); diagnóstico gratuito antes do orçamento; simplicidade como critério declarado; transparência (escopo com "não incluído", acompanhamento do andamento); código e infraestrutura no nome do cliente; documentação na entrega. **[C]**

- **CA-LP-05.1** Nenhum diferencial cita o nome do fundador nem diz que a Zarco é uma empresa de uma pessoa.
- **CA-LP-05.2** Nenhum diferencial depende de cases, números ou clientes.

#### RF-LP-06 — Contato pelo WhatsApp · M · [C]

O visitante inicia uma conversa no WhatsApp da Zarco (+55 21 97514-0550), que abre com uma mensagem já escrita (ver RN-LP-05).

- **CA-LP-06.1** O rótulo da ação principal é "Converse sobre o seu caso".
- **CA-LP-06.2** No celular, a ação abre o aplicativo do WhatsApp na conversa com a Zarco, com a mensagem preenchida.
- **CA-LP-06.3** No computador, a ação abre o WhatsApp Web ou o aplicativo de desktop, com a mensagem preenchida.
- **CA-LP-06.4** A ação aparece pelo menos na primeira tela e no final da página. Se ela também fica acessível durante a rolagem, isso será decidido na Etapa 04.
- **CA-LP-06.5** O número fica visível em texto em algum ponto da página, para quem quiser salvar ou digitar o contato.

#### RF-LP-07 — Rodapé · M · [C]

O rodapé apresenta o descriptor institucional "ZARCO / Engenharia de Software", o contato pelo WhatsApp e a região de atendimento presencial (São Gonçalo, Niterói e região).

- **CA-LP-07.1** O rodapé não apresenta CNPJ, e-mail, endereço ou redes sociais enquanto esses dados não existirem (ver RN-LP-07).

#### RF-LP-08 — Pré-visualização em compartilhamentos · S · [C]

Quando o endereço da página é compartilhado (WhatsApp, LinkedIn etc.), aparece uma prévia com título, descrição e a imagem `assets/social/open-graph/zarco-og.png`.

- **CA-LP-08.1** Ao colar o link no WhatsApp, a prévia mostra título, descrição e imagem.

#### RF-LP-09 — Ícone da página · M · [C]

A aba do navegador e o atalho na tela inicial usam os favicons do pacote da marca (`assets/brand/favicon/`).

#### Revisão de 12/10/2026 — nova direção da landing

Aprovada em [landing-creative-direction.md](../design/landing-creative-direction.md). Ela substitui a lista de seções acima, onde houver conflito.

| ID | Requisito | Situação |
|---|---|---|
| RF-LP-04 | **Processo**, agora como a demonstração "Do processo ao sistema" (4 fases, com *play/pause* e o selo "Ilustração do método") | **Retomado** · M |
| RF-LP-05 | Motivos para contratar, na forma de "A diferença" (comparação + 3 pontos) | Revisado · M |
| RF-LP-10 | **Faixa de sintomas** no hero, pausável (WCAG 2.2.2), sem números inventados | Novo · S |
| RF-LP-11 | **Como começar** em 3 passos (mensagem → conversa gratuita → proposta), com o botão de contato | Novo · M |
| RF-LP-12 | **Perguntas frequentes** (6, em `<details>`, funcionando sem JavaScript). Respostas a revisar por Arthur antes da publicação. | Novo · M |
| RF-LP-13 | **Ficha técnica** no hero, com as três garantias (diagnóstico gratuito, escopo por escrito, código no seu nome) | Novo · S |
| — | Z 3D | **Removido** da landing (decisão de Arthur) |

### 1.3 Requisitos não funcionais

#### RNF-LP-01 — Compreensão rápida · M · [C]

Ver CA-LP-01.1. Não existe meta de tempo medida com usuários. A verificação é feita pelo conteúdo da primeira tela.

#### RNF-LP-02 — Encontrável em buscas (SEO) · M · [C]

A página deve ser encontrada em buscas orgânicas por quem procura desenvolvimento de sistemas para empresas.

- **CA-LP-02N.1** Todo o texto da página está presente no HTML entregue pelo servidor e não depende de JavaScript para aparecer. **[C]**
- **CA-LP-02N.2** A página tem título, descrição, idioma `pt-BR`, endereço canônico e um único título principal (h1). **[C]**
- **CA-LP-02N.3** A página pode ser indexada (arquivo de robôs e sitemap publicados). **[C]**
- **CA-LP-02N.4** A página tem dados estruturados (schema.org) descrevendo a empresa, o serviço e a área atendida, sem dados inexistentes (sem endereço, sem CNPJ). **[C]**
- **CA-LP-02N.5** Os termos de busca prioritários serão definidos junto com a copy (ver P-LP-03).

#### RNF-LP-03 — Desempenho · M · [C]

A página carrega rápido em celular com rede móvel comum, porque desempenho afeta tanto a conversão quanto o SEO.

- **CA-LP-03N.1** Na avaliação de laboratório para celular (Lighthouse), Performance, Acessibilidade, Boas práticas e SEO ficam todos em 90 ou mais.
- **CA-LP-03N.2** Core Web Vitals dentro do limite "bom": LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms.

#### RNF-LP-04 — Acessibilidade · M · [C]

Conformidade com WCAG 2.2 nível AA.

- **CA-LP-04N.1** O contraste de texto atende AA nas combinações de cor usadas.
- **CA-LP-04N.2** A ação de contato é alcançável e acionável pelo teclado, com foco visível.
- **CA-LP-04N.3** A página é compreensível com leitor de tela: hierarquia de títulos coerente, links com rótulos descritivos e imagens decorativas ignoradas.

#### RNF-LP-05 — Responsividade · M · [C]

A página funciona de 320 px de largura em diante, sem rolagem horizontal.

#### RNF-LP-06 — Tema · M · [C]

**Somente tema escuro** (decisão de Arthur, 12/10/2026; substitui "somente claro"). A página não muda de aparência com a preferência do sistema operacional.

#### RNF-LP-07 — Privacidade · M · [C]

A página não coleta, armazena nem envia dados do visitante.

- **CA-LP-07N.1** A página não define cookies nem usa armazenamento local. **[C]**
- **CA-LP-07N.2** Não há scripts de analytics, pixels ou rastreadores. **[C]**
- **CA-LP-07N.3** Ao carregar, a página não faz requisições a domínios de terceiros (fontes, imagens e scripts são servidos pelo próprio domínio). **[C]**

#### RNF-LP-08 — Domínio e segurança · M · [C]

- **CA-LP-08N.1** A página é servida em `https://zarcosoftware.com.br`.
- **CA-LP-08N.2** O acesso por `http://` e por `www.` redireciona para o endereço canônico.

#### RNF-LP-09 — Facilidade de manutenção · S · [C]

- **CA-LP-09N.1** O número do WhatsApp e a mensagem pré-preenchida são definidos em um único lugar.
- **CA-LP-09N.2** Mudar um texto da página não exige alterar mais de um arquivo.

### 1.4 Fora do escopo da landing

Formulário de contato, outros canais de contato, analytics, vitrine de produtos, blog, depoimentos e cases, tema escuro, versão em outro idioma, tráfego pago. **[C]**

### 1.5 Pendências

| # | Pendência | Impacto | Bloqueia | Resolver em |
|---|---|---|---|---|
| ~~P-LP-01~~ | Resolvida: a copy pode dizer que o engenheiro acompanha o projeto de perto, sem citar nome (RN-LP-02) | — | — | — |
| ~~P-LP-02~~ | Resolvida: diagnóstico gratuito (RN-LP-04) | — | — | — |
| P-LP-03 | Termos de busca prioritários | Texto e metadados (RNF-LP-02) | Não | Elaboração da copy |
| ~~P-LP-04~~ | Resolvida: domínio registrado e DNS apontado (12/10/2026) | — | — | — |

---

## 2. CRM (ferramenta interna)

### 2.1 Objetivo

Dar a Arthur um lugar único para acompanhar os projetos em andamento, as tarefas de cada um e os modelos de documento da Zarco. **[C]**

Identificadores: `RF-CRM-nn` · `RNF-CRM-nn` · `CA-CRM-nn.m` (critério de RF) · `CA-CRM-nnN.m` (critério de RNF).

### 2.2 Requisitos funcionais

#### RF-CRM-01 — Acesso com login · M · [C]

Somente Arthur acessa o CRM, por meio de login.

- **CA-CRM-01.1** Nenhuma página ou arquivo do CRM pode ser acessado sem login.
- **CA-CRM-01.2** Arthur pode sair (encerrar a sessão). **[C]**
- **CA-CRM-01.3** Tentativas de login repetidas e erradas são limitadas. **[C]**
- **CA-CRM-01.4** Não existe cadastro público de usuário. **[C]**
- **CA-CRM-01.5** A sessão é curta: expira em até 8 horas, e então é preciso entrar de novo. **[C]**

#### RF-CRM-02 — Clientes · M · [C]

Cadastrar, editar e consultar clientes. Um cliente é uma empresa com uma pessoa de contato.

- **CA-CRM-02.1** Um cliente tem: nome da empresa (obrigatório), nome do contato, telefone/WhatsApp e e-mail do contato. **[C]**
- **CA-CRM-02.2** Na página do cliente aparecem os projetos dele.
- **CA-CRM-02.3** Ver RN-CRM-10 para exclusão.

#### RF-CRM-03 — Projetos · M · [C]

Cadastrar, editar e consultar projetos.

- **CA-CRM-03.1** Um projeto tem: nome, cliente, fase, saúde, data de início, previsão de entrega e links (produção, repositório, documentação). **[C]**
- **CA-CRM-03.2** Obrigatórios: nome, cliente e fase. Os demais são opcionais. **[C]**
- **CA-CRM-03.3** Os links abrem em uma nova aba.
- **CA-CRM-03.4** Ver RN-CRM-11 para exclusão.

#### RF-CRM-04 — Fase e saúde do projeto · M · [C]

Arthur atualiza a fase do projeto (RN-CRM-03) e a saúde dele (RN-CRM-04).

- **CA-CRM-04.1** A fase pode ser trocada para qualquer outra, inclusive voltar a uma fase anterior. **[C]**

#### RF-CRM-05 — Visão geral dos projetos · M · [C]

A tela inicial (Início) mostra os projetos em andamento com nome, cliente, fase, saúde e previsão de entrega, junto com o quadro geral de tarefas ([ux-audit.md §2.2](../experience/ux-audit.md)). Ela responde "como estão meus projetos?" de um olhar.

- **CA-CRM-05.1** Projetos com saúde "atenção" ou "bloqueado" se destacam dos demais.
- **CA-CRM-05.2** Projetos concluídos e cancelados ficam fora da visão padrão, mas continuam consultáveis.

#### RF-CRM-06 — Tarefas em kanban · M · [C]

As tarefas são organizadas em quadro kanban com as colunas A fazer, Fazendo e Feito. Existe o quadro de cada projeto e um **quadro geral** com as tarefas de todos os projetos.

- **CA-CRM-06.1** Uma tarefa tem título (obrigatório), status, projeto (obrigatório) e prazo (opcional). **[C]**
- **CA-CRM-06.2** Arthur cria, edita, move entre colunas e exclui tarefas.
- **CA-CRM-06.3** Tarefas com prazo vencido e não concluídas se destacam. **[C]**
- **CA-CRM-06.4** O quadro geral mostra as tarefas de todos os projetos, identificando o projeto de cada tarefa, e pode ser filtrado por projeto. **[C]**
- **CA-CRM-06.5** Dentro de cada coluna, a ordem é manual (ver [domain-model.md §4.3](domain-model.md)). **[C]**
- **CA-CRM-06.6** O quadro geral mostra somente tarefas de projetos em andamento. **[C]**
- **CA-CRM-06.7** No quadro geral, a coluna "Feito" mostra somente tarefas concluídas nos últimos 14 dias. **[C]**
- **CA-CRM-06.8** Tarefas concluídas há mais de 14 dias continuam acessíveis na página do projeto. **[C]**

#### RF-CRM-07 — Modelos de documento · M · [C]

Guardar os modelos de documento da Zarco para baixar e editar no Word.

- **CA-CRM-07.1** Arthur envia um arquivo, informando nome e categoria.
- **CA-CRM-07.2** Arthur vê a lista de modelos, agrupada ou filtrável por categoria.
- **CA-CRM-07.3** Arthur baixa o arquivo original, sem alteração.
- **CA-CRM-07.4** Arthur substitui o arquivo de um modelo por uma nova versão (RN-CRM-08).
- **CA-CRM-07.5** Arthur exclui um modelo, com confirmação.
- **CA-CRM-07.6** Formatos aceitos: `.docx`, `.xlsx`, `.pptx` e `.pdf`. Tamanho máximo: 20 MB por arquivo. **[C]**

#### RF-CRM-08 — Categorias de documento · M · [C]

Arthur cria, renomeia e exclui categorias de documento.

- **CA-CRM-08.1** O CRM começa com as categorias: Proposta, Escopo, Contrato, Aceite, Solicitação de mudança, Relatório, Diagnóstico, Manutenção e Papel timbrado. **[C]**
- **CA-CRM-08.2** Ver RN-CRM-09 para exclusão.

### 2.3 Requisitos não funcionais

#### RNF-CRM-01 — Hospedagem · M · [C]

O CRM roda na VPS de Arthur, gerenciada com Coolify, e é acessado pela internet por HTTPS. A tecnologia e o endereço serão decididos na Etapa 08.

#### RNF-CRM-02 — Segurança · M · [C]

- **CA-CRM-02N.1** Todo acesso é feito por HTTPS.
- **CA-CRM-02N.2** Senhas nunca são guardadas em texto puro.
- **CA-CRM-02N.3** O CRM não aparece em buscadores (bloqueio de indexação).
- **CA-CRM-02N.4** Arquivos de documento só são entregues a quem está com login ativo. Não existe link público para eles.
- **CA-CRM-02N.5** Os arquivos enviados ficam fora do repositório Git, em um armazenamento persistente do servidor.

#### RNF-CRM-03 — Backup · **Fora do escopo** (12/10/2026)

Removido por decisão de Arthur na Etapa 08. **Risco aceito:** se a VPS falhar, os dados do CRM (clientes, projetos, tarefas) e os modelos enviados podem ser perdidos sem recuperação. Os originais dos modelos estão versionados em `assets/documents/`. Revisitar antes de o CRM concentrar informação que não exista em outro lugar.

#### RNF-CRM-04 — Dispositivo · M · [C]

Uso em computador. Não há exigência de funcionar em celular. Largura mínima de referência: 1280 px. **[C]**

#### RNF-CRM-05 — Idioma · M · [C]

Interface em português.

#### RNF-CRM-08 — Tema · M · [C]

O CRM usa **somente** o tema escuro da paleta da marca ([briefing §5](../brand/briefing.md)). Não há tema claro nem alternância.

#### RNF-CRM-06 — Acessibilidade · S · [C]

Navegável pelo teclado, com foco visível e contraste AA. As ações do kanban também podem ser feitas sem arrastar.

#### RNF-CRM-07 — Dados pessoais · M · [C]

O CRM guarda apenas os dados de contato necessários para o trabalho (nome, telefone e e-mail do contato do cliente). Quando o cliente for excluído, os dados de contato dele são removidos.

### 2.4 Fora do escopo do CRM

Pipeline comercial, valor do projeto, financeiro, controle de horas, relatórios automáticos, solicitações de mudança como fluxo próprio, geração de documentos a partir de modelos, documentos preenchidos de clientes, anotações, decisões e bloqueios como registros próprios, uso em celular, outros usuários, acesso de clientes. **[C]**

### 2.5 Pendências

| # | Pendência | Impacto | Bloqueia | Resolver em |
|---|---|---|---|---|
| ~~P-CRM-01~~ | Resolvida: haverá quadro geral (CA-CRM-06.4) | — | — | — |
| ~~P-CRM-02~~ | Resolvida: somente tema escuro (RNF-CRM-08) | — | — | — |
| P-CRM-03 | Verificação em duas etapas no login | Segurança | Não | Etapa 08 |
| ~~P-CRM-04~~ | Resolvida: backup fora do escopo (RNF-CRM-03) | — | — | — |
| P-CRM-05 | Nome definitivo da ferramenta | Nenhum funcional | Não | Quando conveniente |
| P-CRM-06 | Endereço de acesso (ex.: subdomínio de zarcosoftware.com.br) | Infraestrutura | Não | Etapa 08 |
