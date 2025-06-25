import { CreateChatMessageDto } from '../../domain/dto/create-chat-message.dto';
// import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { Chat } from '../../domain/entities/chat.entity';

/**
 * Interface for User repository to abstract database operations.
 *
 * @interface IUserRepository
 */
export interface IChatRepository {
  /**
   * Creates a new user.
   *
   * @param createUserDto - Data Transfer Object for creating a user
   * @returns The created user
   */
  createChat(createUserDto: CreateChatMessageDto): Promise<Chat>;

  /**
   * Retrieves all users.
   *
   * @returns An array of users
   */
  getAllChats(): Promise<Chat[]>;

  /**
   * Retrieves a user by ID.
   *
   * @param id - The ID of the user to retrieve
   * @returns The user with the specified ID
   */
  getChatById(id: string): Promise<Chat>;

  /**
   * Updates a user by ID.
   *
   * @param id - The ID of the user to update
   * @param updateUserDto - Data Transfer Object for updating a user
   * @returns The updated user
   */
  updateChat(id: string, updateUserDto: CreateChatMessageDto): Promise<Chat>;

  /**
   * Deletes a user by ID.
   *
   * @param id - The ID of the user to delete
   */
  deleteChat(id: string): Promise<void>;
}
