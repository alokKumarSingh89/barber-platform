import { Injectable } from '@nestjs/common';
import { prisma, User } from '@barber/database';
@Injectable()
export class UsersService {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
