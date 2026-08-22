import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USER_PATTERNS } from '@barber/contracts';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return firstValueFrom(
      this.userClient.send<unknown>(USER_PATTERNS.GET, { userId: id }),
    );
  }
}
