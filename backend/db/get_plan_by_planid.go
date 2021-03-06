package db

import (
	"log"

	"backend/models"
)

func GetPlanByPlanId(planId int) (models.Plan, error) {
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
		&plan.MinBudget,
		&plan.MaxBudget,
		&plan.NumberOfChildren,
		&plan.NumberOfAdults,
		&plan.PlanScore,
		&plan.MainLocation,
		&plan.Distance,
		&plan.Diversity,
		&plan.Status,
		&plan.UserId,
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
		log.Printf("unable to scan the row. %v", err)
		return models.Plan{}, err
	}

	sqlStatement = `SELECT * FROM plan__planDetail WHERE plan_id=$1 ORDER BY day, start_time`

	rows, err := database.Query(sqlStatement, plan.PlanId)
	defer rows.Close()
	if err != nil {
		log.Printf("unable to execute the query. %v", err)
		return models.Plan{}, err
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
			log.Printf("unable to execute the query. %v", err)
			return models.Plan{}, err
		}
		plan.PlanDetail = append(plan.PlanDetail, planDetail)
	}

	return plan, err
}
