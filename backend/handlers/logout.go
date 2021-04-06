package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"github.com/labstack/echo-contrib/session"
)

func Logout(c echo.Context) error {
	sess, _ := session.Get("session", c)
	
	// Like destroying the session
	sess.Options.MaxAge = -1
	sess.Save(c.Request(), c.Response())
	return c.NoContent(http.StatusOK)
}