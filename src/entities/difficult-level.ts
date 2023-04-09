import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DifficultLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
}
