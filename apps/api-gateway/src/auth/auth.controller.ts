import {
  AUTH_PATTERNS,
  type RequestOtpResponse,
  type RequestOtpRequest,
  type VerifyOtpRequest,
  VerifyOtpResponse,
} from '@barber/contracts';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('otp/request')
  async requestOtp(
    @Body() body: RequestOtpRequest,
  ): Promise<RequestOtpResponse> {
    return firstValueFrom(
      this.authClient.send(AUTH_PATTERNS.REQUEST_OTP, body),
    );
  }

  @Post('otp/verify')
  async verifytOtp(@Body() body: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return firstValueFrom(this.authClient.send(AUTH_PATTERNS.VERIFY_OTP, body));
  }
}
