# Contexto de build: a raiz do repositório.
#   docker build -f apps/crm-web/Dockerfile -t zarco-crm-web .

FROM node:24-alpine AS build
RUN npm install -g pnpm@12.3.4
WORKDIR /repo

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY packages/contracts packages/contracts
COPY apps/crm-web apps/crm-web

RUN pnpm install --frozen-lockfile --filter crm-web...
RUN pnpm --filter crm-web build

FROM nginx:1-alpine
# O nginx substitui ${API_UPSTREAM} ao iniciar (templates da imagem oficial).
ENV API_UPSTREAM=http://crm-api:3000
COPY apps/crm-web/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /repo/apps/crm-web/dist /usr/share/nginx/html
EXPOSE 80
