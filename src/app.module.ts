import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { FirstModule } from './first/first.module';
import { SecondModule } from './second/second.module';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { FirstMiddleware } from './common/middleware/first/first.middleware';
import { FirstController } from './first/first.controller';
import { AuthMiddleware } from './auth/middleware/auth/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { loadConfig } from './config/loader.config';

@Module({
  imports: [
    FirstModule,
    SecondModule,
    TodoModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: loadConfig(),
    }),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirstMiddleware)
      .forRoutes(
        /*   { path: 'first', method: RequestMethod.GET } */
        FirstController,
      )
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'todo', method: RequestMethod.POST },
        { path: 'todo*', method: RequestMethod.PATCH },
        { path: 'todo*', method: RequestMethod.DELETE },
      );
  }
}
