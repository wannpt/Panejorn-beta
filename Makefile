# Makefile use for Panejorn project
all:
	echo "do nothing"

# Run project
run:
	docker-compose up fe-container
	
# Stop project
stop:
	docker-compose down

# Build all images; backend, frontend, and recommender engine
build: build-be build-fe build-reng
	echo 'build done'

# Build frontend image
build-fe:
	docker-compose build fe-container

# Build backend image
build-be:
	docker-compose build be-container

# Build recommender engine image
build-reng:
	docker-compose build reng-container

# Attach frontend container
attach-fe:
	docker run panejorn-beta_fe-container sh

# Attach backend container
attach-be:
	docker-compose start be-container

# Attach recommender engine container
attach-reng:
	docker-compose start reng-container