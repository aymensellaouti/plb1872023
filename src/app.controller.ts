import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  getHello(): string {
    console.log('GET');
    return 'GET';
  }
  @Post('')
  postPostHello(): string {
    console.log('Post');
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
