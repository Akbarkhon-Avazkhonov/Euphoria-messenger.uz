import {
  Body,
  Controller,
  Post,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    description: 'Create admin use secret code ("secret")',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John',
        },
        password: {
          type: 'string',
          example: '123456',
        },
        secret: {
          type: 'string',
          example: 'secret',
        },
      },
    },
  })
  @Post('createAdmin')
  async createAdmin(
    @Body() data: { name: string; password: string; secret: string },
  ) {
    if (data.secret !== process.env.SECRET)
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    return await this.authService.createAdmin(data.name, data.password);
  }
  @ApiBody({
    description: 'Send phone number to create operator',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'John',
        },
        password: {
          type: 'string',
          example: '123456',
        },
        phoneNumber: {
          type: 'string',
          example: '+9996624545',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description:
      'WILL BE RETURN PHONE_CODE_HASH AND SESSION ! AND SEND CODE TO PHONE VIA TELEGRAM !',
    schema: {
      type: 'object',
      properties: {
        phoneCodeHash: {
          type: 'string',
          example: '8c592dd63ddf152970',
        },
        session: {
          type: 'string',
          example: '.....',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'PHONE_NUMBER_INVALID',
  })
  @Post('sendCode')
  async sendCode(
    @Body() data: { username: string; password: string; phoneNumber: string },
  ) {
    return await this.authService.sendCode(
      data.username,
      data.password,
      data.phoneNumber,
    );
  }

  @ApiCreatedResponse({
    description: 'WILL BE RETURN AUTHERIZED USER SESSION ! SAVE IT IN COOKIE !',
    schema: {
      type: 'object',
      properties: {
        phoneCodeHash: {
          type: 'string',
          example: '8c592dd63ddf152970',
        },
        session: {
          type: 'string',
          example: '.....',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'WILL THROW ERROR WITH MESSAGE !',
  })
  @ApiBody({
    description:
      'Sign in with code after send code. This time send session in body (because user not authorized) ',
    schema: {
      type: 'object',
      properties: {
        phoneNumber: {
          type: 'string',
          example: '+9996624545',
        },
        phoneCode: {
          type: 'string',
          example: '22222',
        },
        phoneCodeHash: {
          type: 'string',
          example: '8c592dd63ddf152970',
        },
        session: {
          type: 'string',
          example: '',
        },
      },
    },
  })
  @Post('signInWithCode')
  async signInWithCode(
    @Body()
    body: {
      phoneNumber: string;
      phoneCodeHash: string;
      phoneCode: string;
      session: string;
    },
  ) {
    return await this.authService.signInWithCode(
      body.phoneNumber,
      body.phoneCodeHash,
      body.phoneCode,
      body.session,
    );
  }

  @ApiBody({
    description: 'Send name and password',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'John',
        },
        password: {
          type: 'string',
          example: '123456',
        },
      },
    },
  })
  @Post('signInWithName')
  async loginWithName(@Body() body: { username: string; password: string }) {
    return await this.authService.signInWithName(body.username, body.password);
  }

  @Post('getOperators')
  async getRopOperators(@Body() body: { rop_session: string }) {
    return await this.authService.getOperators(body.rop_session);
  }

  @Post('getAll')
  async getAlls(@Body() body: { session: string }) {
    return await this.authService.getAll(body.session);
  }
  @ApiSecurity('session')
  @ApiBody({
    description: 'Send username',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'John',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'true or false',
  })
  @HttpCode(200)
  @Post('checkUsername')
  async checkUsername(
    @Headers() headers: any,
    @Body() username: { username: string },
  ) {
    return await this.authService.checkUsername(headers, username.username);
  }

  //get operators list
  @ApiSecurity('session')
  @ApiOkResponse({
    description: 'Return operators list',
  })
  @Get('operators')
  async getOperators(@Headers() headers: any) {
    return await this.authService.getOperators(headers);
  }
}
