import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Trekking } from './trekking';

@Entity()
export class TrekkingDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trekking, (trekking) => trekking.id)
  trekking: Trekking;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
