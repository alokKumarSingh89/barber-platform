import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, User } from '@barber/database';
@Injectable()
export class UsersService {
  async findById(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.error('USER QUERY ERROR');

      if (error instanceof Error) {
        console.error(error.message);
        console.error(error.stack);
      } else {
        console.error(error);
      }

      throw error;
    }
  }
}
