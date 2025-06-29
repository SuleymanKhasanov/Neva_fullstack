// backend/src/auth/auth.service.ts
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    username: string;
    role: string;
  };
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Валидация логина и пароля администратора
   */
  async validateAdmin(username: string, password: string): Promise<boolean> {
    const adminUsername = this.configService.get<string>(
      'ADMIN_USERNAME',
      'admin'
    );
    const adminPassword = this.configService.get<string>(
      'ADMIN_PASSWORD',
      'admin123'
    );

    this.logger.log(`Login attempt for username: ${username}`);

    if (username === adminUsername && password === adminPassword) {
      this.logger.log(`Admin ${username} validated successfully`);

      return true;
    }

    this.logger.warn(`Invalid credentials for username: ${username}`);

    return false;
  }

  /**
   * Аутентификация администратора
   */
  async login(username: string, password: string): Promise<AuthResponse> {
    const isValid = await this.validateAdmin(username, password);

    if (!isValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const payload: JwtPayload = {
      sub: username,
      username: username,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>(
          'JWT_REFRESH_SECRET',
          'refresh-secret'
        ),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRES_IN',
          '7d'
        ),
      }),
    ]);

    this.logger.log(`Admin ${username} logged in successfully`);

    return {
      access_token,
      refresh_token,
      user: {
        username,
        role: 'admin',
      },
    };
  }

  /**
   * Обновление токена доступа
   */
  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>(
          'JWT_REFRESH_SECRET',
          'refresh-secret'
        ),
      });

      // Проверяем, что это валидный админ
      const adminUsername = this.configService.get<string>(
        'ADMIN_USERNAME',
        'admin'
      );

      if (payload.username !== adminUsername) {
        throw new UnauthorizedException('Недействительный пользователь');
      }

      const newPayload: JwtPayload = {
        sub: payload.username,
        username: payload.username,
      };

      const access_token = this.jwtService.sign(newPayload);

      this.logger.log(`Token refreshed for admin: ${payload.username}`);

      return { access_token };
    } catch (error) {
      this.logger.error('Token refresh failed:', error);
      throw new UnauthorizedException('Недействительный refresh token');
    }
  }

  /**
   * Получение профиля администратора
   */
  async getProfile(username: string) {
    const adminUsername = this.configService.get<string>(
      'ADMIN_USERNAME',
      'admin'
    );

    if (username !== adminUsername) {
      throw new UnauthorizedException('Недействительный пользователь');
    }

    return {
      username,
      role: 'admin',
      loginTime: new Date().toISOString(),
    };
  }

  /**
   * Валидация JWT токена
   */
  async validateJwtPayload(payload: JwtPayload): Promise<any> {
    const adminUsername = this.configService.get<string>(
      'ADMIN_USERNAME',
      'admin'
    );

    if (payload.username !== adminUsername) {
      this.logger.warn(`Invalid JWT payload for user: ${payload.username}`);
      throw new UnauthorizedException('Недействительный токен');
    }

    return {
      username: payload.username,
      role: 'admin',
    };
  }
}
