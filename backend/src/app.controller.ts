// backend/src/app.controller.ts
import { Controller, Get } from '@nestjs/common';

import { Public } from './auth/decorators/public.decorator';
import { AppService } from './app.service';

@Controller()
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getRoot(): string {
    return 'Server is running';
  }
}
