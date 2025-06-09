// backend/src/auth/guards/jwt-auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Проверяем, есть ли метаданные для публичного доступа
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Логируем попытку доступа
    this.logger.log(`JWT Auth attempt for ${request.method} ${request.url}`);

    if (err || !user) {
      this.logger.warn(
        `JWT Auth failed: ${err?.message || info?.message || 'No user'}`
      );
      throw err || new UnauthorizedException('Требуется авторизация');
    }

    this.logger.log(`JWT Auth success for admin: ${user.username}`);
    return user;
  }
}
