import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_PATTERNS, type CreateCustomerRequest } from '@barber/contracts';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERNS.CREATE_CUSTOMER)
  async createCustomer(@Payload() payload: CreateCustomerRequest) {
    return this.authService.createCustomer(payload);
  }
}
