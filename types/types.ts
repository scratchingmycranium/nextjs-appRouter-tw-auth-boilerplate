// types.ts

/**
 * Represents an API error.
 */
type APIError = {
  statusCode: number;
  message: string;
};

// Define types for User
type User = {
  id: string;
  name: string;
  email: string;
  // other user properties
}

type UpdateUserData = {
  name?: string;
  email?: string;
  // other updatable user properties
}



// export all
export type { APIError, User, UpdateUserData };
