import { model, Schema } from "mongoose";

interface IChat extends Document {
  members: string[]; // User IDs from the User microservice
  isGroup: boolean;
  groupName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    members: [{ type: String, required: true }], // User IDs from User Microservice
    isGroup: { type: Boolean, default: false },
    groupName: {
      type: String,
      required: function () {
        return this.isGroup;
      },
    },
  },
  { timestamps: true },
);

export const Chat = model<IChat>('Chat', ChatSchema);
