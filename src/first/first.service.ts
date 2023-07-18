import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class FirstService {
  constructor(private loggerService: LoggerService) {}
  sayCc() {
    this.loggerService.logger('cc');
  }
}
