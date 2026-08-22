import { Controller } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { User } from '@barber/database';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.get')
  async getUser(
    @Payload()
    payload: {
      userId: string;
    },
  ): Promise<User | null> {
    return this.usersService.findById(payload.userId);
  }
}
