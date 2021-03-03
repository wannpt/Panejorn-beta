#Makefile use for Panejorn project
all:
	echo "do nothing"

#Run project
run:
	docker-compose up fe-container
	
#Stop project
stop:
	docker-compose down

# build both backend and frontend image
build: build-be build-fe
	echo 'build done'

# build backend image
build-be:
	docker-compose build be-container

#build frontend image
build-fe:
	docker-compose build fe-container

#attach frontend container
attach-fe:
	docker run panejorn-beta_fe-container sh

#attach backend container
attach-be:
	docker-compose run --service-ports be-container