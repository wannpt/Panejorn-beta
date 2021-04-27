# Panejorn-beta v0.02


## Get started
Clone this project to your local and run following commands:

**Run Project**
1. start running containers (*frontend*)
```sh
make run
```
2. open new terminal to start backend server
```sh
make attach-be
```
3. open new terminal to start recommender-engine server
```sh
make attach-reng
```

**Stop Project**
to stop project, run this command
```sh
make stop
```

The frontend server should be running on [localhost:8080](https://localhost:8080)
The backend server should be running on [localhost:8000](https://localhost:8000)

## DEV NOTES
### Tech stacked
- **Frontend**: 
  - React/ typescript
  - Bootstrap
- **Backend**: 
  - Golang/ Echo go framework
- **Recommender Engine**
  - Python3 Flask
- **Database**: 
  - ElephantSQL
- **Hosting**
  - Netlify


### Frontend
To access React (Frontend) use following commands:
```sh
make attach-fe
```

### Backend
To access Golang (Backend) use following commands:
```sh
docker-compose exec be-container sh
```
### Wireframe & Design
Panejornv0.02 [Wireframe&Design](https://www.figma.com/file/V1ouHFM6acG9L1xGNmbxZf/Panejorn-app-ver0.2?node-id=0%3A1)
