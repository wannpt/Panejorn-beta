package handlers

import (
	_ "fmt"
	"github.com/labstack/echo/v4"
	"net/http"
	"regexp"
	"time"

	"backend/db"
	"backend/models"
	res "backend/resources"
)

var emailRegex = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

func CreateUser(c echo.Context) error {
	result := make(map[string]interface{}, 0)
	result["success"] = true
	requestBody := res.GetRequestBody(c)

	////////////////// Check username //////////////////
	username := requestBody["username"].(string)
	if usernameExist(username) {
		result["success"] = false
		result["message"] = "พบชื่อผู้ใช้นี้ถูกใช้งานแล้ว"
		return c.JSON(http.StatusInternalServerError, result)
	}
	//////////////////////////////////////////////////////////

	////////////////// Check email //////////////////
	// Check email's format is correct or not
	email := requestBody["email"].(string)
	if !res.IsEmail(email) {
		result["success"] = false
		result["message"] = "รูปแบบของอีเมลล์ไม่ถูกต้อง"
		return c.JSON(http.StatusInternalServerError, result)
	}

	// Check email exist on database or not
	if emailExist(email) {
		result["success"] = false
		result["message"] = "พบอีเมลล์นี้ถูกใช้งานแล้ว"
		return c.JSON(http.StatusInternalServerError, result)
	}
	//////////////////////////////////////////////////////////

	////////////////// Check password //////////////////
	password := requestBody["password"].(string)
	if !isPasswordValid(password) {
		result["success"] = false
		result["message"] = "ความยาวของรหัสผ่านต้องมีจำนวน 8 - 32 ตัวอักษร และรหัสผ่านต้องมี a-z, A-Z, และ 0-9 อย่างน้อย 1 ตัวอักษร"
		return c.JSON(http.StatusInternalServerError, result)
	}
	//////////////////////////////////////////////////////////

	////////////////// Check date of birth //////////////////
	layout := "01/02/2006"
	birth_date, _ := time.Parse(layout, requestBody["dob"].(string))
	birth_date = res.TimeZone(birth_date)
	today_date := res.TimeZone(time.Now())

	if birth_date.After(today_date) {
		result["success"] = false
		result["message"] = "วันเดือนปีเกิดไม่ถูกต้อง"
		return c.JSON(http.StatusInternalServerError, result)
	}
	//////////////////////////////////////////////////////////

	user := models.User{
		Email:        email,
		Password:     res.HashPassword(password),
		Username:     username,
		DateOfBirth:  birth_date.Unix(),
		Status:       1,
		CreationTime: res.TimeZone(time.Now()).Unix(),
	}

	userId := db.InsertUser(user)
	result["userId"] = userId

	return c.JSON(http.StatusOK, result)
}

func emailExist(email string) bool {
	_, err := db.GetUserByEmail(email)
	if err != nil {
		return false
	}
	return true
}

func usernameExist(username string) bool {
	_, err := db.GetUserByUsername(username)
	if err != nil {
		return false
	}
	return true
}

func isPasswordValid(password string) bool {
	// The length of password is from 8 to 32 characters
	if !((len(password) >= 8) && (len(password) <= 32)) {
		return false
	}

	// The password must contains uppercase, lowercase, and number
	// at least one per each
	if !res.HasUppercase(password) || !res.HasLowercase(password) || !res.HasDigit(password) {
		return false
	}
	return true
}
