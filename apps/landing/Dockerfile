# Contexto de build: a raiz do repositório.
#   docker build -f apps/landing/Dockerfile -t zarco-landing .
#   (PUBLIC_WHATSAPP_* entram como --build-arg a partir da L1)

FROM node:24-alpine AS build
RUN npm install -g pnpm@12.3.4
WORKDIR /repo

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY apps/landing apps/landing

RUN pnpm install --frozen-lockfile --filter landing...
RUN pnpm --filter landing build

FROM nginx:1-alpine
COPY apps/landing/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/landing/dist /usr/share/nginx/html
EXPOSE 80
