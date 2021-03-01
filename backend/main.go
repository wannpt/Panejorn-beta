package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"

	"backend/routers"
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("cannot read .env file. %v", err)
	}
}

func main() {
	r := routers.SetUpRouter()
	port := os.Getenv("port")
	fmt.Println("starting server on the port", port)
	r.Logger.Fatal(r.Start(":" + port))
}
