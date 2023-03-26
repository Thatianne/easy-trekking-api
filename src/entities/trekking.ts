import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { State } from './state';
import { City } from './city';
import { DifficultLevel } from './difficult-level';
import { TrekkingDescription } from './trekking-description'
import { TrekkingImage } from './trekking-image'
import { TrekkingPrice } from './trekking-price'
import { TrekkingRate } from './trekking-rate'

@Entity()
export class Trekking {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => State)
  state: State;

  @OneToOne(() => City)
  city: City;

  @OneToMany(() => TrekkingDescription, (description) => description.trekking)
  descriptions: TrekkingDescription[];

  @OneToMany(() => TrekkingImage, (image) => image.trekking)
  images: TrekkingImage[];

  @OneToMany(() => TrekkingPrice, (price) => price.trekking)
  prices: TrekkingPrice[];

  @OneToMany(() => TrekkingRate, (rate) => rate.trekking)
  rates: TrekkingRate[];

  @OneToOne(() => DifficultLevel)
  difficultLevel: DifficultLevel;

  @Column()
  name: string;

  @Column()
  start: string;

  @Column()
  end: string;

  @Column()
  distanceInMeters: number;

  @Column()
  durationInHours: number;

  @Column()
  minimunPeopleAmount: number;

  @Column()
  miximunPeopleAmount: number;

  @Column()
  daysToCloseGroup: number;

  @Column()
  daysToHalfOfPayment: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
