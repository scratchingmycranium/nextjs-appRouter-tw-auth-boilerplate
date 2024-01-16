import { APIError } from "@types";


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

    // Handle non-OK responses
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      if (response.headers.get("content-type")?.includes("application/json")) {
        const errorResponse = await response.json();
        errorMessage = errorResponse.message || errorMessage;
      }
      const error: APIError = {
        statusCode: response.status,
        message: errorMessage,
      };
      throw error;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    // Handle OK responses with content
    if (response) {
      // Check if the response is JSON before attempting to parse it
      if (response.headers.get("content-type")?.includes("application/json")) {
        try {
          const r = await response.json();
          return r as T;
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        // Handle case where response is not JSON
        console.error("Received response is not in JSON format.");
      }
    }

    return {} as T;
  }
}