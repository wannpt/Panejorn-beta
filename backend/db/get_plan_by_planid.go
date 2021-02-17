package db

import (
	"log"

	"app/models"
)

func GetPlanByPlanId(planId int64) (models.Plan, error) {
	database := ConnectDatabase()
	defer database.Close()

	var plan models.Plan

	sqlStatement := "SELECT * FROM plan__planInfo WHERE plan_id = $1"

	row := database.QueryRow(sqlStatement, &planId)

	err := row.Scan(
		&plan.PlanId,
		&plan.PlanName,
		&plan.StartDate,
		&plan.EndDate,
		&plan.Budget,
		&plan.NumberOfChildren,
		&plan.NumberOfAdults,
		&plan.PlanScore,
		&plan.MainLocation,
		&plan.Distance,
		&plan.Diversity,
		&plan.Status,
		&plan.UserID,
		&plan.Tag1,
		&plan.Tag2,
		&plan.Tag3,
		&plan.Tag4,
		&plan.Tag5,
		&plan.Pinned,
		&plan.CreationTime,
		&plan.DeletionTime,
		&plan.UpdatedTime,
	)
	if err != nil {
		log.Fatalf("unable to scan the row. %v", err)
	}

	sqlStatement = `SELECT * FROM plan__planDetail WHERE plan_id=$1`

	rows, err := database.Query(sqlStatement, plan.PlanId)
	defer rows.Close()
	if err != nil {
		log.Fatalf("unable to execute the query. %v", err)
	}

	for rows.Next() {
		var planDetail models.PlanDetail
		err = rows.Scan(
			&planDetail.Id,
			&planDetail.PlanId,
			&planDetail.PlaceId,
			&planDetail.PlaceName,
			&planDetail.Day,
			&planDetail.StartTime,
			&planDetail.EndTime,
			&planDetail.Status,
			&planDetail.Tag1,
			&planDetail.Tag2,
			&planDetail.Tag3,
			&planDetail.Tag4,
			&planDetail.Tag5,
			&planDetail.CreationTime,
			&planDetail.DeletionTime,
			&planDetail.UpdatedTime,
		)

		if err != nil {
			log.Fatalf("unable to execute the query. %v", err)
		}
		plan.PlanDetail = append(plan.PlanDetail, planDetail)
	}

	return plan, err
}
