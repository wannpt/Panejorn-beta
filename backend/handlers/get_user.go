package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"

	"backend/db"
	res "backend/resources"
)

func GetUser(c echo.Context) error {
	// Check session exists or not
	if !res.IsAuthenticated(c) {
		return c.NoContent(http.StatusForbidden)
	}

	sess := res.GetSession(c)
	userId := sess.Values["userId"].(int)
	user, err := db.GetUserByUserId(userId)
	if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.JSON(http.StatusOK, user)
}