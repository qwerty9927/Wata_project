FROM node:18

WORKDIR /app

RUN npm i npm@latest -g

COPY package*.json ./

RUN npm install

RUN npm install dotenv-cli -g

COPY . .

ENV EXPRESS_PORT 3000

EXPOSE $EXPRESS_PORT

CMD npm start