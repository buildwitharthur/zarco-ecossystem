import { PrismaPg } from '@prisma/adapter-pg';
import { loadEnv } from '../../config/env.js';
import { PrismaClient } from '../../generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: loadEnv().DATABASE_URL,
  connectionTimeoutMillis: 3000,
});

/** Instância única do Prisma Client. Só os repositórios Prisma a importam. */
export const prisma = new PrismaClient({ adapter });
