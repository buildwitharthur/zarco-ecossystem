import { defineConfig } from 'vitest/config';

try {
  process.loadEnvFile(new URL('../../.env', import.meta.url));
} catch {
  // sem .env: segue com o ambiente (CI)
}

const testDatabaseUrl = process.env.TEST_DATABASE_URL;
if (!testDatabaseUrl) {
  throw new Error('TEST_DATABASE_URL não definida. Veja .env.example e `docker compose up -d`.');
}

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    globalSetup: ['test/global-setup.ts'],
    // Os testes nunca usam DATABASE_URL (banco de desenvolvimento).
    env: { DATABASE_URL: testDatabaseUrl },
    fileParallelism: false,
    passWithNoTests: true,
  },
});
