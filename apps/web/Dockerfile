FROM node:22-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY apps/web/package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN pnpm install --no-frozen-lockfile

COPY apps/web/ .

FROM base AS development
EXPOSE 5173
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

FROM base AS build
ARG VITE_API_URL
ARG VITE_RECOMMENDATION_API_URL

RUN echo "VITE_API_URL=${VITE_API_URL}" > .env && \
    echo "VITE_RECOMMENDATION_API_URL=${VITE_RECOMMENDATION_API_URL}" >> .env
RUN pnpm build

FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
