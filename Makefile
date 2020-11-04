#Makefile use for Panejorn project
all:
	echo "do nothing"

#Build docker images 
build:
	docker build -t frontend .

#Run [Docker] Frontend container
start-fe:
	docker run -it -v ${PWD}/frontend:/opt/app -p 8080:8080 --rm --name fe-container frontend

#Stop Frontend Docker containers
stop:
	docker stop fe-container