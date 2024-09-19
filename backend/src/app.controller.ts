import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({ summary: 'Test server' })
  @Get()
  testServer(): string {
    return this.appService.testServer();
  }
}
