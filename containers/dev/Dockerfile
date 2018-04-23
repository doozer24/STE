FROM slapers/alpine-node-chromium

RUN echo "Installing Packages" \
  && apk update \
  && apk add wget openssl ca-certificates \
  && update-ca-certificates \
  && mkdir -p /app

WORKDIR /app

VOLUME /app

# Since this app needs to run as an executable we are adding an entrypoint.
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "start"]
