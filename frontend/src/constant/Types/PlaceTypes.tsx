export type AttractionPlace = {
	placeId: string;
	placeName: string;
	latitude: number;
	longtitude: number;
	introduction: string;
	detail: string;
	activities: string;
	thaiChildFee: number;
	thaiAdultFee: number;
	foreignChildFee: number;
	foreignAdultFee: number;
	facilities: {typeId: string, description: string}[];
	types: {typeId: number, description: string}[];
	targets: any;
	addressDetail: string;
	subDistrict: string;
	district: string;
	province: string;
	postcode: string;
	telPhones: string;
	mobilePhone: string;
	faxNumber: string;
	email: string;
	urls: string;
	thumbnalUrl: string;
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sunday: string;
	recommendedDuration: number;
	tag1: number;
	tag2: number;
	tag3: number;
	tag4: number;
	tag5: number;
};

export type AccommodationPlace = {
	placeId: string;
	placeName: string;
	hotelStar: string;
	detail: string;
	facility: {typeId: string, description: string}[];
	service: {typeId: string, description: string}[];
	priceRange: string;
	numberOfRooms: string;

	addressDetail: string;
	district: string;
	subDistrict: string;
	province: string;
	postcode: string;

	emails: string;
	faxNumber: string;
	mobilePhones: string;
	telPhones: string;

	thumbnalUrl: string;

	introduction: string;
	latitude: number;
	longtitude: number;

	checkinTime: number;
	checkoutTime: number;
	creationTime: number;
	deletionTime: number;
	updatedTime: number;
	urls: string;
};
