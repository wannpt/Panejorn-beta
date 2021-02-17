FROM golang:1.15.6-alpine3.12

EXPOSE 8000

ENV PROJECT_ROOT /go/src/app
RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT
COPY ./backend .

RUN apk add --no-cache bash git openssh 
RUN go get github.com/joho/godotenv
RUN go get -u github.com/labstack/echo/...
RUN go get -u github.com/TonPC64/gomon
RUN go get github.com/lib/pq