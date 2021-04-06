package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	_ "fmt"

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
		result["result"] = user
		sess, _ := session.Get("session", c)
		sess.Options = &sessions.Options {
			Path: "/",
			MaxAge: 86400 * 7,
			HttpOnly: true,
		}
		sess.Values["authenticated"] = true
		sess.Values["userId"] = user.UserId
		sess.Save(c.Request(), c.Response())
		return c.JSON(http.StatusOK, result)
		
	} else { // Password doesn't match
		result["success"] = false
		result["message"] = "Invalid password."
		return c.JSON(http.StatusOK, result)
	}
}
