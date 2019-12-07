# develop stage
FROM node:11.1-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
# RUN npm install && npm install @vue/cli -g && npm install @vue/cli-service-global -g
RUN npm install
COPY . .
EXPOSE 8080
EXPOSE 8000

# build stage
FROM develop-stage as build-stage
RUN npm run build

# production stage
FROM nginx:1.15.7-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]