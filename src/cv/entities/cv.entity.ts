import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from '../../common/database/timestamp.database';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity('cv')
export class Cv extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne(() => User, (user) => user.cvs)
  user: User;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'cv_skills',
    joinColumn: {
      name: 'cv',
    },
    inverseJoinColumn: {
      name: 'skill',
    },
  })
  skills: Skill[];
}
