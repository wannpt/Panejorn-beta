package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"encoding/json"
	"log"

	"backend/db"
	"backend/models"
	res "backend/resources"
)

func SelectPlan(c echo.Context) error {
	
	// Check session exists or not
	if !res.IsAuthenticated(c) {
		return c.NoContent(http.StatusForbidden)
	}

	result := make(map[string]interface{}, 0)
	
	requestBody := struct {
		Plan models.Plan `json:"plan"`
		PlanDetail []models.PlanDetail `json:"PlanDetail"`
	}{}

	err := json.NewDecoder(c.Request().Body).Decode(&requestBody)
	if err != nil {
		log.Println("cannot decode the response body.", err)
		result["success"] = false
		return c.JSON(http.StatusInternalServerError, result)
	}

	sess := res.GetSession(c)
    userId := sess.Values["userId"].(int)

	requestBody.Plan.UserId = userId
	planId := db.InsertPlan(requestBody.Plan)

	for i, _ := range requestBody.PlanDetail {
		requestBody.PlanDetail[i].PlanId = planId
		requestBody.PlanDetail[i].Status = 1
	}
	err = db.InsertPlanDetail(requestBody.PlanDetail)
	if err != nil {
		log.Println("found some problem while inserting plan detail.", err)
		result["success"] = false
		return c.JSON(http.StatusInternalServerError, result)
	}
	result["planId"] = planId
	result["status"] = true
	return c.JSON(http.StatusOK, result)
}