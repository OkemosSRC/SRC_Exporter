FROM node:16-alpine
WORKDIR /usr/src/app
ARG GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT
ENV NODE_ENV production
ENV NODE_PORT 8080
EXPOSE 8080
COPY package* ./
COPY . .
RUN npm install

ENTRYPOINT ["npm", "start"]
