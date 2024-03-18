FROM deploy-con.asia-east1-a.c.production-1386.internal:5000/php-nginx:7.4

WORKDIR /app

RUN COPY . .

CMD ["bun", "start", "-p", "80"]