export interface UserTouristGuideRequest {
    name: string;
    email: string;
    password: string;
    associations: number[];
    documents: document[];
    phone: string;
}

interface document {
  type: number;
  value: string;
}
