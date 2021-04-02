package handlers

import (
	"github.com/labstack/echo"
	"net/http"

	"backend/db"
	res "backend/resources"
)

func Login(c echo.Context) error {
	result := make(map[string]interface{}, 0)
	email := c.QueryParam("email")
	user, err := db.GetUserByEmail(email)

	// Account isn't fund
	if err != nil {
		result["status"] = false
		result["message"] = "Invalid email and password."
		return c.JSON(http.StatusOK, result)
	}

	password := c.QueryParam("password")

	// Password matches
	if res.MatchPassword(user.Password, password) {
		result["status"] = true
		result["result"] = user
		return c.JSON(http.StatusOK, result)
	} else { // Password doesn't match
		result["status"] = false
		result["message"] = "Invalid password."
		return c.JSON(http.StatusOK, result)
	}
}
