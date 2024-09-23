import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { UseGuards } from '@nestjs/common';
import { SessionGuard } from './sessuon.guard';

@WebSocketGateway()
export class SessionGateway {
  constructor(private readonly sessionService: SessionService) {}

  // on connection
  @UseGuards(SessionGuard)
  @SubscribeMessage('connection')
  handleConnection() {
    console.log('New connection');
  }
  @SubscribeMessage('createSession')
  create(@MessageBody() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  @SubscribeMessage('findAllSession')
  findAll() {
    return this.sessionService.findAll();
  }

  @SubscribeMessage('findOneSession')
  findOne(@MessageBody() id: number) {
    return this.sessionService.findOne(id);
  }

  @SubscribeMessage('updateSession')
  update(@MessageBody() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(updateSessionDto.id, updateSessionDto);
  }

  @SubscribeMessage('removeSession')
  remove(@MessageBody() id: number) {
    return this.sessionService.remove(id);
  }
}
