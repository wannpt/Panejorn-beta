# Panejorn-beta v0.02

## Tech stacked
- Frontend: React/ typescript
- Backend: Golang/ Echo go framework
- Database: *WIP*

## Get started
Clone this project to your local and run following commands:

**Build docker images**
```sh
make build
```
**Run Project**
```sh
make run
```
**Stop Project**
```sh
make stop
```


## Frontend
### start
To start React (Frontend) use following commands:
```sh
make start-fe
```
The frontend server should be running on [localhost:8080](https://localhost:8080)

## Backend
To start Golang (Backend) use following commands:
```sh
make start-be
```
you can access to golang sh by using this command
```sh
docker-compose exec be-container sh
```

## Wireframe & Design
Panejornv0.02 [Wireframe&Design](https://www.figma.com/file/V1ouHFM6acG9L1xGNmbxZf/Panejorn-app-ver0.2?node-id=0%3A1)

## Project structures

This project is handle structure like this

### Frontend
- public
  - icons

- src
  - **components** : all visualization components
  - **containers** : all containers components
  - **hooks** : all hooks 
  - **pages** : all pages
  - **utils** : all utils included
