package resources

import (
	"log"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) string{
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Panic("unable to hash password. ", err)
	}
	return string(bytes)
}