FROM node:16-alpine3.14

WORKDIR /usr/webapp

COPY . .

WORKDIR /usr/webapp/api

RUN apk update \
&& apk add --no-cache ca-certificates libwebp libwebp-tools expat \
&& apk add --no-cache vidstab-dev --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community \
&& apk add --no-cache --virtual .build-deps git curl build-base python3 g++ make autoconf automake \
&& npm ci \
&& apk del .build-deps

RUN npm install

CMD ["sh", "-c", "nodemon app.js"]