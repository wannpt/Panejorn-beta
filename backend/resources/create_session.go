package resources

import (
	"github.com/labstack/echo/v4"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
)

func CreateSession(c echo.Context, info map[string]interface{}) {
	sess, _ := session.Get("session", c)
	sess.Options = &sessions.Options {
		Path: "/",
		MaxAge: 86400 * 7,
		HttpOnly: true,
	}
	sess.Values["userId"] = info["userId"]
	sess.Values["authenticated"] = info["authenticated"]
	sess.Save(c.Request(), c.Response())
}