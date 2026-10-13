# Landing — arquitetura

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Contratos de tela: [routes.md](routes.md) · Visão do ecossistema: [../README.md](../README.md)

Legenda: **[C]** decidido por Arthur · **[H]** proposta, aguardando aprovação

---

## 1. Decisões

| Item | Decisão |
|---|---|
| Framework | Astro, saída estática **[C]** |
| JavaScript no cliente | Só scripts pequenos e locais por componente (botão fixo, revelação, faixa de sintomas, ciclo de retrabalho, demonstração). Sem framework de UI e sem biblioteca de animação. Orçamento de até 15 KB comprimidos. O conteúdo funciona sem JavaScript (CA-TLP01.3). **[C]** |
| Estilo | Tailwind, com os tokens do design system **[C]** |
| Fontes | Inter, Inter Tight e Geist Mono, servidas pelo próprio domínio (CA-LP-07N.3) **[C]** |
| Conteúdo | Textos em componentes Astro. Número e mensagem do WhatsApp definidos uma única vez, em `src/config/contact.ts`, alimentado pelas variáveis `PUBLIC_*` (RNF-LP-09) **[C]** |
| SEO | Metadados, `robots.txt`, `sitemap.xml`, dados estruturados e Open Graph gerados no build (RNF-LP-02, RF-LP-08) **[C]** |
| Entrega | Contêiner nginx com cache longo para arquivos com hash, compressão e redirecionamentos de `http://` e `www.` (RNF-LP-08) **[C]** |
| 404 | `src/pages/404.astro`, servida pelo nginx com status 404 (TELA-LP-02) **[C]** |

## 2. Estrutura **[C]**

```text
apps/landing/
├── public/              favicons, og-image, fontes
├── src/
│   ├── config/contact.ts
│   ├── components/      Header, Hero, SpecSheet, SymptomTicker, Problem, ReworkLoop, ProcessDemo, Difference, GetStarted, Faq, FinalCta, Footer, StickyCta, ContactButton
│   ├── layouts/Base.astro
│   ├── pages/index.astro
│   ├── pages/404.astro
│   └── styles/global.css
├── astro.config.mjs
├── Dockerfile
└── nginx.conf
```

## 3. Qualidade

As verificações automáticas da landing (tipos, build, Lighthouse, acessibilidade, ausência de requisições a terceiros) serão definidas na Etapa 10.
