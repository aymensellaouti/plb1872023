import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { GenericService } from '../common/service/generic-crud.service';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService extends GenericService<Skill> {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {
    super(skillRepository);
  }
}
