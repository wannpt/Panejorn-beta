package db

import (
	"log"

	"backend/models"
)

func GetUser(email string) (models.User, error) {
	database := ConnectDatabase()
	defer database.Close()

	sqlStatement := "SELECT * FROM user__userInfo WHERE email = $1"

	row := database.QueryRow(sqlStatement, email)
	var user models.User
	err := row.Scan(
		&user.UserId,
		&user.Email,
		&user.Password,
		&user.FirstName,
		&user.LastName,
		&user.DateOfBirth,
		&user.Status,
		&user.Image,
		&user.Tag1,
		&user.Tag2,
		&user.Tag3,
		&user.Tag4,
		&user.Tag5,
		&user.CreationTime,
		&user.DeletionTime,
		&user.UpdatedTime,
	)

	if err != nil {
		log.Printf("unable to scan the row. %v", err)
		return models.User{}, err
	}

	return user, err
}
