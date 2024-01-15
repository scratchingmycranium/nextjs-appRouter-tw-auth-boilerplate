import { APIError } from "../types";

const BASE_API_URL = 'http://localhost:8080';

export class BaseAPI {
  private headers: Record<string, string>;

  constructor(headers: Record<string, string> = {}) {
    this.headers = headers;
  }

  async makeRequest<T>(
    endpoint: string,
    method: string = 'GET',
    data: any = null,
    customHeaders: Record<string, string> = {}
  ): Promise<T> {
    const url = `${BASE_API_URL}/${endpoint}`;
    const headers = {
      'Content-Type': 'application/json', // Default Content-Type
      ...this.headers,
      ...customHeaders,
    };

    let body: string | null = null;
    if (data) {
      if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        body = new URLSearchParams(data).toString();
      } else {
        // Default to JSON
        body = JSON.stringify(data);
      }
    }

    const options: RequestInit = {
      method,
      headers,
      body,
      credentials: 'include',
      mode: 'cors',
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const resp = await response.json();

      const error: APIError = {
        statusCode: response.status,
        message: resp.message || 'An error occurred',
      };
      throw error;
    }

    return await response.json() as T;
  }
}
