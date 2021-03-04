
export type PlaceType = {
    placeID: string,
    placeType: string,
    placeName: string,
    timeRange: string,
}

export interface PlaceDetails extends PlaceType {
    //need works
}

export type PlanType = {
    planID: string,
    planName: string,
    dataRange: string,
    province: string,
    planDetails: {
        day: number,
        date: string,
        detail: PlaceType[],

    }[]
}