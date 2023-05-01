import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { City } from './city';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
}
