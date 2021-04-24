package models

type User struct {
	UserId       int       `json:"userId"`
	Email        string    `json:"email"`
	Password     string    `json:"password"`
	Username     string    `json:"username"`
	DateOfBirth  int64     `json:"dob"`
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

func (u User) GetTagScores() []float64 {
	return []float64{u.Tag1, u.Tag2, u.Tag3, u.Tag4, u.Tag5}
}
