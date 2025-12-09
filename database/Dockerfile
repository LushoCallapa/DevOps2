FROM postgres:16

# Variables que provienen del .env en docker-compose
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

VOLUME /var/lib/postgresql/data
