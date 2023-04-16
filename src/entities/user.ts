import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany,OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
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
  password: string;

  @Column()
  phone: number;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToMany(() => Association)
  associations: Association[];

  @OneToMany(() => UserDocument, (userDocument) => userDocument.user, { cascade: true })
  documents: UserDocument[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
