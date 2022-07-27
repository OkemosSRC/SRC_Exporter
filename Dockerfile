FROM node:16-alpine
WORKDIR /usr/src/app
EXPOSE 8080
COPY package* ./
COPY . .
RUN npm install
ARG GIT_COMMIT
ARG TIME
ENV GIT_COMMIT=$GIT_COMMIT
ENV TIME=$TIME
ENV NODE_ENV production
ENV NODE_PORT 8080

ENTRYPOINT ["npm", "start"]
