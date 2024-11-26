FROM node:16-alpine as build-stage
WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
ARG REACT_APP_API_BASE_URL
ARG DOMAIN_HOST
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV DOMAIN_HOST=DOMAIN_HOST
RUN npm run start
FROM nginx:1.23.1-alpine
COPY --from=build-stage /usr/app/build /usr/share/nginx/html
EXPOSE 80
CMD nginx -g 'daemon off;'
