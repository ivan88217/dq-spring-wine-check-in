FROM oven/bun:latest

WORKDIR /app

RUN COPY . .
RUN bun install
RUN bun sync-db-schema
RUN bun run build

CMD ["bun", "start", "-p", "80"]