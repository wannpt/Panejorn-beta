package handlers

import (
	"fmt"
	"github.com/labstack/echo"
	"log"
	"net/http"
	"time"

	"app/db"
	"app/models"
	res "app/resources"
)

func GetCurrentLocation(c echo.Context) error {
	result := make(map[string]interface{}, 0)
	reqBody := res.GetRequestBody(c)
	userId := int64(reqBody["userId"].(float64))
	plans, err := db.GetPlansByUserID(userId)
	if err != nil {
		log.Fatalf("cannot query plan of this user. %v", err)
	}

	var day int
	var my_plan *models.Plan
	var bOk = false
	today_date := res.TimeZone(time.Now())
	for i := range plans {
		start_date := res.TimeZone(time.Unix(plans[i].StartDate, 0))
		end_date := res.TimeZone(time.Unix(plans[i].EndDate, 0))
		end_date = end_date.AddDate(0, 0, 1)
		if today_date.After(start_date) && today_date.Before(end_date) {
			day = int(today_date.Sub(start_date).Hours()/24) + 1
			my_plan = &plans[i]
			bOk = true
			break
		}
	}

	if bOk {
		var main_start_minute, main_end_minute int
		var start_minute, end_minute int
		var currentLocation *models.PlanDetail

		my_plan_detail := (*my_plan).PlanDetail
		today_h, today_m, _ := today_date.Clock()
		today_minute := res.Time2Minutes(today_h, today_m)

		for i := range my_plan_detail {
			if my_plan_detail[i].Day == day {
				tmp_start_minute := my_plan_detail[i].StartTime
				tmp_end_minute := my_plan_detail[i].EndTime
				if i == 0 {
					main_start_minute = tmp_start_minute
				} else if i == len(my_plan_detail)-1 {
					main_end_minute = tmp_end_minute
				}
				if tmp_start_minute <= today_minute && today_minute <= tmp_end_minute {
					currentLocation = &my_plan_detail[i]
					start_minute = tmp_start_minute
					end_minute = tmp_end_minute
					break
				}
			}
		}

		if currentLocation != nil {
			var strDate string
			start_date := res.TimeZone(time.Unix((*my_plan).StartDate, 0))
			end_date := res.TimeZone(time.Unix((*my_plan).EndDate, 0))
			if end_date.Sub(start_date) == 0 {
				strDate = res.Date2ThaiDateString(start_date, 1)
			} else {
				strDate = fmt.Sprintf("%s - %s", res.Date2ThaiDateString(start_date, 1), res.Date2ThaiDateString(end_date, 1))
			}
			result["status"] = true
			result["result"] = map[string]interface{}{
				"isThere":   true,
				"planID":    (*my_plan).PlanId,
				"planName":  (*my_plan).PlanName,
				"province":  (*my_plan).MainLocation,
				"dateRange": strDate,
				"placeId":   currentLocation.PlaceId,
				"placeName": currentLocation.PlaceName,
				"placeType": res.PlaceId2PlaceType(currentLocation.PlaceId),
				"timeRange": res.Minute2ClockRangeString(start_minute, end_minute, 1),
			}
		} else {
			if main_start_minute <= today_minute && today_minute <= main_end_minute {
				result["status"] = true
				result["result"] = map[string]interface{}{"isThere": false}
			} else {
				result["status"] = false
			}
		}
	} else { //No plan today
		result["status"] = false
	}

	return c.JSON(http.StatusOK, result)
}
