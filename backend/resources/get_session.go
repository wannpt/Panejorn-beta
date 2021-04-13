package resources

import (
	"github.com/labstack/echo/v4"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
)

func GetSession(c echo.Context) *sessions.Session{
	sess, _ := session.Get("session", c)
	return sess
}