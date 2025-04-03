import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
  chatId: string;
  senderId: string;
  receiverId?: string; // Optional for group chats
  content: string;
  messageType: 'text' | 'image' | 'video' | 'audio' | 'file';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

const MessageSchema = new Schema<IMessage>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    senderId: { type: String, required: true }, // Should match User microservice user ID
    receiverId: { type: String }, // Not needed in group chats
    content: { type: String, required: true },
    messageType: { type: String, enum: ['text', 'image', 'video', 'audio', 'file'], required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
  },
  { timestamps: true }
);

export const Message = model<IMessage>('Message', MessageSchema);
