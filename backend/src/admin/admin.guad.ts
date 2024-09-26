import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  private extractTokenFromCookies(cookies: string): string | null {
    if (!cookies) {
      return null;
    }
    const token = cookies
      .split('; ')
      .find((cookie) => cookie.startsWith('token='));
    return token ? token.split('=')[1] : null;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookies(request.headers.cookie);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const redisClient = this.redisService.getClient();

    try {
      const tokenInRedis = await redisClient.get(token);
      if (tokenInRedis) {
        const payload = JSON.parse(tokenInRedis);
        request.login = payload.login;
        request.role = payload.role;
        if (payload.role !== 'Админ') {
          throw new UnauthorizedException();
        }
        request.access = payload.access;
        return true;
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      redisClient.set(token, JSON.stringify(payload), {
        EX: 60 * 60 * 24, // 1 day
      }); // Consider adding an expiration time
      request.login = payload.login;
      request.role = payload.role;
      request.access = payload.access;
      if (payload.role !== 'Админ') {
        throw new UnauthorizedException();
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new UnauthorizedException('Token verification failed');
    }

    return true;
  }
}
