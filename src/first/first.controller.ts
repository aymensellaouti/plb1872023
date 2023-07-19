import { Body, Controller, Get, Post } from '@nestjs/common';
import { FirstService } from './first.service';
import { FusionPipe } from '../common/pipe/fusion/fusion.pipe';

@Controller('first')
export class FirstController {
  constructor(private firstService: FirstService) {}
  @Get()
  first() {
    this.firstService.sayCc();
    return 'First';
  }
  @Post()
  post(@Body('skills', FusionPipe) skills: string) {
    this.firstService.sayCc();
    return skills;
  }
}
