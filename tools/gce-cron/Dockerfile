FROM node:alpine

ENV NODE_ENV production

RUN apk add --no-cache libc6-compat gcc g++ python make
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY .build/package.json .

RUN yarn && yarn add graphql
RUN apk del python make gcc g++

COPY .build .

CMD ["node", "."]
