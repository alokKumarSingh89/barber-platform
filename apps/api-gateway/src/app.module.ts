import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { CorrelationIdMiddleware } from './common/correlation-id.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, HealthModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('');
  }
}
