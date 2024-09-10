import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { splitSession } from './chat.utils'; // assuming splitSession is in utils

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();

    // Get the cookie from the headers
    const cookie = client.handshake.headers.cookie;

    // Validate the session
    if (!cookie) {
      client.disconnect();
    }

    const session = splitSession(cookie);

    if (!session) {
      client.disconnect();
    }

    // Attach the session to the client object for later use
    client.data.session = session;

    return true;
  }
}
