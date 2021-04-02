package routers

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"backend/handlers"
)

func SetUpRouter() *echo.Echo {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Handlers
	e.GET("/user/login", handlers.Login)
	e.GET("/currentLocation", handlers.GetCurrentLocation)
	e.GET("/planCollection", handlers.GetPlanCollection)
	e.GET("/planCollection/plans", handlers.GetPlanDetail)
	e.GET("/locations", handlers.GetLocationDetail)

	e.POST("/planCollection/plans", handlers.CreatePlan)
	e.POST("/user/registration", handlers.CreateUser)

	return e
}
