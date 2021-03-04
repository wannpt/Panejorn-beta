package handlers

import (
	"github.com/labstack/echo"
	"log"
	"net/http"

	"backend/db"
	res "backend/resources"
)

func GetLocationDetail(c echo.Context) error {
	placeId := c.QueryParam("placeId")
	placeType := res.PlaceId2PlaceType(placeId)

	var placeInformation interface{}
	var err error
	if placeType == "ATTRACTION" {
		placeInformation, err = db.GetAttractionById(placeId)
		if err != nil {
			log.Fatalf("unable to get information of place id %s. %v", placeId, err)
		}
	} else if placeType == "RESTAURANT" {
		placeInformation, err = db.GetRestaurantById(placeId)
		if err != nil {
			log.Fatalf("unable to get information of place id %s. %v", placeId, err)
		}
	} else if placeType == "ACCOMMODATION" {
		placeInformation, err = db.GetAccommodationById(placeId)
		if err != nil {
			log.Fatalf("unable to get information of place id %s. %v", placeId, err)
		}
	} else {
		log.Fatalf("not found this place id in any type.")
	}

	return c.JSON(http.StatusOK, placeInformation)
}
