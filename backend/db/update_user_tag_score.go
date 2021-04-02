package db

import (
	"log"
)

func UpdateUserTagScore(info map[string]interface{}) int64{
	database := ConnectDatabase()
	defer database.Close()
	
	sqlStatement := `
	UPDATE user__userInfo
	SET tag1=$2, tag2=$3, tag3=$4, tag4=$5, tag5=$6, updated_time=$7
	WHERE user_id=$1
	`

	res, err := database.Exec(sqlStatement, info["userId"], info["tag1"], info["tag2"], info["tag3"], info["tag4"], info["tag5"], info["updatedTime"])
	if err != nil {
		log.Panic("unable to execute the sqlstatement. ", err)
	}

	rowAffected, err := res.RowsAffected()
	if err != nil {
		log.Panic("error while checking the affected rows. ", err)
	}

	return rowAffected
}