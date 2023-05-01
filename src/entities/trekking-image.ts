import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Trekking } from './trekking';

@Entity()
export class TrekkingImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trekking, (trekking) => trekking.id)
  trekking: Trekking;

  @Column({ type: 'mediumblob' })
  image: Buffer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
