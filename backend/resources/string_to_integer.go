package resources

import (
	"strconv"
	"errors"
)

func Str2Int(str string) (int, error){
	i, err := strconv.Atoi(str)
	if err != nil {
		return 0, errors.New("cannot convert string to integer")
	}
	return i, nil
}