import { BaseAPI } from "./baseAPI";

/**
 * Represents an API for authentication.
 */
class AuthAPI extends BaseAPI {
  private static instance: AuthAPI;

  constructor() {
    super();
  }

  /**
   * Returns the singleton instance of AuthAPI.
   * @returns The singleton instance of AuthAPI.
   */
  public static getInstance(): AuthAPI {
    if (!AuthAPI.instance) {
      AuthAPI.instance = new AuthAPI();
    }
    return AuthAPI.instance;
  }

  /**
   * Logs in a user with the provided credentials.
   * @param credentials - The user's login credentials.
   * @returns A Promise that resolves to the login response.
   */
  async login(credentials: { email: string; password: string }): Promise<any> {
    return this.makeRequest('v1/auth/signin', 'POST', credentials,  { 'Content-Type': 'application/x-www-form-urlencoded' });
  }

}

export default AuthAPI;