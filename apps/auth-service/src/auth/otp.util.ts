import { randomInt } from 'crypto';

import { AUTH_CONSTANTS } from '@barber/config';
export function generateOtp(): string {
  const otpLength = (AUTH_CONSTANTS as { OTP_LENGTH: number }).OTP_LENGTH;
  const max = 10 ** otpLength;
  const value = randomInt(0, max);
  return value.toString().padStart(otpLength, '0');
}
