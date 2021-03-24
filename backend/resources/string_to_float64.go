package resources

import (
	"strconv"
	"errors"
)

func Str2Float64(str string) (float64, error){
	i, err := strconv.ParseFloat(str, 64)
	if err != nil {
		return 0, errors.New("cannot convert string to integer")
	}
	return i, nil
}