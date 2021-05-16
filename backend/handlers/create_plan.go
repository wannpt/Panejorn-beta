package handlers

import (
    "bytes"
    "encoding/json"
    "github.com/labstack/echo/v4"
    "log"
    "net/http"
    "time"
    "fmt"

    "backend/db"
    "backend/models"
    res "backend/resources"
)

func CreatePlan(c echo.Context) error {

    // Check session exists or not
    if !res.IsAuthenticated(c) {
        return c.NoContent(http.StatusForbidden)
    }

    result := make(map[string]interface{}, 0)
    requestBody := res.GetRequestBody(c)

    // Fetch data from request body
	layout := "01/02/2006"
	
	keys := []string{
		"planName",
		"startDate",
		"endDate",
		"minBudget",
		"maxBudget",
		"numberOfChildren",
		"numberOfAdult",
		"province",
		"startTime",
		"endTime",
		"inputTagScores",
		"distance",
		"diversity",
		"type",
	}
	if !res.HasKeysInMap(requestBody, keys) {
		return c.NoContent(http.StatusInternalServerError)
	}

	planName := requestBody["planName"].(string)
	if len(planName) == 0 {
		result["success"] = false
		result["message"] = "กรุณาตั้งชื่อแผนเที่ยวของท่าน"
		return c.JSON(http.StatusInternalServerError, result)
	}
	startDate, err := time.Parse(layout, requestBody["startDate"].(string))
	if err != nil {
        return c.NoContent(http.StatusInternalServerError)
    }
    startDate = res.TimeZone(startDate)
	endDate, err := time.Parse(layout, requestBody["endDate"].(string))
	if err != nil {
        return c.NoContent(http.StatusInternalServerError)
    }
    endDate = res.TimeZone(endDate)
    minBudget := int(requestBody["minBudget"].(float64))
    maxBudget := int(requestBody["maxBudget"].(float64))
    numberOfChildren := int(requestBody["numberOfChildren"].(float64))
	numberOfAdults := int(requestBody["numberOfAdult"].(float64))
	if numberOfChildren == 0 && numberOfAdults == 0 {
		result["success"] = false
		result["message"] = "จำนวนสมาชิกร่วมแผนเที่ยว ต้องมีตั้งแต่ 1 คนขึ้นไป"
		return c.JSON(http.StatusInternalServerError, result)
	}
	mainLocation := requestBody["province"].(string)
	if len(mainLocation) == 0 {
		result["success"] = false
		result["message"] = "กรุณาเลือกจังหวัดที่ท่านต้องการไป"
		return c.JSON(http.StatusInternalServerError, result)
	}
	distance := requestBody["distance"].(float64)
	diversity := requestBody["diversity"].(float64)
	inputTagScores := requestBody["inputTagScores"].([]interface{})

    sess := res.GetSession(c)
    userId := sess.Values["userId"].(int)
	user, err := db.GetUserByUserId(userId)
    if err != nil {
        return c.NoContent(http.StatusInternalServerError)
    }

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
		UserId:           userId,
		Distance:		distance,
		Diversity:		diversity,
		Tag1:			inputTagScores[0].(float64),
		Tag2:			inputTagScores[1].(float64),
		Tag3:			inputTagScores[2].(float64),
		Tag4:			inputTagScores[3].(float64),
		Tag5:			inputTagScores[4].(float64),
	}

    // Create plan using the Trip Recommender system
    if requestBody["type"] == "auto" {
		payload := requestBody
        requestBody["userTagScores"] = user.GetTagScores()
        requestBody, err := json.Marshal(requestBody)
        resp, err := http.Post("http://reng-container:8040/trip-recommender-system", "application/json", bytes.NewBuffer(requestBody))
        if err != nil {
            log.Panic("cannot send http request to recommender system.", err)
        }
        defer resp.Body.Close()

        respBody := []struct {
				TotalCost int `json:"totalCost"`
                PlanDetail []struct {
                    Day     int     `json:"day"`
                    Detail  []models.PlanDetail `json:"detail"`
                } `json:"planDetail"`
            }{}

        err = json.NewDecoder(resp.Body).Decode(&respBody)
        if err != nil {
            log.Panic("cannot decode the response body.", err)
		}

		//////////////// Format plan information //////////////////////
		
		var strDate string
		if endDate.Sub(startDate) == 0 {
			strDate = res.Date2ThaiDateString(startDate, 1)
		} else {
			strDate = fmt.Sprintf("%s - %s", res.Date2ThaiDateString(startDate, 1), res.Date2ThaiDateString(endDate, 1))
		}

		planDisplay := map[string]interface{} {
			"planName": plan.PlanName,
			"dateRange": strDate,
			"province": plan.MainLocation,
		}
		//////////////////////////////////////////////////////////////

		//////////////// Format plan detail //////////////////////////
		planDetailDisplay := make([]map[string]interface{}, 0)
		// Loop for each plan
		for _, p := range respBody {
			detailPlan := make([]map[string]interface{}, 0)

			// Loop for each day
			for _, pDay := range p.PlanDetail {
				detailList := make([]map[string]interface{}, 0)
				date := startDate.AddDate(0, 0, pDay.Day-1)

				// Loop for each location
				for _, detail := range pDay.Detail {
					var placeType string
					// Check what the placetype is
					if len(detail.PlaceId) == 0 && len(detail.PlaceName) == 0 {
						placeType = "RESTAURANT"
					} else {
						placeType = res.PlaceId2PlaceType(detail.PlaceId)
					}
					detailList = append(detailList, map[string]interface{}{
						"placeId": detail.PlaceId,
						"placeName": detail.PlaceName,
						"placeType": placeType,
						"timeRange": res.Minute2ClockRangeString(detail.StartTime, detail.EndTime, 1),
					})
				}
				detailPlan = append(detailPlan, map[string]interface{} {
					"day": pDay.Day,
					"date": res.Date2ThaiDateString(date, 2),
					"detail": detailList,
				})
			}
			planDetailDisplay = append(planDetailDisplay, map[string]interface{}{
				"totalCost": p.TotalCost,
				"planDetail": detailPlan,
				
			})
		}
		//////////////////////////////////////////////////////////////
		
		result["plan"] = map[string]interface{} {
			"display": planDisplay,
			"information": plan,
		}
		result["planDetail"] = map[string]interface{} {
			"display": planDetailDisplay,
			"information": respBody,
		}
		result["success"] = true
		delete(payload, "userTagScores")
		result["payload"] = payload

    } else { // Create plan manually
        result["planId"] = db.InsertPlan(plan)
        result["success"] = true
    }
    return c.JSON(http.StatusOK, result)
}