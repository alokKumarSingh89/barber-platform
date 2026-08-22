import { Controller } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { User } from '@barber/database';
import { type GetUserRequest, USER_PATTERNS } from '@barber/contracts';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_PATTERNS.GET)
  async getUser(
    @Payload()
    payload: GetUserRequest,
  ): Promise<User | null> {
    return this.usersService.findById(payload.userId);
  }
}
