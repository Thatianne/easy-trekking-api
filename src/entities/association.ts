import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { User } from './user';

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToMany(() => User)
  @JoinTable()
  touristGuides: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
