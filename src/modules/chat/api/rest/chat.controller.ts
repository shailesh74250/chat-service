import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from '../../domain/services/chat.service';
import { ChatMessage } from '../../domain/services/chat.service';
import { CreateChatMessageDto } from '../../domain/dto/create-chat-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('message')
  async sendMessage(@Body() createChatMessageDto: CreateChatMessageDto): Promise<ChatMessage> {
    return this.chatService.sendMessage(createChatMessageDto);
  }

  @Get('messages/:userId')
  async getMessages(@Param('userId') userId: string): Promise<ChatMessage[]> {
    return this.chatService.getMessagesForUser(userId);
  }
}
