FROM node:alpine3.12

RUN mkdir /app

WORKDIR /app

COPY package.json ./

RUN npm install --ignore-optional

COPY . /app

EXPOSE ${DEFAULT_PORT}

CMD [ "npm", "start" ]