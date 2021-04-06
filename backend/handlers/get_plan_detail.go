package handlers

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
	"time"

	"backend/db"
	res "backend/resources"
)

func GetPlanDetail(c echo.Context) error {
	result := make(map[string]interface{}, 0)

	planId, err := res.Str2Int(c.QueryParam("planId"))
	if err != nil {
		log.Printf("cannot convert string to integer. %v", err)
		return c.JSON(http.StatusInternalServerError, nil)
	}

	plan, err := db.GetPlanByPlanId(planId)
	if err != nil {
		log.Printf("cannot query plan by this plan id. %v", err)
		return c.JSON(http.StatusInternalServerError, nil)
	}

	var strDate string
	start_date := res.TimeZone(time.Unix(plan.StartDate, 0))
	end_date := res.TimeZone(time.Unix(plan.EndDate, 0))
	if end_date.Sub(start_date) == 0 {
		strDate = res.Date2ThaiDateString(start_date, 1)
	} else {
		strDate = fmt.Sprintf("%s - %s", res.Date2ThaiDateString(start_date, 1), res.Date2ThaiDateString(end_date, 1))
	}

	planDetails := plan.PlanDetail
	planDetailOutput := make([]map[string]interface{}, 0)

	if len(planDetails) > 0 {

		previousDay := planDetails[0].Day
		detailList := make([]map[string]interface{}, 0)

		for i := range planDetails {
			// Keep storing the data of that day
			if previousDay == planDetails[i].Day {
				detailList = append(detailList, map[string]interface{}{
					"placeId":   planDetails[i].PlaceId,
					"placeName": planDetails[i].PlaceName,
					"placeType": res.PlaceId2PlaceType(planDetails[i].PlaceId),
					"timeRange": res.Minute2ClockRangeString(planDetails[i].StartTime, planDetails[i].EndTime, 1),
				})
			} else { // New day
				date := start_date.AddDate(0, 0, planDetails[i-1].Day-1)
				planDetailOutput = append(planDetailOutput, map[string]interface{}{
					"day":    planDetails[i-1].Day,
					"date":   res.Date2ThaiDateString(date, 2),
					"detail": detailList,
				})
				previousDay = planDetails[i].Day
				detailList = make([]map[string]interface{}, 0)
			}

			// Last day of the plan
			if i == len(planDetails)-1 {
				date := start_date.AddDate(0, 0, planDetails[i-1].Day-1)
				planDetailOutput = append(planDetailOutput, map[string]interface{}{
					"day":    planDetails[i-1].Day,
					"date":   res.Date2ThaiDateString(date, 2),
					"detail": detailList,
				})
				previousDay = planDetails[i].Day
			}
		}
	}

	result["planId"] = plan.PlanId
	result["planName"] = plan.PlanName
	result["dateRange"] = strDate
	result["province"] = plan.MainLocation
	result["planDetail"] = planDetailOutput
	result["minBudget"] = plan.MinBudget
	result["maxBudget"] = plan.MaxBudget
	return c.JSON(http.StatusOK, result)
}
