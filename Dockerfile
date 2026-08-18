# React Build
FROM node:22-alpine AS frontend

WORKDIR /app

RUN npm install -g pnpm

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY frontend/ .

RUN npm run build


#Apache + php
FROM php:8.2-apache

RUN docker-php-ext-install mysqli \
    && a2enmod rewrite

COPY backend/apache.conf /etc/apache2/sites-enabled/000-default.conf
COPY backend/ /var/www/html/api

RUN rm -rf /var/www/html/apache.conf

COPY --from=frontend /app/dist /var/www/html/

EXPOSE 80

CMD ["apache2-foreground"]


