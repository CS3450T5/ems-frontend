FROM node:23-alpine as builder

WORKDIR /app
COPY . .

ARG VITE_APP_BACKEND_ADDRESS
ENV VITE_APP_BACKEND_ADDRESS localhost:5000

RUN npm install
RUN npm run build

FROM nginx:stable-alpine-slim as prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]

