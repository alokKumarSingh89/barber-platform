import { type AuthenticatedUser } from '@barber/contracts';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedUser => {
    const req = context
      .switchToHttp()
      .getRequest<{ user: AuthenticatedUser }>();
    return req.user;
  },
);
