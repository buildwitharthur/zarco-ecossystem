import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://zarcosoftware.com.br',
  vite: {
    plugins: [tailwindcss()],
  },
});
