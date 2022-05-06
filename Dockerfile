FROM  nginx:stable-alpine

COPY /dist/administration /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf