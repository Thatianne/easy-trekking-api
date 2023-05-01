import { FindOperator } from 'typeorm';

export interface TrekkingFindWhereOption {
  id?: FindOperator<number>;
  name?: string;
  state?: {
    id: number;
  };
  city?: {
    id: number;
  };
  durationInHours?: number;
  distanceInMeters?: number;
  difficultLevel?: {
    id: number;
  };
}
