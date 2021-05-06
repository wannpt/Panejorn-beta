package db

import (
	"log"
)

func DeleteFailedPlan(planId int) error {
	database := ConnectDatabase()
	defer database.Close()

	sqlStatement := `DELETE FROM plan__planInfo WHERE plan_id = $1`

	_, err := database.Exec(sqlStatement, planId)
	if err != nil {
		log.Println("unable to execute sql statement. ", err)
	}

	return err
}