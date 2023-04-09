import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PaymentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
}
