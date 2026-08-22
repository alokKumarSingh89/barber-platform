import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadEnv } from '@barber/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const config = loadEnv();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [config.NATS_URL],
        queue: 'auth-service',
        gracefulShutdown: true,
        gracePeriod: 5000,
      },
    },
  );
  await app.listen();
}
bootstrap();
