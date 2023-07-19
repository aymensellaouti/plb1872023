import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('Filter 1');
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse();
    response.status(exception.getStatus()).json({
      status: exception.getStatus(),
      createdAt: new Date().toISOString(),
      message: `Le message de l'erreur est: ${exception.message}`,
    });
    return response;
  }
}
