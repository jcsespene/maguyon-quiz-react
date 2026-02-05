export interface AuthUser {
  id: string;        // Google sub (unique user ID)
  email: string;
  name: string;
  picture?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}
