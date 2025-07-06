// backend/src/auth/dto/auth.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Логин администратора',
    example: 'admin',
  })
  @IsString({ message: 'Логин должен быть строкой' })
  username!: string;

  @ApiProperty({
    description: 'Пароль администратора',
    example: 'admin123',
    minLength: 6,
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password!: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token для обновления access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString({ message: 'Refresh token должен быть строкой' })
  refresh_token!: string;
}

// Response DTOs
export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token!: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refresh_token!: string;

  @ApiProperty({
    description: 'Информация о пользователе',
    example: {
      username: 'admin',
      role: 'admin',
    },
  })
  user!: {
    username: string;
    role: string;
  };
}

export class AdminProfileDto {
  @ApiProperty({ description: 'Логин администратора', example: 'admin' })
  username!: string;

  @ApiProperty({ description: 'Роль пользователя', example: 'admin' })
  role!: string;

  @ApiProperty({
    description: 'Время входа в систему',
    example: '2024-01-01T00:00:00.000Z',
  })
  loginTime!: string;
}

export class TokenResponseDto {
  @ApiProperty({
    description: 'Новый access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token!: string;
}
