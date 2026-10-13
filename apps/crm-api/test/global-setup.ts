import { execSync } from 'node:child_process';

// Cria o esquema no banco de teste antes dos testes (strategy §3.1).
export default function setup() {
  execSync('pnpm exec prisma migrate deploy', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: process.env.TEST_DATABASE_URL },
  });
}
