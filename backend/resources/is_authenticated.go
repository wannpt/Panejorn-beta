package resources

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo-contrib/session"
)

func IsAuthenticated(c echo.Context) bool {
	sess, _ := session.Get("session", c)
	if auth, ok := sess.Values["authenticated"].(bool); !ok || !auth {
		return false
	}
	return true
}