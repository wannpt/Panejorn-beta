package db

import (
	"log"

	"app/models"
)

func GetAccommodationById(accomId string) (models.Accommodation, error) {
	database := ConnectDatabase()
	defer database.Close()

	var accom models.Accommodation

	sqlStatement := "SELECT * FROM accommodation__accommodationDetail WHERE accommodation_id=$1"

	row := database.QueryRow(sqlStatement, accomId)

	err := row.Scan(
		&accom.AccommodationId,
		&accom.AccommodationName,
		&accom.Latitude,
		&accom.Longitude,
		&accom.Introduction,
		&accom.Detail,
		&accom.HotelStar,
		&accom.DisplayCheckinTime,
		&accom.DisplayCheckoutTime,
		&accom.NumberOfRooms,
		&accom.PriceRange,
		&accom.AddressDetail,
		&accom.SubDistrict,
		&accom.District,
		&accom.Province,
		&accom.Postcode,
		&accom.TelPhones,
		&accom.MobilePhones,
		&accom.FaxNumber,
		&accom.Emails,
		&accom.Urls,
		&accom.ThumbnailUrl,
		&accom.Standard,
		&accom.CreationTime,
		&accom.DeletionTime,
		&accom.UpdatedTime,
	)

	if err != nil {
		log.Fatalf("no rows were returned. %v", err)
	}

	sqlStatement = `SELECT r.facility_id, t.description
					FROM accommodation__regis_facilities r
					INNER JOIN accommodation__facilityList t
					ON r.facility_id = t.facility_id
					AND r.accommodation_id = $1`

	rows1, err := database.Query(sqlStatement, accomId)
	defer rows1.Close()
	if err != nil {
		log.Fatalf("unable to execute the query. %v", err)
	}

	for rows1.Next() {
		var facility models.Facility
		err = rows1.Scan(
			&facility.FacilityId,
			&facility.Description,
		)
		if err != nil {
			log.Fatalf("unable to scan the row for facilities. %v", err)
		}
		accom.Facilities = append(accom.Facilities, facility)
	}

	if accom.Facilities == nil {
		accom.Facilities = make([]models.Facility, 0)
	}

	sqlStatement = `SELECT r.service_id, t.description
					FROM accommodation__regis_services r
					INNER JOIN accommodation__serviceList t
					ON r.service_id = t.service_id
					AND r.accommodation_id = $1`

	rows2, err := database.Query(sqlStatement, accomId)
	defer rows2.Close()
	if err != nil {
		log.Fatalf("unable to execute the query. %v", err)
	}

	for rows2.Next() {
		var service models.Service
		err = rows2.Scan(
			&service.ServiceId,
			&service.Description,
		)
		if err != nil {
			log.Fatalf("unable to scan the row for services. %v", err)
		}
		accom.Services = append(accom.Services, service)
	}

	if accom.Services == nil {
		accom.Services = make([]models.Service, 0)
	}

	return accom, err
}
