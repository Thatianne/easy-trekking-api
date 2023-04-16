import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
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

  @Column()
  name: string;

  @Column()
  start: string;

  @Column()
  end: string;

  @ManyToOne(() => State)
  state: State;

  @ManyToOne(() => City)
  city: City;

  @Column()
  distanceInMeters: number;

  @Column()
  durationInHours: number;

  @ManyToOne(() => DifficultLevel)
  difficultLevel: DifficultLevel;

  @OneToMany(() => TrekkingDescription, (description) => description.trekking, { cascade: true })
  descriptions: TrekkingDescription[];

  @OneToMany(() => TrekkingImage, (image) => image.trekking, { cascade: true })
  images: TrekkingImage[];

  @OneToMany(() => TrekkingPrice, (price) => price.trekking, { cascade: true })
  prices: TrekkingPrice[];

  @Column()
  minPeople: number;

  @Column()
  maxPeople: number;

  @Column()
  daysFormGroup: number;

  @Column()
  daysCompletePayment: number;

  @OneToMany(() => TrekkingRate, (rate) => rate.trekking)
  rates: TrekkingRate[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

}
