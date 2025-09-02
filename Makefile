.PHONY: help dev prod build clean logs shell db-migrate db-reset test

# Default target
help:
	@echo "Available commands:"
	@echo "  dev          - Start development environment"
	@echo "  prod         - Start production environment"
	@echo "  build        - Build all services"
	@echo "  build-dev    - Build development environment"
	@echo "  build-prod   - Build production environment"
	@echo "  clean        - Stop and remove all containers and volumes"
	@echo "  logs         - Show logs for all services"
	@echo "  logs-web     - Show logs for web service"
	@echo "  logs-api     - Show logs for API service"
	@echo "  logs-rec      - Show logs for recommendation API service"
	@echo "  shell-web    - Access web service shell"
	@echo "  shell-api    - Access API service shell"
	@echo "  shell-rec     - Access recommendation API service shell"
	@echo "  db-migrate   - Run database migrations"
	@echo "  db-reset     - Reset database (WARNING: This will delete all data)"
	@echo "  db-shell     - Access database shell"
	@echo "  test         - Run tests for all services"
	@echo "  setup        - Initial setup (copy env file and build)"

# Development environment
dev:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up --build

dev-detached:
	@echo "Starting development environment in background..."
	docker-compose -f docker-compose.dev.yml up -d --build

# Production environment
prod:
	@echo "Starting production environment..."
	docker-compose up --build

prod-detached:
	@echo "Starting production environment in background..."
	docker-compose up -d --build

# Build commands
build:
	@echo "Building all services..."
	docker-compose build

build-dev:
	@echo "Building development environment..."
	docker-compose -f docker-compose.dev.yml build

build-prod:
	@echo "Building production environment..."
	docker-compose build

# Cleanup
clean:
	@echo "Stopping and removing all containers and volumes..."
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f

# Logs
logs:
	@echo "Showing logs for all services..."
	docker-compose logs -f

logs-web:
	@echo "Showing logs for web service..."
	docker-compose logs -f web

logs-api:
	@echo "Showing logs for API service..."
	docker-compose logs -f api

logs-rec:
	@echo "Showing logs for recommendation API service..."
	docker-compose logs -f recommendation-api

# Shell access
shell-web:
	@echo "Accessing web service shell..."
	docker-compose exec web sh

shell-api:
	@echo "Accessing API service shell..."
	docker-compose exec api sh

shell-rec:
	@echo "Accessing recommendation API service shell..."
	docker-compose exec recommendation-api sh

# Database operations
db-migrate:
	@echo "Running database migrations..."
	docker-compose exec api pnpm prisma migrate deploy

db-generate:
	@echo "Generating Prisma client..."
	docker-compose exec api pnpm prisma generate

db-reset:
	@echo "WARNING: This will delete all database data!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	docker-compose exec api pnpm prisma migrate reset --force

db-shell:
	@echo "Accessing database shell..."
	docker-compose exec postgres psql -U postgres -d openlearn

# Testing
test:
	@echo "Running tests for all services..."
	@echo "Testing web service..."
	docker-compose exec web pnpm test
	@echo "Testing API service..."
	docker-compose exec api pnpm test

# Setup
setup:
	@echo "Setting up development environment..."
	@if [ ! -f .env ]; then \
		cp env.example .env; \
		echo "Created .env file from env.example"; \
	else \
		echo ".env file already exists"; \
	fi
	@echo "Building development environment..."
	docker-compose -f docker-compose.dev.yml build

# Health checks
health:
	@echo "Checking service health..."
	@echo "Web service:"
	@curl -f http://localhost:5173/health || echo "Web service not responding"
	@echo "API service:"
	@curl -f http://localhost:3000/health || echo "API service not responding"
	@echo "Recommendation API service:"
	@curl -f http://localhost:8000/ || echo "Recommendation API service not responding"

# Development shortcuts
restart-dev:
	@echo "Restarting development environment..."
	docker-compose -f docker-compose.dev.yml restart

stop-dev:
	@echo "Stopping development environment..."
	docker-compose -f docker-compose.dev.yml down

stop-prod:
	@echo "Stopping production environment..."
	docker-compose down

# Monitoring
ps:
	@echo "Container status:"
	docker-compose ps

ps-dev:
	@echo "Development container status:"
	docker-compose -f docker-compose.dev.yml ps

# Resource usage
stats:
	@echo "Container resource usage:"
	docker stats --no-stream

# Backup and restore
backup:
	@echo "Creating database backup..."
	docker-compose exec postgres pg_dump -U postgres openlearn > backup_$(shell date +%Y%m%d_%H%M%S).sql

restore:
	@echo "Restoring database from backup..."
	@read -p "Enter backup file name: " backup_file && \
	docker-compose exec -T postgres psql -U postgres openlearn < $$backup_file
