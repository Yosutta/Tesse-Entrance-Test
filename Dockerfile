FROM node:18.7-alpine
WORKDIR usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
