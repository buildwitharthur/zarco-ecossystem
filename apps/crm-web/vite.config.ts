import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react()],
  server: {
    port: 5173,
    // Mesma origem da produção: o nginx repassa /api para a API (apps/README.md §3).
    proxy: { '/api': 'http://localhost:3000' },
  },
});
