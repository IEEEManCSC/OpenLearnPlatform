FROM node:22-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY apps/api/package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN pnpm install --no-frozen-lockfile

COPY apps/api/ .

FROM base AS development
EXPOSE 3000
CMD ["pnpm", "dev"]

FROM base AS build
RUN pnpm prisma generate
RUN pnpm build

FROM node:22-alpine AS production

RUN npm install -g pnpm && \
    apk add --no-cache netcat-openbsd

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

COPY apps/api/package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN pnpm install --prod --no-frozen-lockfile

COPY --from=build /app/dist ./dist

COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src/generated ./src/generated

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

COPY --from=build /app/start.sh ./start.sh
RUN chmod +x start.sh

CMD ["./start.sh"]
