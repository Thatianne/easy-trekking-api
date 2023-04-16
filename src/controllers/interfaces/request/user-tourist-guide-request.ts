export interface UserTouristGuideRequest {
    name: string;
    email: string;
    password: string;
    associations: number[];
    documents: document[];
    phone: string;
}

export interface DefineAbleToGuideTrekkingsRequest {
    trekkings: number[];
}

interface document {
  type: number;
  value: string;
}
