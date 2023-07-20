import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('first')
export class FirstEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
