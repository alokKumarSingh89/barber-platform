import { Injectable } from '@nestjs/common';
import { prisma, UserRole, UserStatus } from '@barber/database';
import { CreateCustomerRequest } from '@barber/contracts';

@Injectable()
export class AuthService {
  async createCustomer(input: CreateCustomerRequest) {
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
    return user;
  }
}
