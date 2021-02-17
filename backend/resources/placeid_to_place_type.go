package resources

import (
	"strings"
)

var PLACE_ID []string = []string{"P03", "P08", "P02"}
var PLACE_TYPE []string = []string{"ATTRACTION", "RESTAURANT", "ACCOMMODATION"}

func PlaceId2PlaceType(placeId string) string {
	for i := range PLACE_ID {
		if strings.Contains(placeId, PLACE_ID[i]) {
			return PLACE_TYPE[i]
		}
	}
	return "OTHER"
}
