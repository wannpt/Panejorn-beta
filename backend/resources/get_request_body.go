package resources

import (
	"log"
	"encoding/json"
	"github.com/labstack/echo"
)

func GetRequestBody(c echo.Context) map[string]interface{} {
	reqBody := make(map[string]interface{}, 0)
	err := json.NewDecoder(c.Request().Body).Decode(&reqBody)
	if err != nil {
		log.Panic("unable to decode the request body. ", err)
	}
	return reqBody
}