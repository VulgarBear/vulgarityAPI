FROM node:alpine AS base

# Setup env variabless for yarn
ENV NODE_ENV=production YARN_VERSION=4.6.0

# install and use yarn 4.x
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN yarn install && yarn cache clean

CMD ["yarn", "start"]
