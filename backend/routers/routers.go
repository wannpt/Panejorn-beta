package routers

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"app/handlers"
)

func SetUpRouter() *echo.Echo{
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	 
	// Handlers
	e.POST("/login", handlers.Login)
	e.POST("/getCurrentLocation", handlers.GetCurrentLocation)
	e.POST("/getPlanCollection", handlers.GetPlanCollection)
	e.POST("/getPlanDetail", handlers.GetPlanDetail)
	e.POST("/getLocationDetail", handlers.GetLocationDetail)

	return e
}