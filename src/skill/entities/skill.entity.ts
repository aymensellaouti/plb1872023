import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skill')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  designation: string;
}
