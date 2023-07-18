import { Controller, Get } from '@nestjs/common';
import { FirstService } from './first.service';

@Controller('first')
export class FirstController {
  constructor(private firstService: FirstService) {}
  @Get()
  first() {
    this.firstService.sayCc();
    return 'First';
  }
}
