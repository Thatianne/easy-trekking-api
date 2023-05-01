import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { User } from './user';
import { Trekking } from './trekking';

@Entity()
export class TouristGuideRate {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => User)
  touristGuideUser: User;

  @OneToOne(() => Trekking)
  trekking: Trekking;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
