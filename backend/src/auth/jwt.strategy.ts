// backend/src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService, JwtPayload } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(
        'JWT_SECRET',
        'neva-default-secret'
      ),
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.authService.validateJwtPayload(payload);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Недействительный токен');
    }
  }
}
