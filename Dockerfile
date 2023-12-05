FROM node:18

#Port chay o docker

EXPOSE 3000

#App directory

WORKDIR /app

RUN npm i npm@latest -g

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm","start" ]