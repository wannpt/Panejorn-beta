package models

type PlanDetail struct {
	Id           int       `json:"Id"`
	PlanId       int       `json:"planId"`
	PlaceId      string    `json:"placeId"`
	PlaceName    string    `json:"placeName"`
	Day          int       `json:"day"`
	StartTime    int       `json:"startTime"`
	EndTime      int       `json:"endTime"`
	Status       int       `json:"status"`
	Tag1         float64   `json:"tag1"`
	Tag2         float64   `json:"tag2"`
	Tag3         float64   `json:"tag3"`
	Tag4         float64   `json:"tag4"`
	Tag5         float64   `json:"tag5"`
	CreationTime int64     `json:"creationTime"`
	DeletionTime NullInt64 `json:"deletionTime"`
	UpdatedTime  NullInt64 `json:"updatedTime"`
}
