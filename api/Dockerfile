FROM node:alpine

WORKDIR /api/src

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .