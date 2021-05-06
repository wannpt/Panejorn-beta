package db

import (
	"time"
	"log"
	"strings"
	"fmt"

	"backend/models"
	res "backend/resources"
)

func InsertPlanDetail(planDetails []models.PlanDetail) error {
	database := ConnectDatabase()
	defer database.Close()

	sqlStatement := `
	INSERT INTO plan__planDetail(plan_id, place_id, place_name, day, start_time, end_time, status, tag1, tag2, tag3, tag4, tag5, creation_time)
	VALUES 
	`

	var inserts []string
	var params []interface{}

	planId := planDetails[0].PlanId

	creationTime := res.TimeZone(time.Now()).Unix()
	for i, v := range planDetails {
		pos := i*13
		inserts = append(inserts, fmt.Sprintf("($%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d)",
			pos+1, pos+2, pos+3, pos+4, pos+5, pos+6, pos+7, pos+8, pos+9, pos+10, pos+11, pos+12, pos+13,
		))
		params = append(params, v.PlanId, v.PlaceId, v.PlaceName, v.Day, v.StartTime, v.EndTime, v.Status, v.Tag1, v.Tag2, v.Tag3, v.Tag4, v.Tag5, creationTime)
	}

	queryVals := strings.Join(inserts, ",")
	sqlStatement = sqlStatement + queryVals

	stmt, err := database.Prepare(sqlStatement)
	if err != nil {
		log.Println("found problem during preparing sql statement", err)
		return err
	}

	_, err = stmt.Exec(params...)
	if err != nil {
		log.Println("unable to execute", err)
		err = DeleteFailedPlan(planId)
		if err != nil {
			log.Println("cannot delete the plan.", err)
		} else {
			log.Println("delete planId", planId)
		}
	}
	return err
}