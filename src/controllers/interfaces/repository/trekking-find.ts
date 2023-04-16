export interface TrekkingFindWhereOption {
    name?: string;
    state?: {
        id: number
    },
    city?: {
        id: number
    },
    durationInHours?:number,
    distanceInMeters?: number,
    difficultLevel?: {
        id:number
    }
}