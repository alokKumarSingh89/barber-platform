import { BadRequestException, Injectable } from '@nestjs/common';
import { prisma, UserRole, UserStatus } from '@barber/database';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from '@barber/contracts';
import { generateOtp } from './otp.util';
import { hashValue } from './hash.util';
import { AUTH_CONSTANTS } from '@barber/config';

@Injectable()
export class AuthService {
  async createCustomer(
    input: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        role: UserRole.CUSTOMER,
        status: UserStatus.ACTIVE,
        customerProfile: {
          create: {},
        },
      },
      include: {
        customerProfile: true,
      },
    });
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
    };
  }
  async requestOtp(phone: string) {
    const normalizedPhone = this.normalizePhone(phone);
    const code = generateOtp();
    const codeHash = hashValue(code);
    const expiresAt = new Date(
      Date.now() + AUTH_CONSTANTS.OTP_EXPIRY_SECONDS * 1000,
    );
    await prisma.otpChallenge.create({
      data: {
        phone: normalizedPhone,
        codeHash,
        purpose: 'LOGIN',
        expiresAt,
      },
    });
    // Development only.
    console.log(`[DEV OTP] ${normalizedPhone}: ${code}`);
    return {
      success: true,
      expiresAt: expiresAt.toISOString(),
    };
  }
  async verifyOtp(phone: string, code: string) {
    const normalizedPhone = this.normalizePhone(phone);
    const challenge = await prisma.otpChallenge.findFirst({
      where: {
        phone: normalizedPhone,
        purpose: 'LOGIN',
        verifiedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!challenge) {
      throw new BadRequestException('OTP is invalid or expired');
    }
    if (challenge.attempts >= AUTH_CONSTANTS.MAX_OTP_ATTEMPTS) {
      throw new BadRequestException('Maximum OTP attempts exceeded');
    }
    const codeHash = hashValue(code);
    if (codeHash !== challenge.codeHash) {
      await prisma.otpChallenge.update({
        where: {
          id: challenge.id,
        },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });
      throw new BadRequestException('OTP is invalid or expired');
    }
    await prisma.otpChallenge.update({
      where: {
        id: challenge.id,
      },

      data: {
        verifiedAt: new Date(),
      },
    });
    return {
      verified: true,
    };
  }
  private normalizePhone(phone: string): string {
    return phone.trim().replace(/\s+/g, '');
  }
}
