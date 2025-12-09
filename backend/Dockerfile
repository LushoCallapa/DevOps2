# Dockerfile backend
FROM node:18-alpine

# Instalar OpenSSL necesario para Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copiar package.json y package-lock.json primero para caching
COPY package*.json ./
RUN npm install  # instalar devDependencies también

# Copiar todo el código
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build   # <-- esto genera dist/

# Variables de entorno
ENV PORT=${PORT}
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

EXPOSE ${PORT}

# Migraciones y arrancar el backend
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]
