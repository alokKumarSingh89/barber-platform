import {
  type AuthenticatedUser,
  type AccessTokenPayload,
} from '@barber/contracts';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: AccessTokenPayload): AuthenticatedUser {
    const claims = payload as unknown as {
      sub?: string;
      type?: string;
      role: AuthenticatedUser['role'];
    };

    if (!claims.sub || claims.type !== 'access') {
      throw new UnauthorizedException('Invalid access token');
    }
    return {
      userId: claims.sub,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      role: claims.role,
    };
  }
}
