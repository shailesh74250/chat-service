import { Inject, Injectable } from '@nestjs/common';
import { ChatDbEntity } from '../entities/chat.db.entity';
import { CreateChatMessageDto } from '../../../../domain/dto/create-chat-message.dto';
// import { UpdateUserDto } from '../../../../domain/dto/update-user.dto';
import { IChatRepository } from '../../chat.repository.interface';
import { Chat } from '../../../../domain/entities/chat.entity';
import { ChatMapper } from './../mapper/chat.mapper';

/**
 * UserRepository handles all database operations related to users.
 *
 * @repository UserRepository
 */
@Injectable()
export class ChatRepository implements IChatRepository {
  constructor(
    @Inject('ChatDbEntity')
    private readonly chatModel: typeof ChatDbEntity,
  ) {}

  /**
   * Creates a new user.
   *
   * @param createUserDto - Data Transfer Object for creating a user
   * @returns The created user
   */
  async createChat(createUserDto: CreateChatMessageDto): Promise<Chat> {
    const userDbEntity = ChatMapper.toDbEntityFromCreateDto(createUserDto);
    const user = await this.chatModel.create(userDbEntity as ChatDbEntity);
    return ChatMapper.toDomain(user);
  }

  /**
   * Retrieves all users.
   *
   * @returns An array of users
   */
  async getAllChats(): Promise<Chat[]> {
    const users = await this.chatModel.findAll();
    return users.map((user) => ChatMapper.toDomain(user));
  }

  /**
   * Retrieves a user by ID.
   *
   * @param id - The ID of the user to retrieve
   * @returns The user with the specified ID
   */
  async getChatById(id: string): Promise<Chat> {
    const user = await this.chatModel.findByPk(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return ChatMapper.toDomain(user);
  }

  /**
   * Updates a user by ID.
   *
   * @param id - The ID of the user to update
   * @param updateUserDto - Data Transfer Object for updating a user
   * @returns The updated user
   */
  async updateChat(id: string, updateUserDto: CreateChatMessageDto): Promise<Chat> {
    const userDbEntity = ChatMapper.toDbEntityFromCreateDto(updateUserDto);
    const [numberOfAffectedRows, [updatedUser]] = await this.chatModel.update(
      userDbEntity,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
    return ChatMapper.toDomain(updatedUser);
  }

  /**
   * Deletes a user by ID.
   *
   * @param id - The ID of the user to delete
   */
  async deleteChat(id: string): Promise<void> {
    const result = await this.chatModel.destroy({ where: { id } });
    if (result === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
  }
}
