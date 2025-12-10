export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
  };
}

export interface ApiResponse<T = unknown> {
  message: string;
  data: T;
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export interface ApiError extends Error {
  status?: number;
  errors?: Record<string, string[]>;
}
