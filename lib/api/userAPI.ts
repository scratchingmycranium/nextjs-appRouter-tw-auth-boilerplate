import { UpdateUserData, User } from "../../types/types";
import { BaseAPI } from "./baseAPI";

/**
 * Represents the UserAPI class that handles user-related API requests.
 */
class UserAPI extends BaseAPI {
  private static instance: UserAPI;

  /**
   * Returns the singleton instance of the UserAPI class.
   * If the instance does not exist, it creates a new one.
   * @returns The singleton instance of the UserAPI class.
   */
  public static getInstance(): UserAPI {
    if (!UserAPI.instance) {
      UserAPI.instance = new UserAPI();
    }
    return UserAPI.instance;
  }

  /**
   * Retrieves the user information.
   * @returns A Promise that resolves to a User object.
   */
  async getUser(): Promise<User> {
    return this.makeRequest(`v2/users/me`, 'GET');
  }

  /**
   * Updates a user with the specified user ID.
   * @param {string} userId - The ID of the user to update.
   * @param {UpdateUserData} userData - The updated user data.
   * @returns {Promise<User>} - A promise that resolves to the updated user.
   */
  async updateUser(userId: string, userData: UpdateUserData): Promise<User> {
    return this.makeRequest(`users/${userId}`, 'PUT', userData);
  }
}

export default UserAPI;