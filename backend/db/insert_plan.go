package db

import (
	"log"
	"time"

	"backend/models"
	res "backend/resources"
)

func InsertPlan(plan models.Plan) int {
	database := ConnectDatabase()
	defer database.Close()

	sqlStatement := `
	INSERT INTO plan__planInfo (plan_name, start_date, end_date, min_budget, max_budget, number_of_children, number_of_adults, plan_score, main_location, distance, diversity, status, user_id, tag1, tag2, tag3, tag4, tag5, pinned, creation_time)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
	RETURNING plan_id
	`

	var planId int

	plan.CreationTime = res.TimeZone(time.Now()).Unix()

	err := database.QueryRow(sqlStatement, plan.PlanName, plan.StartDate, plan.EndDate,
		plan.MinBudget, plan.MaxBudget, plan.NumberOfChildren, plan.NumberOfAdults,
		plan.PlanScore, plan.MainLocation, plan.Distance, plan.Diversity,
		plan.Status, plan.UserId, plan.Tag1, plan.Tag2,
		plan.Tag3, plan.Tag4, plan.Tag5, plan.Pinned,
		plan.CreationTime,
	).Scan(&planId)
	if err != nil {
		log.Printf("unable to scan the row. ", err)
	}
	return planId
}
