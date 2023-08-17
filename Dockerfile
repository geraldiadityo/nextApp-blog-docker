FROM node:18-alpine AS dependencies

WORKDIR /app
COPY package*.json ./
RUN npm install

# build and deploy stage
FROM node:18-alpine AS builder

RUN apk add --no-cache openssl
WORKDIR /app
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh
COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate
RUN npm run build
CMD [ "/wait-for-mysql.sh","db","3306","npm","run","prisma:generate:deploy" ]
