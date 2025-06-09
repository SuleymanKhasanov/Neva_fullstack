// backend/src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Logger,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  LoginDto,
  RefreshTokenDto,
  AuthResponseDto,
  AdminProfileDto,
  TokenResponseDto,
} from './dto/auth.dto';
import { Auth } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Вход в админ панель',
    description:
      'Аутентификация администратора по логину и паролю. Возвращает JWT токены.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Успешная авторизация',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Неверные учетные данные',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Неверный логин или пароль' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      this.logger.log(`Login attempt for username: ${loginDto.username}`);

      const result = await this.authService.login(
        loginDto.username,
        loginDto.password
      );

      this.logger.log(`Login successful for: ${loginDto.username}`);
      return result;
    } catch (error) {
      this.logger.error(`Login failed for ${loginDto.username}:`, error);
      throw error;
    }
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Обновление токена доступа',
    description: 'Получение нового access token с помощью refresh token',
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Токен успешно обновлен',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Недействительный refresh token',
  })
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto
  ): Promise<TokenResponseDto> {
    try {
      this.logger.log('Token refresh attempt');

      const result = await this.authService.refreshToken(
        refreshTokenDto.refresh_token
      );

      this.logger.log('Token refreshed successfully');
      return result;
    } catch (error) {
      this.logger.error('Token refresh failed:', error);
      throw error;
    }
  }

  @Get('profile')
  @Auth()
  @ApiOperation({
    summary: 'Получение профиля администратора',
    description: 'Получение информации о текущем авторизованном администраторе',
  })
  @ApiResponse({
    status: 200,
    description: 'Профиль администратора',
    type: AdminProfileDto,
  })
  async getProfile(@CurrentUser() user: any): Promise<AdminProfileDto> {
    try {
      this.logger.log(`Profile request for admin: ${user.username}`);

      const profile = await this.authService.getProfile(user.username);

      this.logger.log(`Profile retrieved for admin: ${user.username}`);
      return profile;
    } catch (error) {
      this.logger.error(
        `Profile retrieval failed for admin ${user.username}:`,
        error
      );
      throw error;
    }
  }

  @Get('check')
  @Auth()
  @ApiOperation({
    summary: 'Проверка авторизации',
    description: 'Проверка валидности текущего токена',
  })
  @ApiResponse({
    status: 200,
    description: 'Токен валиден',
    schema: {
      type: 'object',
      properties: {
        valid: { type: 'boolean', example: true },
        user: {
          type: 'object',
          properties: {
            username: { type: 'string', example: 'admin' },
            role: { type: 'string', example: 'admin' },
          },
        },
      },
    },
  })
  async checkAuth(@CurrentUser() user: any) {
    this.logger.log(`Auth check for admin: ${user.username}`);

    return {
      valid: true,
      user: {
        username: user.username,
        role: user.role,
      },
    };
  }
}
