# --- Build stage ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
# npm ci fails here: this lockfile carries Windows-resolved optional
# platform bindings (e.g. @emnapi/*) that don't match what a fresh
# resolve on Linux picks, so npm ci's strict lockfile-match check trips
# even though the actual dependency tree is fine.
RUN npm install

COPY . .

# Vite bakes VITE_* vars into the bundle at build time, so the backend
# URL must be known here rather than at container-run time.
ARG VITE_API_BASE_URL=http://localhost:8080/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# --- Run stage ---
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
