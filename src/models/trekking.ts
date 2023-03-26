import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { State } from './state';
import { City } from './city';
import { DifficultLevel } from './difficult-level';

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

  @OneToOne(() => State, (state) => state.id)
  state_id: State;

  @OneToOne(() => City, (city) => city.id)
  city_id: City;

  @Column()
  distance_in_meters: number;

  @Column()
  duration_in_hours: number;

  @OneToOne(() => DifficultLevel, (difficultLevel) => difficultLevel.id)
  difficult_level_id: DifficultLevel;

  @Column()
  minimun_people_amount: number;

  @Column()
  miximun_people_amount: number;

  @Column()
  days_to_close_group: number;

  @Column()
  days_to_half_of_payment: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  @DeleteDateColumn()
  deleted_at?: Date;
}
