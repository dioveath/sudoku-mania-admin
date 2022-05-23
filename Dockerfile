FROM node:16

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install --only production

COPY . .

EXPOSE 4001

CMD ["node", "server.js"]