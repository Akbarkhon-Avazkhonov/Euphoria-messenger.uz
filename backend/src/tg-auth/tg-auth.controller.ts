import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { TgAuthService } from './tg-auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.decorator';

@Auth('admin')
@ApiTags('Telegram Auth')
@Controller('tg-auth')
export class TgAuthController {
  constructor(private readonly tgAuthService: TgAuthService) {}

  @ApiOperation({ summary: 'Register new user in telegram' })
  @ApiBody({
    description: 'Send phone number to create operator',
    schema: {
      type: 'object',
      properties: {
        phoneNumber: {
          type: 'string',
          example: '+9996624545',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'PHONE_NUMBER_INVALID',
  })
  @Post('register/:login')
  register(
    @Param('login') login: string,
    @Body() body: { phoneNumber: string },
  ) {
    return this.tgAuthService.register(login, body.phoneNumber);
  }

  @ApiOperation({ summary: 'Verify phone number' })
  @ApiBody({
    description: 'Send code to verify phone number',
    schema: {
      type: 'object',
      properties: {
        phoneCode: {
          type: 'string',
          example: '12345',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'PHONE_CODE_INVALID',
  })
  @Post('verify/:login')
  verify(@Param('login') login: string, @Body() body: { phoneCode: string }) {
    return this.tgAuthService.verify(login, body.phoneCode);
  }

  @ApiOperation({ summary: 'Refresh  phone code' })
  @ApiBadRequestResponse({
    description: 'PHONE_CODE_INVALID',
  })
  @Patch('refresh-code/:login')
  refreshCode(@Param('login') login: string) {
    return this.tgAuthService.refreshCode(login);
  }
}
