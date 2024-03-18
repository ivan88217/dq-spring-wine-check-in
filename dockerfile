FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

RUN bun sync-db-schema

RUN bun run build

CMD ["bun", "start", "-p", "80"]