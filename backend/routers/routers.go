package routers

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"backend/handlers"
)

func SetUpRouter() *echo.Echo{
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Handlers
	e.GET("/login", handlers.Login)
	e.GET("/getCurrentLocation", handlers.GetCurrentLocation)
	e.GET("/getPlanCollection", handlers.GetPlanCollection)
	e.GET("/getPlanDetail", handlers.GetPlanDetail)
	e.GET("/getLocationDetail", handlers.GetLocationDetail)

	e.POST("/createPlan", handlers.CreatePlan)

	return e
}