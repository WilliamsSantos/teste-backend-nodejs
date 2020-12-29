FROM node:argon

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm i --save

COPY . /app

EXPOSE ${DEFAULT_PORT}

CMD [ "npm", "start" ]