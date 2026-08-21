import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  @MessagePattern('users.get')
  getUser(@Payload() payload: { userId: string }) {
    return {
      id: payload.userId,
      name: 'ALok User',
    };
  }
}
