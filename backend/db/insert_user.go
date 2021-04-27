package db

import (
	"log"

	"backend/models"
)

func InsertUser(user models.User) int {
	database := ConnectDatabase()
	defer database.Close()

	sqlStatement := `
	INSERT INTO user__userInfo (email, password, username, dob, status, tag1, tag2, tag3, tag4, tag5, creation_time)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
	RETURNING user_id
	`

	var userId int
	err := database.QueryRow(sqlStatement, user.Email, user.Password, user.Username,
		user.DateOfBirth, user.Status, user.Tag1, user.Tag2,
		user.Tag3, user.Tag4, user.Tag5, user.CreationTime).Scan(&userId)
	if err != nil {
		log.Panic("unable to scan the row. ", err)
	}
	return userId
}
