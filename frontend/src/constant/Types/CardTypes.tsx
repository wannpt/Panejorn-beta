export type CardType = {
    planName: string,
    dateRange: string,
    province: string,
    planScore: number,
    isPinned?: boolean,
    planID: number
}

export interface StatusCard extends CardType {
    nextLoc: string
    time: string
}

export type CardCollections = {
    pinnedPlans: CardType[],
    plans: CardType[]
}