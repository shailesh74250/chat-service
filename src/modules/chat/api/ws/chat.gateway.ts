import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../../domain/services/chat.service';
import { CreateChatMessageDto } from '../../domain/dto/create-chat-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  // Client should emit 'join' with their userId to join their personal room
  @SubscribeMessage('join')
  handleJoin(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    console.log(`User ${userId} joined the chat`);
    client.join(userId);
  }

  // Client emits 'sendMessage' with CreateChatMessageDto
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: CreateChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.receiverId && !data.groupId) {
      client.emit('error', 'Either receiverId or groupId is required');
      return;
    }
    const message = await this.chatService.sendMessage(data);
    if (data.groupId) {
      this.server.to(data.groupId).emit('receiveMessage', message);
    } else if (data.receiverId) {
      this.server.to(data.receiverId).emit('receiveMessage', message);
    }
    client.emit('messageSent', message);
    return message;
  }

  // For group chat, you can add a roomId to CreateChatMessageDto and use:
  // this.server.to(roomId).emit('receiveMessage', message);
  @SubscribeMessage('joinGroup')
  handleJoinGroup(@MessageBody() groupId: string, @ConnectedSocket() client: Socket) {
    console.log(`User joined group ${groupId}`);
    client.join(groupId);
  }
}