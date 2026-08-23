import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BarberConfigModule } from '@barber/config';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    BarberConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
