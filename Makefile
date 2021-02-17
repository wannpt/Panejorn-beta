#Makefile use for Panejorn project
all:
	echo "do nothing"

#Run project
run:
	docker-compose up
	
#Stop project
stop:
	docker-compose down

#attach frontend container
attach-fe:
	docker-compose exec fe-container sh

#attach backend container
attach-be:
	docker-compose exec be-container gomon .