import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import * as morgan from 'morgan';
import { CustomFilter } from './filter/custom/custom.filter';
import { FirstInterceptor } from './interceptors/first/first.interceptor';
import { DurationInterceptor } from './interceptors/duration.interceptor';
import { ResponseTransformationInterceptor } from './interceptors/response-transformation/response-transformation.interceptor';
import { NullConvertorInterceptor } from './interceptors/nullConvertor.interceptor';

import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

const corsOptions = {
  origin: ['http://localhost:4201', 'http://localhost:4200'],
  optionsSuccessStatus: 200,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*   app.useGlobalFilters(new CustomFilter()); */
  dotenv.config();

  const configService = app.get(ConfigService);
  console.log({ port: configService.get('port') });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new FirstInterceptor());
  app.useGlobalInterceptors(new DurationInterceptor());
  app.useGlobalInterceptors(new ResponseTransformationInterceptor());
  app.useGlobalInterceptors(new NullConvertorInterceptor());
  app.enableCors(corsOptions);
  app.use(morgan('tiny'));
  app.use(loggerMiddleware);
  await app.listen(3000);
}
bootstrap();
