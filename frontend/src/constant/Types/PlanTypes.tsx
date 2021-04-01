
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

export type CreatingPlanType = {
    planName: string,
    dateRange: string,
    province: string
    budget: number,
    //number of people? 
    
    //advance setting
    startTime? : string,
    endTime? : string,
    //5attributes
}
export interface PlanType extends CreatingPlanType {
    planId: number,
    planDetail: details[]
}

