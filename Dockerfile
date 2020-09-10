FROM node:lts-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine AS runtime
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY --from=build /usr/src/app/dist/ ./dist
EXPOSE 8080
CMD [ "node", "dist/index.js" ]