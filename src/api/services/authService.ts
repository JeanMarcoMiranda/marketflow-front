import http from "@/api/httpClient";

interface ApiResponse<T> {
	status: number;
	body: T;
	reason: string;
}

// Tipos específicos para User y Session
interface User {
	id: string;
	email: string;
	name: string;
	role_id: string;
	active: boolean;
	phone_number: string | null;
	id_business: string | null,
	id_branch: string | null,
	created_at: string;
}

interface Session {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	expires_at: number;
}

// Tipo para el body de esta respuesta específica
interface LoginResponseBody {
	user: User;
	session: Session;
}

interface RegisterResponseBody {
	user: User;
	session: Session;
}

export class AuthService {
	// Endpoint base para autenticación
	private AUTH_ENDPOINT = "/auth";

	/**
	 * Inicia sesión con email y contraseña
	 * @param email Email del usuario
	 * @param password Contraseña del usuario
	 * @returns Datos del usuario y sesión
	 */
	async login(
		email: string,
		password: string,
	): Promise<ApiResponse<LoginResponseBody>> {
		try {
			const response = await http.post<ApiResponse<LoginResponseBody>>(
				`${this.AUTH_ENDPOINT}/login`,
				{
					email,
					password,
				},
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
		branch_name: string,
	): Promise<ApiResponse<RegisterResponseBody>> {
		try {
			const response = await http.post<ApiResponse<RegisterResponseBody>>(
				`${this.AUTH_ENDPOINT}/register`,
				{
					email,
					password,
					business_name,
					branch_name,
				},
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
				`${this.AUTH_ENDPOINT}/user`,
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
	private handleAuthError(error: any) {
		// Se puede personalizar el manejo de errores aquí
		if (error.response) {
			switch (error.response.status) {
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
						error.response.data?.message || error.message,
					);
			}
		} else {
			console.error("Error de conexión:", error.message);
		}
	}
}

export const authService = new AuthService();
