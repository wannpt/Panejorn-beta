package handlers

import (
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
	"net/http"

	"app/db"
	res "app/resources"
)

func Login(c echo.Context) error {
	reqBody := res.GetRequestBody(c)
	email := reqBody["email"].(string)
	user, err := db.GetUser(email)
	result := make(map[string]interface{}, 0)

	// Account isn't fund
	if err != nil {
		result["status"] = false
		result["message"] = "Invalid email and password."
		return c.JSON(http.StatusOK, result)
	}

	password := reqBody["password"].(string)

	// Password matches
	if comparePassword(user.Password, password) {
		result["status"] = true
		result["result"] = user
		return c.JSON(http.StatusOK, result)
	} else { // Password doesn't match
		result["status"] = false
		result["message"] = "Invalid password."
		return c.JSON(http.StatusOK, result)
	}
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func comparePassword(hashedPassword string, password string) bool {
	byteHashedPassword := []byte(hashedPassword)
	bytePassword := []byte(password)
	if err := bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword); err != nil { // Both of them don't match together
		return false
	}
	return true
}
