# syntax=docker/dockerfile:1.7-labs
FROM node:22-bookworm

ADD --chmod=777 https://github.com/yt-dlp/yt-dlp/releases/download/2024.08.06/yt-dlp_linux /bin/yt-dlp

RUN apt update
RUN apt install -y \
  libnss3 \
  libdbus-1-3 \
  libatk1.0-0 \
  libgbm-dev \
  libasound2 \
  libxrandr2 \
  libxkbcommon-dev \
  libxfixes3 \
  libxcomposite1 \
  libxdamage1 \
  libatk-bridge2.0-0 \
  libcups2

RUN npm install -g bun

WORKDIR /app

COPY package.json bun.lockb ./
COPY --parents packages/*/package.json ./
COPY --parents apps/renderer/package.json ./

RUN bun install
RUN bunx remotionb browser ensure

COPY . .

WORKDIR /app/apps/renderer

# CMD [ "bash" ]
CMD [ "bun", "run", "start" ]