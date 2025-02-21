import { login, logout, getUser } from "@/api/auth";

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
}

export const authService = new AuthService();