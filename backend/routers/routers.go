package routers

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"os"

	"backend/handlers"
)

var (
	key = []byte(os.Getenv("SESSION_KEY"))
	store = sessions.NewCookieStore(key)
)

func SetUpRouter() *echo.Echo {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	e.Use(session.Middleware(store))

	// Handlers
	e.GET("/currentLocation", handlers.GetCurrentLocation)
	e.GET("/planCollection", handlers.GetPlanCollection)
	e.GET("/planCollection/plans", handlers.GetPlanDetail)
	e.GET("/locations", handlers.GetLocationDetail)
	e.GET("/user/logout", handlers.Logout)
	e.GET("/user/profile", handlers.GetUser)

	e.POST("/user/login", handlers.Login)
	e.POST("/planCollection/plans", handlers.CreatePlan)
	e.POST("/user/registration", handlers.CreateUser)
	e.POST("/planCollection/plans/selected", handlers.SelectPlan)

	e.PUT("/user/tagScore", handlers.UpdateUserTagScore)

	return e
}
