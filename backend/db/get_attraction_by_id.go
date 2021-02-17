package db

import (
	"log"

	"app/models"
)

func GetAttractionById(attractionId string) (models.Attraction, error) {
	database := ConnectDatabase()
	defer database.Close()

	var attraction models.Attraction

	sqlStatement := "SELECT * FROM attraction__attractionDetail WHERE attraction_id=$1"

	row := database.QueryRow(sqlStatement, attractionId)

	err := row.Scan(
		&attraction.AttractionId,
		&attraction.AttractionName,
		&attraction.Latitude,
		&attraction.Longitude,
		&attraction.Introduction,
		&attraction.Detail,
		&attraction.Activities,
		&attraction.ThaiChildFee,
		&attraction.ThaiAdultFee,
		&attraction.ForeignChildFee,
		&attraction.ForeignAdultFee,
		&attraction.Targets,
		&attraction.AddressDetail,
		&attraction.SubDistrict,
		&attraction.District,
		&attraction.Province,
		&attraction.Postcode,
		&attraction.TelPhones,
		&attraction.MobilePhones,
		&attraction.FaxNumber,
		&attraction.Emails,
		&attraction.Urls,
		&attraction.ThumbnailUrl,
		&attraction.Monday,
		&attraction.Tuesday,
		&attraction.Wednesday,
		&attraction.Thursday,
		&attraction.Friday,
		&attraction.Saturday,
		&attraction.Sunday,
		&attraction.RecommendedDuration,
		&attraction.CreationTime,
		&attraction.DeletionTime,
		&attraction.UpdatedTime,
	)

	if err != nil {
		log.Fatalf("no rows were returned. %v", err)
	}

	sqlStatement = `SELECT r.attraction_type_id, t.description
					FROM attraction__regis_attractionType r
					INNER JOIN attraction__attractionType t
					ON r.attraction_type_id = t.attraction_type_id
					AND r.attraction_id = $1`

	rows1, err := database.Query(sqlStatement, attractionId)
	defer rows1.Close()
	if err != nil {
		log.Fatalf("unable to execute the query. %v", err)
	}

	for rows1.Next() {
		var attractionType models.AttractionType
		err = rows1.Scan(&attractionType.TypeId, &attractionType.Description)
		if err != nil {
			log.Fatalf("unable to scan the row for attraction type. %v", err)
		}
		attraction.AttractionTypes = append(attraction.AttractionTypes, attractionType)
	}

	if attraction.AttractionTypes == nil {
		attraction.AttractionTypes = make([]models.AttractionType, 0)
	}

	sqlStatement = `SELECT r.facility_id, t.description
					FROM attraction__regis_facilities r
					INNER JOIN attraction__facilityList t
					ON r.facility_id = t.facility_id
					AND r.attraction_id = $1`

	rows2, err := database.Query(sqlStatement, attractionId)
	defer rows2.Close()
	if err != nil {
		log.Fatalf("unable to execute the query. %v", err)
	}

	for rows2.Next() {
		var facility models.Facility
		err = rows2.Scan(
			&facility.FacilityId,
			&facility.Description,
		)
		if err != nil {
			log.Fatalf("unable to scan the row for facilities. %v", err)
		}
		attraction.Facilities = append(attraction.Facilities, facility)
	}

	if attraction.Facilities == nil {
		attraction.Facilities = make([]models.Facility, 0)
	}

	return attraction, err
}
