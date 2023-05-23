import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm';
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

  @Column()
  date: Date;

  @ManyToOne(() => User)
  lastTouristGuideInvited: User;

  @ManyToOne(() => Trekking, (trekking) => trekking.id)
  trekking: Trekking;

  @ManyToOne(() => GroupStatus, (groupStatus) => groupStatus.id)
  groupStatus: GroupStatus;

  @ManyToOne(() => User, (touristGuideUser) => touristGuideUser.id)
  touristGuideUser: User;

  @OneToMany(() => TouristUserGroup, (touristUserGroup) => touristUserGroup.group)
  tourists: TouristUserGroup[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
