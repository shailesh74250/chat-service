import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from '../../domain/services/chat.service';
import { CreateChatMessageDto } from '../../domain/dto/create-chat-message.dto';
import { Chat } from '../../domain/entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('message')
  async sendMessage(@Body() createChatMessageDto: CreateChatMessageDto): Promise<Chat> {
    return this.chatService.sendMessage(createChatMessageDto);
  }

  @Get('messages/:userId')
  async getMessages(@Param('userId') userId: string): Promise<Chat[]> {
    return this.chatService.getMessagesForUser(userId);
  }
}
