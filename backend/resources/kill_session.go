package resources

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo-contrib/session"
)

func KillSession(c echo.Context) {
	sess, _ := session.Get("session", c)

	// Like destroying the session
	sess.Options.MaxAge = -1
	sess.Save(c.Request(), c.Response())
}