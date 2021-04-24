package handlers

import (
	_ "fmt"
	"github.com/labstack/echo/v4"
	"net/http"

	"backend/db"
	res "backend/resources"
)

func Login(c echo.Context) error {
	result := make(map[string]interface{}, 0)
	requestBody := res.GetRequestBody(c)
	email := requestBody["email"].(string)
	password := requestBody["password"].(string)

	user, err := db.GetUserByEmail(email)

	// Account isn't fund
	if err != nil {
		result["success"] = false
		result["message"] = "Invalid email and password."
		return c.JSON(http.StatusOK, result)
	}

	// Password matches
	if res.MatchPassword(user.Password, password) {
		result["success"] = true
		info := map[string]interface{}{
			"userId":        user.UserId,
			"authenticated": true,
		}
		res.CreateSession(c, info)

		return c.JSON(http.StatusOK, result)

	} else { // Password doesn't match
		result["success"] = false
		result["message"] = "Invalid password."
		return c.JSON(http.StatusOK, result)
	}
}
