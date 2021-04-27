package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"

	"backend/db"
	res "backend/resources"
)

func GetLocationDetail(c echo.Context) error {

	// Check session exists or not
	if !res.IsAuthenticated(c) {
		return c.NoContent(http.StatusForbidden)
	}

	placeId := c.QueryParam("placeId")
	placeType := res.PlaceId2PlaceType(placeId)

	var placeInformation interface{}
	var err error

	if placeType == "ATTRACTION" {
		placeInformation, err = db.GetAttractionById(placeId)
	} else if placeType == "RESTAURANT" {
		placeInformation, err = db.GetRestaurantById(placeId)
	} else if placeType == "ACCOMMODATION" {
		placeInformation, err = db.GetAccommodationById(placeId)
	} else {
		return c.JSON(http.StatusInternalServerError, nil)
	}

	if err != nil {
		return c.JSON(http.StatusInternalServerError, nil)
	} else {
		return c.JSON(http.StatusOK, placeInformation)
	}
}
