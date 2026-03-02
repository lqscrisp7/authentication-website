export interface User {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  address?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
