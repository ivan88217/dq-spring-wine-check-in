FROM oven/bun:alpine

WORKDIR /app

COPY . .

RUN apk add nodejs

RUN bun install

RUN bun sync-db-schema

RUN bun run build

CMD ["bun", "start", "-p", "80"]