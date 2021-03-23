package handlers

import (
	"github.com/labstack/echo"
	"log"
	"net/http"
	"encoding/json"
	"bytes"
	"fmt"

	// res "backend/resources"
)

func CreatePlan(c echo.Context) error{
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
	fmt.Println(c.Request().Host)

	reqBody, err := json.Marshal(map[string]interface{}{
		"tripTime": tripTime,
		"budget": budget,
		"tagScores": tagScores,
		"source": source,
	})
	if err != nil {
		log.Fatal(err)
	}

	resp, err := http.Post("http://reng-container:8040/trip-recommender-system", "application/json", bytes.NewBuffer(reqBody))
	// resp, err := http.Get("http://localhost:8040/")
	if err != nil{
		log.Fatal(err)
	}
	defer resp.Body.Close()
	
	if resp.StatusCode == http.StatusOK {
		err := json.NewDecoder(resp.Body).Decode(&result)
		if err != nil{
			log.Fatal(err)
		}
	}
	return c.JSON(http.StatusOK, result)
}