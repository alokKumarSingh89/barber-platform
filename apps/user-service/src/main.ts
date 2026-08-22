import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { loadEnv } from '@barber/config';
import { RpcExceptionFilter } from './common/rpc-exception.filter';

async function bootstrap() {
  const config = loadEnv();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [config.NATS_URL],
        queue: 'user-service',
        gracefulShutdown: true,
        gracePeriod: 5000,
      },
    },
  );
  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen();
}
bootstrap().catch(console.error);
