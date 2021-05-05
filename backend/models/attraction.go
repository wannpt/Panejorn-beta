package models

type Attraction struct {
	AttractionId        string           `json:"placeId"`
	AttractionName      string           `json:"placeName"`
	Latitude            float64          `json:"latitude"`
	Longitude           float64          `json:"longitude"`
	Introduction        NullString       `json:"introduction"`
	Detail              NullString       `json:"detail"`
	Activities          NullString       `json:"activities"`
	ThaiChildFee        int          `json:"thaiChildFee"`
	ThaiAdultFee        int          `json:"thaiAdultFee"`
	ForeignChildFee     int          `json:"foreignChildFee"`
	ForeignAdultFee     int          `json:"foreignAdultFee"`
	Targets             NullString       `json:"targets"`
	AddressDetail       NullString       `json:"addressDetail"`
	SubDistrict         string           `json:"subDistrict"`
	District            string           `json:"district"`
	Province            string           `json:"province"`
	Postcode            string           `json:"postcode"`
	TelPhones           NullString       `json:"telPhones"`
	MobilePhones        NullString       `json:"mobilePhones"`
	FaxNumber           NullString       `json:"faxNumber"`
	Emails              NullString       `json:"emails"`
	Urls                NullString       `json:"urls"`
	ThumbnailUrl        string           `json:"thumbnalUrl"`
	Monday              string           `json:"monday"`
	Tuesday             string           `json:"tuesday"`
	Wednesday           string           `json:"wednesday"`
	Thursday            string           `json:"thursday"`
	Friday              string           `json:"friday"`
	Saturday            string           `json:"saturday"`
	Sunday              string           `json:"sunday"`
	RecommendedDuration int              `json:"recommendedDuration"`
	Tag1                float64          `json:"tag1"`
	Tag2                float64          `json:"tag2"`
	Tag3                float64          `json:"tag3"`
	Tag4                float64          `json:"tag4"`
	Tag5                float64          `json:"tag5"`
	CreationTime        int64            `json:"creationTime"`
	DeletionTime        NullInt64        `json:"deletionTime"`
	UpdatedTime         NullInt64        `json:"updatedTime"`
	AttractionTypes     []AttractionType `json:"types"`
	Facilities          []Facility       `json:"facilities"`
}
