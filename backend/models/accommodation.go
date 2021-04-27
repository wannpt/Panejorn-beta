package models

type Accommodation struct {
	AccommodationId     string     `json:"placeId"`
	AccommodationName   string     `json:"placeName"`
	Latitude            float64    `json:"latitude"`
	Longitude           float64    `json:"longitude"`
	Introduction        NullString `json:"introduction"`
	Detail              NullString `json:"detail"`
	HotelStar           NullString `json:"hotelStar"`
	DisplayCheckinTime  NullString `json:"checkinTime"`
	DisplayCheckoutTime NullString `json:"checkoutTime"`
	NumberOfRooms       NullString `json:"numberOfRooms"`
	PriceRange          NullString `json:"priceRange"`
	AddressDetail       NullString `json:"addressDetail"`
	SubDistrict         string     `json:"subDistrict"`
	District            string     `json:"district"`
	Province            string     `json:"province"`
	Postcode            string     `json:"postcode"`
	TelPhones           NullString `json:telPhones`
	MobilePhones        NullString `json:"mobilePhones"`
	FaxNumber           NullString `json:"faxNumber"`
	Emails              NullString `json:emails`
	Urls                NullString `json:"urls"`
	ThumbnailUrl        string     `json:"thumbnalUrl"`
	Standard            NullString `json:"standard"`
	CreationTime        int64      `json:"creationTime"`
	DeletionTime        NullInt64  `json:"deletionTime"`
	UpdatedTime         NullInt64  `json:"updatedTime"`
	Facilities          []Facility `json:"facility"`
	Services            []Service  `json:"service"`
}
