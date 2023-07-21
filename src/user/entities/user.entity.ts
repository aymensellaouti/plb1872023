import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Timestamp } from '../../common/database/timestamp.database';
import { Cv } from '../../cv/entities/cv.entity';

@Entity('user')
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
  })
  username: string;
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];
}
