FROM node:alpine

ENV NODE_ENV production

RUN apk add --no-cache libc6-compat gcc g++ python make

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN yarn

RUN apk del python make gcc g++

COPY . .

CMD ["yarn", "start"]
