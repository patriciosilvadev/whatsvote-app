FROM kyma/docker-nginx
ADD export/ /var/www
EXPOSE 80
CMD "nginx"
