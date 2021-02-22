### Stage 1: Build ####
#FROM node:14-alpine AS builder
#WORKDIR /usr/src/app
#COPY package.json ./
#RUN npm install
#COPY . .
#RUN npm run build

### Stage 2: Run ###
FROM nginx:stable-alpine

COPY default.conf /etc/nginx/conf.d/
COPY ./dist/* /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html/*
