package resources

import (
	"fmt"
)

func Minute2ClockRangeString(start_minute, end_minute, myFormat int) string {
	var strClock string
	start_hour := start_minute / 60
	start_minute -= start_hour * 60
	end_hour := end_minute / 60
	end_minute -= end_hour * 60
	if myFormat == 1 {
		strClock = fmt.Sprintf("%02d.%02d - %02d.%02d น.", start_hour, start_minute, end_hour, end_minute)
	}
	return strClock
}
