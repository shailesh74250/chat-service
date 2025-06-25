import { CreateChatMessageDto } from '../../../../domain/dto/create-chat-message.dto';
// import { UpdateUserDto } from '../../../../domain/dto/update-user.dto';
import { ChatDbEntity } from '../entities/chat.db.entity';
import { Chat } from '../../../../domain/entities/chat.entity';

/**
 * UserMapper handles the mapping between DTOs and database entities.
 *
 * @class UserMapper
 */
export class ChatMapper {
  /**
   * Maps a CreateUserDto to a UserDbEntity.
   *
   * @param createUserDto - Data Transfer Object for creating a user
   * @returns A partial UserDbEntity with the mapped properties
   */
  static toDbEntityFromCreateDto(
    createUserDto: CreateChatMessageDto,
  ): Partial<ChatDbEntity> {
    return {
      senderId: createUserDto.senderId,
      receiverId: createUserDto.receiverId,
      content: createUserDto.content,
    };
  }

  /**
   * Maps a UserDbEntity to a User domain entity.
   *
   * @param userDbEntity - The UserDbEntity to convert
   * @returns The User domain entity
   */
  static toDomain(chatDbEntity: ChatDbEntity): Chat {
    const { id, senderId, receiverId, content, createdAt, updatedAt } = chatDbEntity;
    return new Chat(id, senderId, receiverId, content, createdAt, updatedAt);
  }
}
