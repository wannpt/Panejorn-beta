package models

type User struct {
	UserId       int       `json:"userId"`
	Email        string    `json:"email"`
	Password     string    `json:"password"`
	FirstName    string    `json:"firstName"`
	LastName     string    `json:"lastName"`
	DateOfBirth  int       `json:"dob"`
	Status       int       `json:"status"`
	Image        []byte    `json:"image"`
	Tag1         float64   `json:"tag1"`
	Tag2         float64   `json:"tag2"`
	Tag3         float64   `json:"tag3"`
	Tag4         float64   `json:"tag4"`
	Tag5         float64   `json:"tag5"`
	CreationTime int64     `json:"creationTime"`
	DeletionTime NullInt64 `json:"deletionTime"`
	UpdatedTime  NullInt64 `json:"updatedTime"`
}
