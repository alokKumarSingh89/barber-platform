import { Controller, Get, Headers, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MessageEnvelope, USER_PATTERNS } from '@barber/contracts';
import { randomUUID } from 'crypto';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}
  @Get('me')
  async me(@CurrentUser() user: { userId: string }) {
    return firstValueFrom(
      this.userClient.send<unknown>(USER_PATTERNS.ME, {
        userId: user.userId,
      }),
    );
  }
  @Get(':id')
  async getUser(
    @Param('id') id: string,
    @Headers('x-correlation-id') correlationIdHeader?: string,
  ) {
    const correlationId = correlationIdHeader ?? randomUUID();
    const message: MessageEnvelope<{
      userId: string;
    }> = {
      metadata: {
        correlationId,
        timestamp: new Date().toISOString(),
      },

      data: {
        userId: id,
      },
    };
    return firstValueFrom(
      this.userClient
        .send<unknown>(USER_PATTERNS.GET, message)
        .pipe(timeout(5000)),
    );
  }
}
