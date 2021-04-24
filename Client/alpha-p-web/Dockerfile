#DockerFile Client/App
FROM node:14.5-alpine3.12

WORKDIR /app/client/alpha-p-web

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start", "--port", "3000"]
