FROM golang:1.15.3-alpine

EXPOSE 8000

ENV PROJECT_ROOT /go/src/app
RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT
COPY ./backend .

#Init git for golang package
RUN apk add --no-cache bash git openssh 

#Get 'echo' dependencies
RUN go get -u github.com/labstack/echo/...

