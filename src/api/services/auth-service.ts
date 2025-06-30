import http from "@/api/http-client";
import {
  ApiResponse,
  LoginResponseBody,
  RegisterResponseBody,
  User,
} from "../types/response.types";

export class AuthService {
  // Endpoint base para autenticación
  private readonly AUTH_ENDPOINT = "/auth";

  /**
   * Inicia sesión con email y contraseña
   * @param email Email del usuario
   * @param password Contraseña del usuario
   * @returns Datos del usuario y sesión
   */
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponseBody>> {
    try {
      const response = await http.post<ApiResponse<LoginResponseBody>>(
        `${this.AUTH_ENDPOINT}/login`,
        {
          email,
          password,
        }
      );

      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async register(
    email: string,
    password: string,
    business_name: string,
    branch_name: string
  ): Promise<ApiResponse<RegisterResponseBody>> {
    try {
      const response = await http.post<ApiResponse<RegisterResponseBody>>(
        `${this.AUTH_ENDPOINT}/register`,
        {
          email,
          password,
          business_name,
          branch_name,
        }
      );

      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async logout(): Promise<ApiResponse<string>> {
    try {
      const response = await http.post<ApiResponse<string>>(
        `${this.AUTH_ENDPOINT}/logout`,
        {}
      );

      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async getCurrentAuthUser(): Promise<ApiResponse<User>> {
    try {
      const response = await http.get<ApiResponse<User>>(
        `${this.AUTH_ENDPOINT}/user`
      );

      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  /**
   * Maneja los errores comunes de autenticación
   * @param error Error recibido de la API
   */
  private handleAuthError(error: unknown) {
    // Se puede personalizar el manejo de errores aquí
    if (error && typeof error === "object" && "response" in error) {
      const response = (
        error as { response: { status: number; data?: { message?: string } } }
      ).response;
      switch (response.status) {
        case 401:
          console.error("Credenciales inválidas");
          break;
        case 403:
          console.error("No tiene permisos para realizar esta acción");
          break;
        case 422:
          console.error("Datos de entrada inválidos");
          break;
        default:
          console.error(
            "Error en autenticación:",
            response.data?.message ?? "Error desconocido"
          );
      }
    } else {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "Error desconocido";
      console.error("Error de conexión:", message);
    }
  }
}

export const authService = new AuthService();
