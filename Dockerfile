FROM node:16.14 AS build
WORKDIR /build
COPY . .
ENV PATH="./node_modules/.bin:$PATH" 
RUN yarn install --frozen-lockfile && ng build

FROM nginx
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist/dev-tools /usr/share/nginx/html
