dev-up:
	COMPOSE_HTTP_TIMEOUT=1200 docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
dev-down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down