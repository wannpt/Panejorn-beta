package models

type Restaurant struct {
	RestaurantId    string           `json:"placeId"`
	RestaurantName  string           `json:"placeName"`
	Latitude        float64          `json:"latitude"`
	Longitude       float64          `json:"longitude"`
	Introduction    NullString       `json:"introduction"`
	Detail          NullString       `json:"detail"`
	AddressDetail   NullString       `json:"addressDetail"`
	SubDistrict     string           `json:"subDistrict"`
	District        string           `json:"district"`
	Province        string           `json:"province"`
	Postcode        string           `json:"postcode"`
	TelPhones       NullString       `json:telPhones`
	MobilePhones    NullString       `json:"mobilePhones"`
	FaxNumber       NullString       `json:"faxNumber"`
	Emails          NullString       `json:emails`
	Urls            NullString       `json:"urls"`
	ThumbnailUrl    string           `json:"thumbnalUrl"`
	Monday          NullString       `json:"monday"`
	Tuesday         NullString       `json:"tuesday"`
	Wednesday       NullString       `json:"wednesday"`
	Thursday        NullString       `json:"thursday"`
	Friday          NullString       `json:"friday"`
	Saturday        NullString       `json:"saturday"`
	Sunday          NullString       `json:"sunday"`
	Standard        NullString       `json:"standard"`
	CreationTime    int64            `json:"creationTime"`
	DeletionTime    NullInt64        `json:"deletionTime"`
	UpdatedTime     NullInt64        `json:"updatedTime"`
	RestaurantTypes []RestaurantType `json:"types"`
	CuisineTypes    []CuisineType    `json:"cuisineTypes"`
	Michelins       []Michelin       `json:"michelins"`
}
