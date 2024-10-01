// telegram.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramService {
  private tgs: { [key: string]: any } = {};

  // Set Telegram client for a session
  setTelegramClient(sessionId: string, client: any) {
    this.tgs[sessionId] = client;
  }

  // Get Telegram client for a session
  getTelegramClient(sessionId: string) {
    return this.tgs[sessionId];
  }

  // Check if a Telegram client exists for a session
  hasTelegramClient(sessionId: string) {
    return !!this.tgs[sessionId];
  }

  // Delete a Telegram client for a session
  deleteTelegramClient(sessionId: string) {
    delete this.tgs[sessionId];
  }
}
