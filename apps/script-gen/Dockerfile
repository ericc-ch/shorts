# syntax=docker/dockerfile:1.7-labs
FROM oven/bun:1-alpine

ADD --chmod=777 https://github.com/yt-dlp/yt-dlp/releases/download/2024.08.06/yt-dlp_linux /bin/yt-dlp

WORKDIR /app

COPY package.json bun.lockb ./
COPY --parents packages/*/package.json ./
COPY --parents apps/script-gen/package.json ./

RUN bun install

COPY . .

WORKDIR /app/apps/script-gen

# CMD [ "ash"]
CMD [ "bun", "run", "start" ]