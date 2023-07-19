import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const date = new Date();

    return next.handle().pipe(
      tap((response) => {
        console.log(
          `La durée de la requète est ${
            new Date().getTime() - date.getTime()
          } ms`,
        );
      }),
    );
  }
}
