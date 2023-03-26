import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Role } from './role';
import { Association } from './association';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
