FROM oven/bun:latest

WORKDIR /app

RUN COPY . .

CMD ["bun", "start", "-p", "80"]