import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user';
import { DocumentType } from './document-type';

@Entity()
export class UserDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => DocumentType)
  @JoinColumn()
  documentType: DocumentType;

  @Column()
  document: number; // TODO change type on EER Diagram

  @Column({ type: 'mediumblob' })
  image: Buffer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
