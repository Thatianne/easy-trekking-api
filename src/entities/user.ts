import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Role } from './role';
import { Association } from './association';
import { UserDocument } from './user-document';
import { Trekking } from './trekking';
import { Group } from './group';
import { TouristUserGroup } from './tourist-user-group';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  phone: string;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToMany(() => Association)
  @JoinTable()
  associations: Association[];

  @OneToMany(() => Group, group => group.touristGuideUser)
  guideGroups: Group[];

  @OneToMany(() => TouristUserGroup, touristUserGroup => touristUserGroup.user)
  touristUserGroups: TouristUserGroup[];

  @ManyToMany(() => Trekking, (trekking) => trekking.touristGuides)
  ableToGuideTrekkings: Trekking[];

  @OneToMany(() => UserDocument, (userDocument) => userDocument.user, {
    cascade: true
  })
  documents: UserDocument[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
