import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { QuotesModule } from './quotes/quotes.module';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middlewares/logging.middleware';

@Module({
  imports: [
    DrizzleModule,
    QuotesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
