# Contexto de build: a raiz do repositório.
#   docker build -f apps/landing/Dockerfile -t zarco-landing .
#   docker build -f apps/landing/Dockerfile \
#     --build-arg PUBLIC_WHATSAPP_NUMBER=5521975140550 \
#     --build-arg "PUBLIC_WHATSAPP_MESSAGE=..." -t zarco-landing .
# Sem os argumentos, valem os valores de src/config/contact.ts.

FROM node:24-alpine AS build
RUN npm install -g pnpm@12.3.4
WORKDIR /repo

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY apps/landing apps/landing

RUN pnpm install --frozen-lockfile --filter landing...

# Destino de conversão, embutido no build (RNF-LP-09)
ARG PUBLIC_WHATSAPP_NUMBER=""
ARG PUBLIC_WHATSAPP_MESSAGE=""
ENV PUBLIC_WHATSAPP_NUMBER=$PUBLIC_WHATSAPP_NUMBER \
    PUBLIC_WHATSAPP_MESSAGE=$PUBLIC_WHATSAPP_MESSAGE

RUN pnpm --filter landing build

FROM nginx:1-alpine
COPY apps/landing/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/landing/dist /usr/share/nginx/html
EXPOSE 80
