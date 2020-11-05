#Makefile use for Panejorn project
all:
	echo "do nothing"

#Run project
run:
	docker-compose up -d
	
#Stop project
stop:
	docker-compose down
