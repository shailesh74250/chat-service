import { Injectable, Inject } from '@nestjs/common';
import { CreateChatMessageDto } from '../dto/create-chat-message.dto';
import { IChatRepository } from '../../infrastructure/database/chat.repository.interface';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject('IChatRepository')
    private readonly chatRepository: IChatRepository,
  ) {}

  async sendMessage(dto: CreateChatMessageDto): Promise<Chat> {
    if (!dto.receiverId && !dto.groupId) {
      throw new Error('Either receiverId or groupId is required');
    }
    // Store chat in DB
    return this.chatRepository.createChat(dto);
  }

  async getMessagesForUser(userId: string): Promise<Chat[]> {
    // Fetch all chats where user is sender or receiver
    const allChats = await this.chatRepository.getAllChats();
    return allChats.filter(
      (msg) => msg.senderId === userId || msg.receiverId === userId,
    );
  }
}
