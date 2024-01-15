// types.ts

/**
 * Represents an API error.
 */
export type APIError = {
  statusCode: number;
  message: string;
};

// Define types for User
export interface User {
  id: string;
  name: string;
  email: string;
  // other user properties
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  // other updatable user properties
}

// Define types for Product
export interface Product {
  id: string;
  title: string;
  price: number;
  // other product properties
}

export interface UpdateProductData {
  title?: string;
  price?: number;
  // other updatable product properties
}
