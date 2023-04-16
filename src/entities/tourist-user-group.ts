import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Group } from './group';
import { User } from './user';
import { PaymentStatus } from './payment-status';

@Entity()
export class TouristUserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Group)
  group_id: Group;

  @OneToOne(() => User)
  user_id: User;

  @OneToOne(() => PaymentStatus)
  paymentStatusId: PaymentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at?: Date;
}
