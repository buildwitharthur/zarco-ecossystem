import { defineConfig } from 'prisma/config';

// Em desenvolvimento as variáveis vêm do .env da raiz; em produção, do ambiente.
try {
  process.loadEnvFile(new URL('../../.env', import.meta.url));
} catch {
  // sem .env: segue com o ambiente
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: { url: process.env.DATABASE_URL ?? '' },
});
