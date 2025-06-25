import { Module } from '@nestjs/common';
import { ChatController } from './api/rest/chat.controller';
import { ChatService } from './domain/services/chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService]
})
export class ChatModule {}
