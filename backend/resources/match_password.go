package resources

import (
	"golang.org/x/crypto/bcrypt"
)

func MatchPassword(hashedPassword string, password string) bool {
	byteHashedPassword := []byte(hashedPassword)
	bytePassword := []byte(password)
	if err := bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword); err != nil { // Both of them don't match together
		return false
	}
	return true
}