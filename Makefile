#Makefile use for Panejorn project
all:
	echo "do nothing"

#Run project
run:
	docker-compose up
	
#Stop project
stop:
	docker-compose down

# build backend image
build-be:
	docker build -f go.Dockerfile -t be-container .

#attach frontend container
attach-fe:
	docker-compose exec fe-container sh

#attach backend container
attach-be:
	docker run be-container