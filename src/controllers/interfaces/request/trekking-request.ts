export interface TrekkingRequest {
    name: string;
    start: string;
    end: string;
    state: number;
    city: number;
    distanceInMeters: number;
    durationInHours: number;
    difficultLevel: number;
    descriptions: string[];
    images: string[];
    prices: PriceDataRequest[];
    minPeople: number;
    maxPeople: number;
    daysFormGroup: number;
    daysCompletePayment: number;
}

export interface TrekkingFindRequest {
    ids: string;
    name: string
    state: number;
    city: number;
    durationInHours: number;
    distanceInMeters: number;
    difficultLevel: number;
}

export interface TrekkingDeleteRequest {
    id: string
}

interface PriceDataRequest {
    startDate: string, // date.toISOString()
    endDate: string,
    price: number
}

export interface SubscribeTrekkingRequest {
  userId: number; // TODO Use from authenticated user
  date: string;
}

export interface DefineAbleToGuideTrekkingsRequest {
    trekkings: number[];
    userId: number; // TODO Use from authenticated user
}

export interface GetAbleToGuideTrekkingsRequest {
    userId: number; // TODO Use from authenticated user
}
