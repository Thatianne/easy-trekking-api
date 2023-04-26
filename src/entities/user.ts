import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne, ManyToMany,OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Role } from './role';
import { Association } from './association';
import { UserDocument } from './user-document';
import { Trekking } from './trekking';
import { Group } from './group';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToMany(() => Association)
  @JoinTable()
  associations: Association[];

  @ManyToMany(() => Trekking)
  trekkings: Trekking[];

  @OneToMany(() => UserDocument, (userDocument) => userDocument.user, { cascade: true })
  documents: UserDocument[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
