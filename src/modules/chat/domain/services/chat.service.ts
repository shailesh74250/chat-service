import { Injectable } from '@nestjs/common';
import { CreateChatMessageDto } from '../dto/create-chat-message.dto';

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

@Injectable()
export class ChatService {
  private messages: ChatMessage[] = [];

  async sendMessage(dto: CreateChatMessageDto): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: (this.messages.length + 1).toString(),
      senderId: dto.senderId,
      receiverId: dto.receiverId,
      content: dto.content,
      timestamp: new Date(),
    };
    this.messages.push(message);
    return message;
  }

  async getMessagesForUser(userId: string): Promise<ChatMessage[]> {
    return this.messages.filter(
      (msg) => msg.senderId === userId || msg.receiverId === userId,
    );
  }
}
