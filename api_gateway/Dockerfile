FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf.template /etc/nginx/conf.d/nginx.conf.template

CMD /bin/bash -c "envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"