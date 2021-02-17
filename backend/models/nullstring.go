package models

import (
	"database/sql/driver"
	"errors"

	res "app/resources"
)

type NullString string

func (s *NullString) Scan(value interface{}) error {
	if value == nil {
		*s = ""
		return nil
	}

	var strVal string

	switch value.(type) {
	case []uint8:
		uint8Val := value.([]uint8)
		strVal = res.Byte2String(uint8Val)
		break
	default:
		var ok bool
		strVal, ok = value.(string)
		if !ok {
			return errors.New("column is not a string")
		}
		break
	}

	*s = NullString(strVal)
	return nil
}

func (s NullString) Value() (driver.Value, error) {
	if len(s) == 0 {
		return "", nil
	}
	return string(s), nil
}
