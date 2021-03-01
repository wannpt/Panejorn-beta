FROM golang:1.15.6-alpine3.12 AS builder

ENV GO111MODULE=on

ENV PROJECT_ROOT /go/src/app
RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT

COPY ./backend .
RUN go clean --modcache
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o main .



FROM alpine:latest AS production
COPY --from=builder /go/src/app .
EXPOSE 8000
CMD ["./main"]