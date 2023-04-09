import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
}
