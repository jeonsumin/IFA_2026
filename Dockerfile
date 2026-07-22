FROM php:8.2-apache

# mysqli 확장 설치
RUN docker-php-ext-install mysqli

# (선택) 기타 필요한 확장도 함께 설치 가능
# RUN docker-php-ext-install pdo pdo_mysql
# 아파치 설정 재로드
RUN a2enmod rewrite
