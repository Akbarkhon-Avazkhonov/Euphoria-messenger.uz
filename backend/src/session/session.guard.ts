import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const cookie = client.handshake.headers?.cookie;

    // Check if the cookie is present
    if (!cookie) {
      client.disconnect();
      return false;
    }

    // Validate session using the cookie
    try {
      const session = await this.getSessionFromCookie(cookie);
      client.data.session = session;
      console.log('Session:', client.data.session);
      if (!session) {
        client.disconnect();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Session validation failed', error);
      client.disconnect();
      return false;
    }
  }

  private async getSessionFromCookie(cookie: string) {
    // Extract the token from the cookie string
    const tokenCookie = cookie
      .split(';')
      .find((c) => c.trim().startsWith('session='));
    if (!tokenCookie) {
      throw new Error('Token not found in cookies');
    }

    const token = tokenCookie.split('=')[1];

    // Validate and decode the token
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload.session;
    } catch (err) {
      console.error('JWT verification failed:', err);
      return null;
    }
  }
}
