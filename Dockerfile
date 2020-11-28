FROM node:14.15.1-alpine3.12

# Get tini to allow linux send signals to node runtime (*1)
RUN apk add --no-cache tini

# The optimal place to keep your project
WORKDIR /usr/src/app

# Enviroment variables for your runtime
ENV PATH ./node_modules/.bin:$PATH
ENV NODE_PATH ./
ENV NODE_ENV=production

# Copy your project to workdir, later your can also copy the lockfile and use the new "npm ci" command
COPY package*.json dist ./
COPY src/bin bin

# Install your production dependencies and clean the npm cache
RUN npm install --only=production && npm cache clean --force

# (*1)
ENTRYPOINT ["/sbin/tini", "--"]

# also we can play around the linux current user, to have a more secure machine
RUN addgroup -S node_user && adduser -S -g node_user node_user && chown -R node_user:node_user .
USER node_user

EXPOSE 5000

CMD ["node", "./bin/www"]


# *1 - in reality the things are a bit complicated, read more about what tini actially do  https://github.com/krallin/tini

# official node guide
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
