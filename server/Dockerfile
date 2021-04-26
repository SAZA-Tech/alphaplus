#DockerFile Client/App
FROM node:14.5-alpine3.12

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","run","start"] 