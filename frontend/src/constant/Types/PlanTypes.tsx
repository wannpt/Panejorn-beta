
export type PlaceType = {
    placeId: string,
    placeType: string,
    placeName: string,
    timeRange: string,
}

export interface PlaceDetails extends PlaceType {
    //need works
}

type details = {
    day: number,
    date: string,
    detail: PlaceType[]
}

export type PlanType = {
    planId: number,
    planName: string,
    dateRange: string,
    province: string,
    planDetail: details[]
}