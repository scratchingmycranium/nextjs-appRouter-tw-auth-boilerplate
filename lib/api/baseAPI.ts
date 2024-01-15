import { APIError } from "@/types";


const BASE_API_URL = 'http://localhost:8080';

/**
 * Represents a base API class for making HTTP requests.
 */
export class BaseAPI {
  private headers: Record<string, string>;
  
  /**
   * Creates an instance of BaseAPI.
   * @param headers - The headers to be included in the requests.
   */
  constructor(headers: Record<string, string> = {}) {
    this.headers = headers;
  }

    /**
   * Makes an HTTP request to the specified endpoint.
   * @param endpoint - The endpoint to make the request to.
   * @param method - The HTTP method to use (default: 'GET').
   * @param data - The data to send in the request body (default: null).
   * @param customHeaders - Additional headers to include in the request (default: {}).
   * @returns A promise that resolves to the response data.
   * @throws An error if the response is not successful.
   */
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
