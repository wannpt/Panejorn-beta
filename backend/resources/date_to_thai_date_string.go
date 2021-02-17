package resources

import (
	"fmt"
	"time"
)

var FULL_MONTH_TH []string = []string{"มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม",
	"มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม",
	"พฤศจิกายน", "ธันวาคม"}
var MONTH_TH []string = []string{"ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.",
	"มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.",
	"พ.ย.", "ธ.ค."}

func Date2ThaiDateString(t time.Time, myFormat int) string {
	var strDate string
	day, month, year := t.Day(), t.Month(), t.Year()
	if myFormat == 1 { // e.g. 01 ก.ย. 63
		strDate = fmt.Sprintf("%02d %s %d", day, MONTH_TH[int(month)-1], (year+543)%100)
	} else if myFormat == 2 { // e.g. 01 กันยายน 2563
		strDate = fmt.Sprintf("%02d %s %d", day, FULL_MONTH_TH[int(month)-1], year+543)
	}
	return strDate
}
