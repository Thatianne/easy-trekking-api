import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Trekking } from './trekking';
import { GroupStatus } from './group-status';
import { User } from './user';
import { TouristUserGroup } from './tourist-user-group';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Trekking, (trekking) => trekking.id)
  trekking: Trekking;

  @ManyToOne(() => GroupStatus, (groupStatus) => groupStatus.id)
  groupStatus: GroupStatus;

  @OneToOne(() => User)
  touristGuideUser: User;

  @ManyToMany(() => TouristUserGroup)
  tourists: TouristUserGroup[];

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
