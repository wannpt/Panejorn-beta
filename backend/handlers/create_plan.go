package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/labstack/echo"
	"log"
	"net/http"
	// res "backend/resources"
)

func CreatePlan(c echo.Context) error {
	result := make(map[string]interface{}, 0)
	tripTime := c.QueryParam("tripTime")
	budget := c.QueryParam("budget")
	tag1 := c.QueryParam("tag1")
	tag2 := c.QueryParam("tag2")
	tag3 := c.QueryParam("tag3")
	tag4 := c.QueryParam("tag4")
	tag5 := c.QueryParam("tag5")
	source := c.QueryParam("source")

	tagScores := []string{tag1, tag2, tag3, tag4, tag5}
	fmt.Println(tripTime)
	fmt.Println(budget)
	fmt.Println(tagScores)
	fmt.Println(source)

	reqBody, err := json.Marshal(map[string]interface{}{
		"tripTime":  tripTime,
		"budget":    budget,
		"tagScores": tagScores,
		"source":    source,
	})
	if err != nil {
		log.Panic("cannot create request body.", err)
	}

	resp, err := http.Post("http://reng-container:8040/trip-recommender-system", "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		log.Panic("cannot send http request to recommender system.", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		err := json.NewDecoder(resp.Body).Decode(&result)
		if err != nil {
			log.Panic("cannot decode the response body.", err)
		}
	}
	return c.JSON(http.StatusOK, result)
}
