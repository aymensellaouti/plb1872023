import { Module } from '@nestjs/common';
import { FirstController } from './first.controller';
import { FirstService } from './first.service';
import { LoggerService } from './logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirstEntity } from './entity/first.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FirstEntity])],
  controllers: [FirstController],
  providers: [FirstService, LoggerService],
})
export class FirstModule {}
