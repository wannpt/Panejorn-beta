package handlers

import (
	"fmt"
	"github.com/labstack/echo"
	"log"
	"net/http"
	"time"

	"app/db"
	res "app/resources"
)

func GetPlanDetail(c echo.Context) error {
	result := make(map[string]interface{}, 0)
	reqBody := res.GetRequestBody(c)
	planId := int64(reqBody["planId"].(float64))
	plan, err := db.GetPlanByPlanId(planId)
	if err != nil {
		log.Fatalf("cannot query plan by this plan id. %v", err)
	}

	var strDate string
	start_date := res.TimeZone(time.Unix(plan.StartDate, 0))
	end_date := res.TimeZone(time.Unix(plan.EndDate, 0))
	if end_date.Sub(start_date) == 0 {
		strDate = res.Date2ThaiDateString(start_date, 1)
	} else {
		strDate = fmt.Sprintf("%s - %s", res.Date2ThaiDateString(start_date, 1), res.Date2ThaiDateString(end_date, 1))
	}

	planDetail := plan.PlanDetail
	planDetailOutput := make(map[int]interface{}, 0)
	for i := range planDetail {
		if _, ok := planDetailOutput[planDetail[i].Day]; !ok {
			date := start_date.AddDate(0, 0, planDetail[i].Day-1)
			planDetailOutput[planDetail[i].Day] = map[string]interface{}{
				"day":    planDetail[i].Day,
				"date":   res.Date2ThaiDateString(date, 2),
				"detail": []map[string]interface{}{},
			}
		}
		planDetailDay, ok := planDetailOutput[planDetail[i].Day].(map[string]interface{})
		if !ok {
			log.Fatalf("cannot convert to map[string]interface{}. %v", err)
		}
		detailList, ok := planDetailDay["detail"].([]map[string]interface{})
		if !ok {
			log.Fatalf("cannot convert to map[string]interface{}. %v", err)
		}
		detailList = append(detailList, map[string]interface{}{
			"placeId":   planDetail[i].PlaceId,
			"placeName": planDetail[i].PlaceName,
			"placeType": res.PlaceId2PlaceType(planDetail[i].PlaceId),
			"timeRange": res.Minute2ClockRangeString(planDetail[i].StartTime, planDetail[i].EndTime, 1),
		})
		planDetailDay["detail"] = detailList
		planDetailOutput[planDetail[i].Day] = planDetailDay
	}
	result["planId"] = plan.PlanId
	result["planName"] = plan.PlanName
	result["dateRange"] = strDate
	result["province"] = plan.MainLocation
	result["planDetail"] = planDetailOutput
	return c.JSON(http.StatusOK, result)
}
