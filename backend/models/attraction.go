package models

type Attraction struct {
	AttractionId        string           `json:"placeId"`
	AttractionName      string           `json:"placeName"`
	Latitude            float64          `json:"latitude"`
	Longitude           float64          `json:"longitude"`
	Introduction        NullString       `json:"introduction"`
	Detail              NullString       `json:"detail"`
	Activities          NullString       `json:"activities"`
	ThaiChildFee        float64          `json:"thaiChildFee"`
	ThaiAdultFee        float64          `json:"thaiAdultFee"`
	ForeignChildFee     float64          `json:"foreignChildFee"`
	ForeignAdultFee     float64          `json:"foreignAdultFee"`
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
	CreationTime        int64            `json:"creationTime"`
	DeletionTime        NullInt64        `json:"deletionTime"`
	UpdatedTime         NullInt64        `json:"updatedTime"`
	AttractionTypes     []AttractionType `json:"Types"`
	Facilities          []Facility       `json:"facilities"`
}
