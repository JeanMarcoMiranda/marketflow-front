import { login, logout, getUser, register } from "@/api/auth";

export class AuthService {
  async signIn(email: string, password: string) {
    return await login(email, password);
  }

  async signOut() {
    return await logout();
  }

  async getCurrentUser() {
    return await getUser();
  }

  async signUp(email: string, password: string) {
    return await register(email, password);
  }
}

export const authService = new AuthService();