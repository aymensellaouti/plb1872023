import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { GenericService } from '../common/service/generic-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService extends GenericService<Cv> {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {
    super(cvRepository);
  }
}
