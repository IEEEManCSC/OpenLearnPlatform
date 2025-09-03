#!/bin/sh

echo "Waiting for database to be ready..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "Database is ready!"

echo "Running Prisma migrations..."
pnpm prisma migrate deploy

echo "Starting application..."
exec pnpm start
