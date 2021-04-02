package handlers

import (
	"github.com/labstack/echo"
	"net/http"
	"time"

	"backend/db"
	res "backend/resources"
)

func UpdateUserTagScore(c echo.Context) error{
	result := make(map[string]interface{}, 0)
	requestBody := res.GetRequestBody(c)

	info := map[string]interface{} {
		"userId": requestBody["userId"],
		"tag1": requestBody["tag1"],
		"tag2": requestBody["tag2"],
		"tag3": requestBody["tag3"],
		"tag4": requestBody["tag4"],
		"tag5": requestBody["tag5"],
		"updatedTime": res.TimeZone(time.Now()).Unix(),
	}

	_ = db.UpdateUserTagScore(info)
	result["success"] = true
	return c.JSON(http.StatusOK, result)
}
	