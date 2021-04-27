package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"

	res "backend/resources"
)

func Logout(c echo.Context) error {
	res.KillSession(c)
	return c.NoContent(http.StatusOK)
}
