import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private exractTokenFromCookies(cookies: string) {
    if (!cookies) {
      return null;
    }
    const cookiesArray = cookies.split(';');
    const token = cookiesArray.find((cookie) => cookie.includes('token'));
    if (!token) {
      return null;
    }
    return token.split('=')[1];
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.exractTokenFromCookies(request.headers.cookie);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      if (payload.role !== 'Админ') {
        throw new UnauthorizedException();
      }
      request.login = payload.login;
      request.role = payload.role;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
