package main

import (
	"fmt"

	"net/http"

	"github.com/labstack/echo"
)

func main() {
	fmt.Println("Experiment Echo")
	e := echo.New()
	e.GET("/", func(c echo.Context) error{ 
		return c.String(http.StatusOK, "Hello, Gopher!")
	})
	e.Logger.Fatal(e.Start(":8000"))
}

