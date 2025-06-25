/**
 * User entity representing a user in the domain layer.
 *
 * @class User
 */
export class GroupMember {
  /**
   * The unique identifier of the user.
   *
   * @type {string}
   */
  id: string;

  /**
   * The name of the user.
   *
   * @type {string}
   */
  groupId: string;

  /**
   * The email of the user.
   *
   * @type {string}
   */
  userId: string;

  /**
   * The password of the user.
   *
   * @type {string}
   */
  joinedAt: string;

  /**
   * The date and time when the user was created.
   *
   * @type {Date}
   */
  createdAt: Date;

  /**
   * The date and time when the user was last updated.
   *
   * @type {Date}
   */
  updatedAt: Date;

  /**
   * Constructs a new instance of the User entity.
   *
   * @param id - The unique identifier of the user
   * @param groupId - The name of the user
   * @param userId - The email of the user
   * @param joinedAt - The date and time when the user joined the group
   * @param createdAt - The date and time when the user was created
   * @param updatedAt - The date and time when the user was last updated
   */
  constructor(
    id: string,
    groupId: string,
    userId: string,
    joinedAt: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.groupId = groupId;
    this.userId = userId;
    this.joinedAt = joinedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
