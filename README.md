#  :chart: Financial Content Network with MERN Stack (dev,prod)

| Mobile View |Desktop View  |
|--|--|
| ![Alphaplus mobile view](https://raw.githubusercontent.com/salehsm2/alphaplus/Testing/.github/images/alphaPlus_homepage_mobile.png) | ![Alphaplus desktop view](https://raw.githubusercontent.com/salehsm2/alphaplus/Testing/.github/images/alphaPlus_homepage_desktop.png) |

Alphaplus is Comminity content network where **Finance Analyst**  share their analyst and topics regarding companies.
:video_game: Demo [Here](alphaplus.online)

# Project File Structre
```
alphaplus
    |
    |---/ client
            |
            |---/ alpha-p-admin
            |---/ alpha-p-web
    |
    |---/ server
            |
            |---/src
            |
            .dockerignore
            Dockerfile
            Dockerfile.prod
            .env
    |
    |
   
    docker-compose.prod.yml
    docker-compose.yml
    README.md
```

# :whale: Docker

Boilerplate now is fully usable with docker, it integrate the MongoDB database, the Reactfrontend and NodeJS/Express backend.

If you do not have docker: <https://docs.docker.com/get-docker/>

Docker allows to deloy the app in docker containers in one line in the CLI.



## Environment variables

You have to set the following environment variables:

- ATLAS_URI, MongoDB Cluster URI
- AWS_ACCESS_KEY_ID, Your AWS Access Key ID for S3
- AWS_SECRET_ACCESS_KEY, Your Aws Access Key for S3 
- S3_BUCKET , the name of S3 Bucket

## Development

in the root directory:

`docker-compose up --build`

It supports hot reloading for both the frontend and backend.

## Production

in the root directory:

`docker-compose -f docker-compose-prod.yml up --build`

Frontend app uses an Nginx server to deliver static files.

You may want to use the flag `--remove-orphans`

To deploy on Heroku refer to their documentation:
<https://devcenter.heroku.com/categories/deploying-with-docker>

## :computer: Boilerplate

MERN Stack with GraphQl :

- Login and signup with jwt Tokens.


- Docker for development and production with hot reloading.

- Mongodb.

- Express.

- Reactbased on Create React App.
- - Apollo Client Cache.

- React Hooks.

- Nodejs.

## :lock: Security

This repository is scanned with snyk and code scanning from github for vulnerabilities. Do not use this code blindly, audit it first.

Authors
:  [Saleh](https://github.com/salehsm2)
:  [Ziad](https://github.com/ziad-salman)
: [Abdulaziz](https://github.com/AzizAlameer)
: [Abdulmohsen](https://github.com/Abdulmohsen2)
