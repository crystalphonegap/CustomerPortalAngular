# FROM node:10.23.1
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# EXPOSE 4200 49153
# CMD npm run start


### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html