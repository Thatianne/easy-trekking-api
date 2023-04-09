import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { User } from './user'

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToMany(() => User)
  @JoinTable()
  touristGuides: User[];
}
