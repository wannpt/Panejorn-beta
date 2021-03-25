package handlers

import (
	"fmt"
	"github.com/labstack/echo"
	"log"
	"net/http"
	"time"

	"backend/db"
	res "backend/resources"
)

func GetPlanCollection(c echo.Context) error {
	result := make(map[string]interface{}, 0)

	userId, err := res.Str2Int(c.QueryParam("userId"))
	if err != nil {
		log.Printf("cannot convert string to integer. %v", err)
		return c.JSON(http.StatusInternalServerError, nil)
	}

	plans, err := db.GetPlansByUserID(userId)
	if err != nil {
		log.Printf("cannot query plan of this user. %v", err)
		return c.JSON(http.StatusInternalServerError, nil)
	}

	pinnedPlans := make([]map[string]interface{}, 0)
	unpinnedPlans := make([]map[string]interface{}, 0)
	for i := range plans {
		var strDate string
		start_date := res.TimeZone(time.Unix(plans[i].StartDate, 0))
		end_date := res.TimeZone(time.Unix(plans[i].EndDate, 0))
		if end_date.Sub(start_date) == 0 {
			strDate = res.Date2ThaiDateString(start_date, 1)
		} else {
			strDate = fmt.Sprintf("%s - %s", res.Date2ThaiDateString(start_date, 1), res.Date2ThaiDateString(end_date, 1))
		}
		plan := map[string]interface{}{
			"planID":    plans[i].PlanId,
			"planName":  plans[i].PlanName,
			"dateRange": strDate,
			"province":  plans[i].MainLocation,
			"planScore": plans[i].PlanScore,
		}

		if plans[i].Pinned == true {
			pinnedPlans = append(pinnedPlans, plan)
		} else {
			unpinnedPlans = append(pinnedPlans, plan)
		}
	}
	result["pinnedPlans"] = pinnedPlans
	result["plans"] = unpinnedPlans
	return c.JSON(http.StatusOK, result)
}
