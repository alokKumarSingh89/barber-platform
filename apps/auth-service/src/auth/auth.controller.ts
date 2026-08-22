import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AUTH_PATTERNS,
  type RequestOtpRequest,
  type CreateCustomerRequest,
  type CreateCustomerResponse,
  type VerifyOtpRequest,
} from '@barber/contracts';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERNS.CREATE_CUSTOMER)
  async createCustomer(
    @Payload() payload: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    return this.authService.createCustomer(payload);
  }

  @MessagePattern(AUTH_PATTERNS.REQUEST_OTP)
  async requestOtp(@Payload() payload: RequestOtpRequest) {
    return this.authService.requestOtp(payload.phone);
  }

  @MessagePattern(AUTH_PATTERNS.VERIFY_OTP)
  async verifyOtp(
    @Payload()
    payload: VerifyOtpRequest,
  ) {
    return this.authService.verifyOtp(payload.phone, payload.code);
  }
}
