import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Group } from './group';
import { User } from './user';
import { PaymentStatus } from './payment-status';

@Entity()
export class TouristUserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group)
  group: Group;

  @ManyToOne(() => User)
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
