export class CreateChatMessageDto {
  senderId: string;
  receiverId?: string; // Optional for group
  groupId?: string;    // Optional for group chat
  content: string;
}