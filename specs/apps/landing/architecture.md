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
├── public/              favicons, og-image.png, brand/ (lockup do rodapé)
├── src/
│   ├── config/contact.ts
│   ├── components/      Header, Hero, SpecSheet, SymptomTicker, Problem, ReworkLoop, ProcessDemo, Difference, GetStarted, Faq, FinalCta, Footer, StickyCta, ContactButton
│   ├── layouts/Base.astro
│   ├── pages/index.astro
│   ├── pages/404.astro
│   ├── pages/robots.txt.ts   gerados no build a partir de `site`
│   ├── pages/sitemap.xml.ts
│   ├── scripts/         utilitários de script compartilhados: in-view.ts (visibilidade), reveal.ts (entrada de seção)
│   └── styles/global.css     tokens (@theme do Tailwind), fontes @font-face e base
├── astro.config.mjs
├── Dockerfile
└── nginx.conf
```

### Notas de implementação (L1, 13/10/2026)

- **Fontes:** `@fontsource/inter`, `@fontsource/inter-tight` e `@fontsource/geist-mono`, só os arquivos `woff2` latinos, declarados em `global.css`. O Vite os emite em `/_astro/` com hash; só a Inter Tight 600 tem *preload*.
- **Tailwind 4:** carrega apenas `theme` e `utilities` (sem *preflight*, a base é a do protótipo). Os tokens estão em `@theme static`, e os componentes os usam como variáveis CSS em estilos do próprio componente.
- **Aprimoramento progressivo:** um script inline mínimo no `<head>` adiciona a classe `js` ao `<html>`. Estados que dependem de JavaScript (revelação, abas da demonstração) só valem sob `.js`; sem ela, o conteúdo aparece completo.
- **Destino de contato:** `src/config/contact.ts` lê `PUBLIC_WHATSAPP_*`; se ausentes, usa os valores de [routes.md §2](routes.md). O `href` é gerado no build, então os botões funcionam sem JavaScript.
- **nginx:** redireciona `www.` e `X-Forwarded-Proto: http` para `https://zarcosoftware.com.br` (o TLS termina no proxy do Coolify).

## 3. Qualidade

As verificações automáticas da landing (tipos, build, Lighthouse, acessibilidade, ausência de requisições a terceiros) serão definidas na Etapa 10.
