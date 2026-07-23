FROM php:8.2-apache

RUN docker-php-ext-install mysqli && a2enmod rewrite

COPY apache.conf /etc/apache2/sites-enabled/000-default.conf
COPY . /var/www/html/
RUN rm -f /var/www/html/apache.conf

RUN mkdir -p /var/www/html/data && chown -R www-data:www-data /var/www/html/data

EXPOSE 80
