package db

import (
	"log"

	"app/models"
)

func GetRestaurantById(restaurantId string) (models.Restaurant, error) {
	database := ConnectDatabase()
	defer database.Close()

	var restaurant models.Restaurant

	sqlStatement := "SELECT * FROM restaurant__restaurantDetail WHERE restaurant_id=$1"

	row := database.QueryRow(sqlStatement, restaurantId)
	err := row.Scan(
		&restaurant.RestaurantId,
		&restaurant.RestaurantName,
		&restaurant.Latitude,
		&restaurant.Longitude,
		&restaurant.Introduction,
		&restaurant.Detail,
		&restaurant.AddressDetail,
		&restaurant.SubDistrict,
		&restaurant.District,
		&restaurant.Province,
		&restaurant.Postcode,
		&restaurant.TelPhones,
		&restaurant.MobilePhones,
		&restaurant.FaxNumber,
		&restaurant.Emails,
		&restaurant.Urls,
		&restaurant.ThumbnailUrl,
		&restaurant.Monday,
		&restaurant.Tuesday,
		&restaurant.Wednesday,
		&restaurant.Thursday,
		&restaurant.Friday,
		&restaurant.Saturday,
		&restaurant.Sunday,
		&restaurant.Standard,
		&restaurant.CreationTime,
		&restaurant.DeletionTime,
		&restaurant.UpdatedTime,
	)

	if err != nil {
		log.Fatalf("no row were returned. %v", err)
	}

	sqlStatement = `SELECT r.restaurant_type_id, t.description
					FROM restaurant__regis_restaurantType r
					INNER JOIN restaurant__restaurantType t
					ON r.restaurant_type_id  = t.restaurant_type_id
					AND r.restaurant_id = $1`

	rows1, err := database.Query(sqlStatement, restaurantId)
	defer rows1.Close()
	if err != nil {
		log.Fatalf("unable to execute the query. %v", err)
	}

	for rows1.Next() {
		var restaurantType models.RestaurantType
		err = rows1.Scan(
			&restaurantType.TypeId,
			&restaurantType.Description,
		)
		if err != nil {
			log.Fatalf("unable to scan the row for restaurant type. %v", err)
		}
		restaurant.RestaurantTypes = append(restaurant.RestaurantTypes, restaurantType)
	}

	if restaurant.RestaurantTypes == nil {
		restaurant.RestaurantTypes = make([]models.RestaurantType, 0)
	}

	sqlStatement = `SELECT r.cuisine_type_id, t.description
					FROM restaurant__regis_cuisineType r
					INNER JOIN restaurant__cuisineType t
					ON r.cuisine_type_id  = t.cuisine_type_id
					AND r.restaurant_id = $1`

	rows2, err := database.Query(sqlStatement, restaurantId)
	defer rows2.Close()

	for rows2.Next() {
		var cuisineType models.CuisineType
		err = rows2.Scan(
			&cuisineType.CuisineType,
			&cuisineType.Description,
		)
		if err != nil {
			log.Fatalf("unable to scan the row for cuisine type. %v", err)
		}
		restaurant.CuisineTypes = append(restaurant.CuisineTypes, cuisineType)
	}
	if restaurant.CuisineTypes == nil {
		restaurant.CuisineTypes = make([]models.CuisineType, 0)
	}

	sqlStatement = `SELECT r.michelin_id, t.name, t.year
					FROM restaurant__regis_michelins r
					INNER JOIN restaurant__michelin t
					ON r.michelin_id  = t.michelin_id
					AND r.restaurant_id = $1`

	rows3, err := database.Query(sqlStatement, restaurantId)
	defer rows3.Close()

	for rows3.Next() {
		var michelin models.Michelin
		err = rows3.Scan(
			&michelin.MichelinId,
			&michelin.Name,
			&michelin.Year,
		)
		if err != nil {
			log.Fatalf("unable to scan the row for michelin. %v", err)
		}
		restaurant.Michelins = append(restaurant.Michelins, michelin)
	}
	if restaurant.Michelins == nil {
		restaurant.Michelins = make([]models.Michelin, 0)
	}

	return restaurant, err
}
