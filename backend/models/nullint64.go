package models

import (
	"errors"
)

type NullInt64 int64

func (i *NullInt64) Scan(value interface{}) error {
	if value == nil {
		*i = 0
		return nil
	}
	intVal, ok := value.(int64)
	if !ok {
		return errors.New("column is not an integer64")
	}
	*i = NullInt64(intVal)
	return nil
}
