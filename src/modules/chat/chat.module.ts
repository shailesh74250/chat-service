import { Module } from '@nestjs/common';
import { ChatController } from './api/rest/chat.controller';
import { ChatService } from './domain/services/chat.service';
import { ChatGateway } from './api/ws/chat.gateway';
import { ChatRepository } from './infrastructure/database/sql/repositories/chat.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import ChatDbEntity from './infrastructure/database/sql/entities/chat.db.entity';

@Module({
  controllers: [
    ChatController,
  ],
  providers: [
    ChatService, 
    ChatGateway,
    {
      provide: 'IChatRepository',
      useClass: ChatRepository,
    },
    {
      provide: 'ChatDbEntity',
      useValue: ChatDbEntity,
    },
  ],
  exports: [ChatService]
})
export class ChatModule {}
