import { UpdateUserData, User } from "../types";
import { BaseAPI } from "./baseAPI";

class UserAPI extends BaseAPI {
  private static instance: UserAPI;

  public static getInstance(): UserAPI {
    if (!UserAPI.instance) {
      UserAPI.instance = new UserAPI();
    }
    return UserAPI.instance;
  }

  async getUser(): Promise<User> {
    return this.makeRequest(`v2/users/me`, 'GET');
  }

  async updateUser(userId: string, userData: UpdateUserData): Promise<User> {
    return this.makeRequest(`users/${userId}`, 'PUT', userData);
  }
}

export default UserAPI;