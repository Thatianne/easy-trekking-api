import { PriceDataRequest } from "./price-data-request";

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