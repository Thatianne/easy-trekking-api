import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Group } from './group';
import { User } from './user';
import { PaymentStatus } from './payment-status';

@Entity()
export class TouristUserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, group => group.tourists)
  group: Group;

  @ManyToOne(() => User, user => user.touristUserGroups)
  user: User;

  @ManyToOne(() => PaymentStatus)
  paymentStatus: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
