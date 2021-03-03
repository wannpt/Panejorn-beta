FROM golang:1.15.6-alpine3.12 AS builder

ENV GO111MODULE=on

ENV PROJECT_ROOT /go/src/app
RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT

EXPOSE 8000
COPY ./backend .
# CMD ["ls"]
RUN go clean --modcache
RUN go mod download
# RUN CGO_ENABLED=0 GOOS=linux go build -o main .
# CMD ["ls"]
CMD [ "go", "run", "main.go" ]

# FROM scratch AS production
# COPY --from=builder /go/src/app .
