export interface TrekkingRequest {
  name: string;
  start: string;
  end: string;
  state: number;
  city: number;
  distanceInMeters: number;
  durationInHours: number;
  difficultLevel: number;
  descriptions: DescriptionRequest[];
  description: string;
  images: ImageRequest[];
  prices: PriceDataRequest[];
  minPeople: number;
  maxPeople: number;
  daysFormGroup: number;
  daysCompletePayment: number;
}

interface DescriptionRequest {
  id?: number;
  description: string;
}

interface ImageRequest {
  id?: number;
  image: string;
}

export interface TrekkingFindRequest {
  ids: string;
  name: string;
  state: number;
  city: number;
  durationInHours: number;
  distanceInMeters: number;
  difficultLevel: number;
  isAvailable?: boolean;
}

export interface TrekkingDeleteRequest {
  id: string;
}

interface PriceDataRequest {
  id?: number;
  startDate: string; // date.toISOString()
  endDate: string;
  price: number;
}

export interface SubscribeTrekkingRequest {
  date: string;
}

export interface DefineAbleToGuideTrekkingsRequest {
  trekkings: number[];
}
