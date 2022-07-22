FROM node:16-alpine as builder

# RUN apk add --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
#   vips-dev fftw-dev gcc g++ make libc6-compat
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY manifests ./
RUN yarn install --immutable

FROM node:16-alpine

WORKDIR /usr/src/app

COPY packs ./

CMD ["yarn", "start:parse"]
