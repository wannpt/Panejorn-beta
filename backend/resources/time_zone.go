package resources

import (
	"log"
	"os"
	"time"
)

func TimeZone(t time.Time) time.Time {
	location := os.Getenv("TZ")
	loc, err := time.LoadLocation(location)
	if err != nil {
		log.Fatalf("cannot get location from this time zone. %v", err)
	}
	return t.In(loc)
}
