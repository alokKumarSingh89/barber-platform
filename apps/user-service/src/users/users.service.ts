import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, User } from '@barber/database';
@Injectable()
export class UsersService {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
