import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FirstEntity } from './entity/first.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FirstService {
  constructor(
    private loggerService: LoggerService,

    @InjectRepository(FirstEntity)
    private firstRepository: Repository<FirstEntity>,
  ) {}
  sayCc() {
    this.firstRepository.save;
    this.loggerService.logger('cc');
  }
}
