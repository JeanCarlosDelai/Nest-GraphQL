FROM node:20-alpine

WORKDIR /home/api

COPY . .

RUN npm install

CMD npm run start:dev
