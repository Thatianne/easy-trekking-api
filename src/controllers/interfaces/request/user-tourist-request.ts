export interface UserTouristRequest {
  name: string;
  email: string;
  password: string;
  documents: document[];
  phone: string;
}

interface document {
  type: number;
  value: string;
}
