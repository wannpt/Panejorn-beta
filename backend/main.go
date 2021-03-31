package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"

	"backend/routers"
)

var Port string

func startServer() {
	r := routers.SetUpRouter()
	r.Logger.Fatal(r.Start(":" + Port))
}

func recoverServer(f func()) {
	// Server recovered!
	defer func() {
		if r := recover(); r != nil {
			f()
		}
	}()
	f()
}

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("cannot read .env file.", err)
		Port = "8000"
	} else {
		Port = os.Getenv("port")
	}
}

func main() {
	recoverServer(startServer)
}
