import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthController } from './auth.controller';
import { loadEnv } from '@barber/config';
const config = loadEnv();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [config.NATS_URL],
          queue: 'api-gateway-auth',
        },
      },
    ]),
  ],

  controllers: [AuthController],
})
export class AuthModule {}
