FROM slapers/alpine-node-chromium

RUN echo "Installing Packages" \
  && apk update \
  && apk add wget openssl ca-certificates \
  && update-ca-certificates \
  && mkdir -p /app

WORKDIR /app

VOLUME /app

CMD ["npm", "start"]
