export interface UserTouristGuideRequest {
    name: string;
    email: string;
    password: string;
    associations: number[];
    phone: string;
}

export interface DefineAbleToGuideTrekkingsRequest {
    trekkings: number[];
}