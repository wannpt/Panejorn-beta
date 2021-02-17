package resources

import (
	"encoding/json"
	"github.com/labstack/echo"
)

func GetRequestBody(c echo.Context) map[string]interface{} {
	reqBody := make(map[string]interface{}, 0)
	err := json.NewDecoder(c.Request().Body).Decode(&reqBody)
	if err != nil {
		panic(err)
	}
	return reqBody
}
