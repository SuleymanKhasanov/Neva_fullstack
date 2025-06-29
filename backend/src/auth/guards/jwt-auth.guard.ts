// backend/src/auth/guards/jwt-auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

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
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      this.logger.debug(
        `🌐 Public route accessed: ${this.getRouteInfo(context)}`
      );

      return true;
    }

    this.logger.log(
      `🔐 Protected route accessed: ${this.getRouteInfo(context)}`
    );

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = this.getRequest(context);
    const route = request
      ? `${request.method || 'GraphQL'} ${request.url || 'GraphQL'}`
      : 'GraphQL';

    // Логируем попытку доступа
    this.logger.log(`JWT Auth attempt for ${route}`);

    if (err) {
      this.logger.error(`JWT Auth error for ${route}:`, err.message);
      throw err;
    }

    if (!user) {
      const errorMessage = info?.message || 'No auth token';
      this.logger.warn(`JWT Auth failed: ${errorMessage}`);
      throw new UnauthorizedException('Требуется авторизация');
    }

    this.logger.log(`JWT Auth success for admin: ${user.username}`);

    return user;
  }

  private getRouteInfo(context: ExecutionContext): string {
    const request = this.getRequest(context);

    if (!request) {
      return 'GraphQL';
    }

    return `${request.method || 'GraphQL'} ${request.url || 'GraphQL'}`;
  }

  // ✅ ИСПРАВЛЕНИЕ для поддержки GraphQL и HTTP запросов
  getRequest(context: ExecutionContext) {
    try {
      // Проверяем, это GraphQL или HTTP запрос
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    } catch {
      // Если не GraphQL, пробуем HTTP
      try {
        return context.switchToHttp().getRequest();
      } catch {
        // Если ничего не работает, возвращаем пустой объект
        return {};
      }
    }
  }
}
