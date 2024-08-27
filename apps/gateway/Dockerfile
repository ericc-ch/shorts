# syntax=docker/dockerfile:1.7-labs
FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lockb ./
COPY --parents packages/*/package.json ./
COPY --parents apps/gateway/package.json ./

RUN bun install

COPY . .

WORKDIR /app/apps/gateway

CMD [ "bun", "run", "start" ]