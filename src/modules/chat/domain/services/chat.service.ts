import { Injectable } from '@nestjs/common';
import { CreateChatMessageDto } from '../dto/create-chat-message.dto';

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId?: string;
  groupId?: string; // Made groupId optional
  content: string;
  timestamp: Date;
}

@Injectable()
export class ChatService {
  private messages: ChatMessage[] = [];

  async sendMessage(dto: CreateChatMessageDto): Promise<ChatMessage> {
    // Allow either receiverId (for 1-1) or groupId (for group chat)
    if (!dto.receiverId && !dto.groupId) {
      throw new Error('Either receiverId or groupId is required');
    }

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: dto.senderId,
      receiverId: dto.receiverId,
      groupId: dto.groupId,
      content: dto.content,
      timestamp: new Date(),
    };

    this.messages.push(message); // Save message to in-memory array

    return message;
  }

  async getMessagesForUser(userId: string): Promise<ChatMessage[]> {
    return this.messages.filter(
      (msg) => msg.senderId === userId || msg.receiverId === userId,
    );
  }
}
