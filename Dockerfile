# syntax=docker/dockerfile:1

FROM oven/bun
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "bun.lockb", "./"]

RUN bun install --production

COPY . .

CMD bun run index.js