import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BarberConfigModule } from '@barber/config';

@Module({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  imports: [BarberConfigModule.forRoot(), UsersModule],
})
export class AppModule {}
