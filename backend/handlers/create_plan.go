package handlers

import (
	"bytes"
	"encoding/json"
	_ "fmt"
	"github.com/labstack/echo"
	"log"
	"net/http"
	"time"

	"backend/db"
	"backend/models"
	res "backend/resources"
)

func CreatePlan(c echo.Context) error {
	result := make(map[string]interface{}, 0)
	requestBody := res.GetRequestBody(c)

	// Fetch data from request body
	layout := "01/02/2006"

	planName := requestBody["planName"].(string)
	startDate, _ := time.Parse(layout, requestBody["startDate"].(string))
	startDate = res.TimeZone(startDate)
	endDate, _ := time.Parse(layout, requestBody["endDate"].(string))
	endDate = res.TimeZone(endDate)
	minBudget := int(requestBody["minBudget"].(float64))
	maxBudget := int(requestBody["maxBudget"].(float64))
	numberOfChildren := int(requestBody["numberOfChildren"].(float64))
	numberOfAdults := int(requestBody["numberOfAdult"].(float64))
	mainLocation := requestBody["province"].(string)
	userId := int(requestBody["userId"].(float64))

	plan := models.Plan{
		PlanName:         planName,
		StartDate:        startDate.Unix(),
		EndDate:          endDate.Unix(),
		MinBudget:        minBudget,
		MaxBudget:        maxBudget,
		NumberOfChildren: numberOfChildren,
		NumberOfAdults:   numberOfAdults,
		MainLocation:     mainLocation,
		Status:           1,
		Pinned:           false,
		CreationTime:     res.TimeZone(time.Now()).Unix(),
		UserId:           userId,
	}

	// Create plan using the Trip Recommender system
	if requestBody["type"] == "auto" {
		requestBody, err := json.Marshal(requestBody)
		resp, err := http.Post("http://reng-container:8040/trip-recommender-system", "application/json", bytes.NewBuffer(requestBody))
		if err != nil {
			log.Panic("cannot send http request to recommender system.", err)
		}
		defer resp.Body.Close()

		respBody := make(map[string]interface{}, 0)
		err = json.NewDecoder(resp.Body).Decode(&respBody)
		if err != nil {
			log.Panic("cannot decode the response body.", err)
		}
		// result["planId"] = db.InsertPlan(plan)
		result["success"] = true


		////////////////////////////////////////////////////////////////////
		// Write code here for inserting plan and plan detail into database
		////////////////////////////////////////////////////////////////////

		
	} else { // Create plan manually
		result["planId"] = db.InsertPlan(plan)
		result["success"] = true
	}
	return c.JSON(http.StatusOK, result)
}
