import type { APIRoute } from 'astro';

// Uma única página indexável (a 404 fica de fora).
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://zarcosoftware.com.br');
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <url><loc>${new URL('/', base).href}</loc></url>`,
    '</urlset>',
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
