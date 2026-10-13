# Contexto de build: a raiz do repositório.
#   docker build -f apps/crm-api/Dockerfile -t zarco-crm-api .

FROM node:24-alpine AS build
RUN npm install -g pnpm@12.3.4
WORKDIR /repo

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY packages/contracts packages/contracts
COPY apps/crm-api apps/crm-api

RUN pnpm install --frozen-lockfile --filter crm-api...
RUN pnpm --filter crm-api build \
 && pnpm --filter crm-api deploy --legacy --prod /out

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /out/node_modules ./node_modules
COPY --from=build /repo/apps/crm-api/package.json ./package.json
COPY --from=build /repo/apps/crm-api/dist ./dist
COPY --from=build /repo/apps/crm-api/prisma ./prisma
COPY --from=build /repo/apps/crm-api/prisma.config.ts ./prisma.config.ts

EXPOSE 3000
USER node

# Migrações antes de aceitar requisições (apps/README.md §4).
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && exec node dist/server.js"]
