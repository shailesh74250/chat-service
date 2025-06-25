import { Module } from '@nestjs/common';
import { ChatController } from './api/rest/chat.controller';
import { ChatService } from './domain/services/chat.service';
import { ChatGateway } from './api/ws/chat.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService]
})
export class ChatModule {}
