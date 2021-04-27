FROM golang:1.15.6-alpine3.12 AS builder

ENV GO111MODULE=on

ENV PROJECT_ROOT /go/src/app
RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT

COPY ./backend .
RUN go clean --modcache
RUN go mod download

EXPOSE 8000

CMD [ "go", "run", "main.go" ]
