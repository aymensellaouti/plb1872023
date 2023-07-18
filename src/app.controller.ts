import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller()
export class AppController {
  /*   @Get(':qqueChose')
  getQqeChose(@Param('qqueChose') qqueChose): string {
    console.log(qqueChose);
    return qqueChose;
  } */
  @Get('')
  getHello(): Observable<string> {
    console.log('GET');
    return of('1', '2', '3');
    /* permet de déclencher une erreur 404  */
    throw new NotFoundException('');
  }
  @Post('')
  postPostHello(@Body('name') postBody): string {
    console.log('Post');
    console.log({ postBody });

    return 'Post';
  }
  @Put('')
  putHello(): string {
    console.log('Put');
    return 'Put';
  }

  @Patch('')
  patchHello(): string {
    console.log('Patch');
    return 'Patch';
  }

  @Delete('')
  deleteHello(): string {
    console.log('Delete');
    return 'Delete';
  }
  @Get('cc2')
  getHello2(): string {
    return 'cc2';
  }
}
