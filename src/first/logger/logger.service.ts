import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  logger(message: any) {
    console.log('from logger');
    console.log(message);
  }
}
