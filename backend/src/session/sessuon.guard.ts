import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();

    // Get the cookie from the headers
    const cookie = client.handshake.headers;
    console.log(cookie);

    // Validate the session
    if (!cookie) {
      client.disconnect();
    }

    return true;
  }
}
