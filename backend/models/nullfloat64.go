package models

import (
	"errors"
)

type NullFloat64 float64

func (s *NullFloat64) Scan(value interface{}) error {
	if value == nil {
		*s = 0
		return nil
	}
	floatVal, ok := value.(float64)
	if !ok {
		return errors.New("column is not a float")
	}
	*s = NullFloat64(floatVal)
	return nil
}
