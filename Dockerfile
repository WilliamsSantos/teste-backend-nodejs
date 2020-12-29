FROM node:15

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install --global && npm instal --save && npm update && npm run test

COPY . /app

EXPOSE ${DEFAULT_PORT}

CMD [ "npm", "start" ]