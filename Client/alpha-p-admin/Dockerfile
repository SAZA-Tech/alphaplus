#DockerFile Client/App
FROM node:14.5-alpine3.12

WORKDIR /app/client/alpha-p-admin

COPY package*.json ./

RUN npm install
RUN npm rebuild node-sass

COPY . .

EXPOSE 3001

CMD ["npm", "start", "--port", "3001"]
