import { BaseAPI } from "./baseAPI";

class AuthAPI extends BaseAPI {
  private static instance: AuthAPI;

  constructor() {
    super();
  }

  public static getInstance(): AuthAPI {
    if (!AuthAPI.instance) {
      AuthAPI.instance = new AuthAPI();
    }
    return AuthAPI.instance;
  }

  async login(credentials: { email: string; password: string }): Promise<any> {
    return this.makeRequest('v1/auth/signin', 'POST', credentials,  { 'Content-Type': 'application/x-www-form-urlencoded' });
  }

}

export default AuthAPI;