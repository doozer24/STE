FROM node:8-alpine

COPY . /app
WORKDIR /app

RUN npm run build \
 && tar zcf /dist.tar.gz dist

FROM nginx:1.13-alpine

COPY --from=0 /dist.tar.gz /
RUN tar zxf /dist.tar.gz -C /usr/share/nginx/html --strip-components=1 \
 && rm /dist.tar.gz

# Since this app needs to run as an executable we are adding an entrypoint.
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint"]

VOLUME /app
