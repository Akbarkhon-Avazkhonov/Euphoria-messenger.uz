import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from 'src/admin/admin.guad';
export function Auth(role?: string) {
  if (role === 'admin') {
    return applyDecorators(
      UseGuards(AdminGuard),
      ApiCookieAuth(),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  }
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
