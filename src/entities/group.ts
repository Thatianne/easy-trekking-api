import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Trekking } from './trekking';
import { GroupStatus } from './group-status';
import { User } from './user';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Trekking)
  trekking: Trekking;

  @OneToOne(() => GroupStatus)
  groupStatus: GroupStatus;

  @OneToOne(() => User)
  touristGuideUser: User;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: number;

  @Column()
  phone: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
