import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Role } from './role';
import { Association } from './association';
import { UserDocument } from './user-document';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: number;

  @Column()
  phone: number;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @ManyToMany(() => Association)
  associations: Association[];

  @OneToMany(() => UserDocument, (userDocument) => userDocument.user)
  documents: UserDocument[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
