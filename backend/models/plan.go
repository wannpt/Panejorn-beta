package models

type Plan struct {
	PlanId           int          `json:"planId"`
	PlanName         string       `json:"planName"`
	StartDate        int64        `json:"startDate"`
	EndDate          int64        `json:"endDate"`
	Budget           int          `json:"budget"`
	NumberOfChildren int          `json:"numberOfChildren"`
	NumberOfAdults   int          `json:"numberOfAdults"`
	PlanScore        NullFloat64  `json:"planScore"`
	MainLocation     string       `json:"mainLocation"`
	Distance         float64      `json:"distance"`
	Diversity        float64      `json:"diversity"`
	Status           int          `json:"status"`
	UserID           int          `json:"userID"`
	Tag1             float64      `json:"tag1"`
	Tag2             float64      `json:"tag2"`
	Tag3             float64      `json:"tag3"`
	Tag4             float64      `json:"tag4"`
	Tag5             float64      `json:"tag5"`
	Pinned           bool         `json:"pinned"`
	CreationTime     int64        `json:"creationTime"`
	DeletionTime     NullInt64    `json:"deletionTime"`
	UpdatedTime      NullInt64    `json:"updatedTime"`
	PlanDetail       []PlanDetail `json:"planDetails"`
}
