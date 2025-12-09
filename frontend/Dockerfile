# frontend/Dockerfile

# Etapa de build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Usar la variable de entorno de build para Vite
ARG VITE_REACT_APP_API_URL
ENV VITE_REACT_APP_API_URL=${VITE_REACT_APP_API_URL}

RUN npm run build

# Etapa de producción con Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
