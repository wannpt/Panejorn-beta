#Makefile use for Panejorn project
all:
	echo "do nothing"

#Build docker images 
build:
	docker build -t frontend react.Dockerfile

#Run project
run:
	docker-compose up -d
	
#Stop project
stop:
	docker-compose down
