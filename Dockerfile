FROM node:15

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install --global && npm install --save && npm update

COPY . /app

EXPOSE ${DEFAULT_PORT}

CMD [ "npm", "start" ]