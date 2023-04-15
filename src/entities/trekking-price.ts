import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Trekking } from './trekking';

@Entity()
export class TrekkingPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trekking, (trekking) => trekking.id)
  trekking: Trekking;

  @Column()
  price: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
