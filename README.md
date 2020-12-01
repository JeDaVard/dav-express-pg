### Welcome 👋

👌 Ultimate template for a Node.js project startup 👩‍💻 🧑‍💻 👨‍💻

👉 ![lines-total](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/jedavard/1bd7dd55ba955f935311fa11e90504e2/raw/dav-express-pg-total-lines.json)
![lines-source](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/jedavard/3f4adb3f385e1ac1e5390e977c6d9b0a/raw/dav-express-pg-pure-src-lines.json)
![lines-config](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/jedavard/cb2732fc671ca52be57f88c5f2838863/raw/dav-express-pg-config-line-count.json)
![test-status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/jedavard/25afa5f62258dc4f590f218043d54521/raw/dav-express-pg-test-pass-badge.json)
![coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/jedavard/8a44505b5c3b4a79f719497682ed4952/raw/dav-express-pg-coverage.json)
#
### Description

_**What?**_

Boilerplate

_**Why?**_

Fast

_**How?**_

Copy/remove

#
## Quick Start

1. Clone or download this repository

    ```

    ```

2. Enter the application folder

    ```

    ```

3. Create `.env` file from `.env_local`
    ```
    cp .env_local .env
    ```
4. Install the dependencies
    ```
    yarn install
    ```
5. Synchronize the database

    ```
    yarn db:migrate
    ```

6. Seed the database
    ```
    yarn db:seed --development
    ```
7. Run the application
    1. Normal mode
        ```
        yarn start
        ```
    2. Watcher mode with nodemon
        ```
        yarn dev
        ```
8. Open health endpoint in browser
    ```
    http://localhost:3000/api/health
    ```

## Using Docker

Use `docker-compose` config files to start [additional services](#additional-services).

1. To run only the additional services
    ```
    docker-compose up --build
    ```

## More commands

1. Run all tests
    ```
    yarn test
    ```
2. Run all linters
    ```
    yarn check
    ```

https://github.com/BretFisher/docker-mastery-for-nodejs
https://github.com/BretFisher/kubernetes-mastery
https://github.com/BretFisher/node-docker-good-defaults
https://github.com/BretFisher/udemy-docker-mastery
