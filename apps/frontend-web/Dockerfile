# syntax=docker/dockerfile:1.7-labs
FROM oven/bun:1-alpine

ARG VITE_BASE_URL_GATEWAY

ENV VITE_BASE_URL_GATEWAY=VITE_BASE_URL_GATEWAY

WORKDIR /app

COPY package.json bun.lockb .npmrc ./
COPY --parents packages/*/package.json ./
COPY --parents apps/frontend-web/package.json ./

RUN bun install

COPY . .

WORKDIR /app/apps/frontend-web

RUN bun run build

EXPOSE 8080

CMD [ "bun", "run", "start" ]