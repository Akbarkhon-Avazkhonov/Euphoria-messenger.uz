import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class UserIdGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const client: Socket = context.switchToWs().getClient<Socket>();
    const data = context.switchToWs().getData(); // Получение данных (payload)

    console.log('data', data);
    return true;
  }
}
