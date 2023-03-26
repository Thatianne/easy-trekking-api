import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user';
import { DocumentType } from './document-type';

@Entity()
export class UserDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinTable()
  user: User;

  @OneToOne(() => DocumentType)
  documentType: DocumentType;

  @Column()
  document: number; // TODO change type on EER Diagram

  @Column({ type: 'mediumblob' })
  image: Buffer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
