import { useAuthStore } from "@/store/useAuthStore";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

// Extender el tipo InternalAxiosRequestConfig para incluir nuestra propiedad '_retry'
declare module "axios" {
	export interface InternalAxiosRequestConfig {
		_retry?: boolean;
	}
}

// Configuración base para todas las solicitudes
const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "https://localhost:3000/api/";
const DEFAULT_TIMEOUT = 30000; // 30 segundos

// Creamos una instancia de axios con configuración por defecto
const httpClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: DEFAULT_TIMEOUT,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Interceptor de solicitudes
httpClient.interceptors.request.use(
	(config) => {
		// Obtener el access_token desde el store de Zustand
		const { userSession } = useAuthStore.getState();
		const token = userSession?.access_token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Interceptor de respuestas
httpClient.interceptors.response.use(
	(response: AxiosResponse) => response, // Devolver la respuesta cruda de Axios
	async (error) => {
		const originalRequest = error.config;

		// Si es un error 401 (no autorizado) y no hemos intentado renovar el token
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// Obtener el refresh_token desde el store de Zustand
				const { userSession } = useAuthStore.getState();
				const refreshToken = userSession?.refresh_token;

				if (refreshToken) {
					// Hacer la solicitud para refrescar el token
					const response = await axios.post(`${API_BASE_URL}auth/refresh`, {
						refresh_token: refreshToken,
					});

					// Asumimos que /auth/refresh devuelve { session: { access_token, refresh_token } }
					const { session } = response.data.body;
					const { access_token, refresh_token } = session;

					// Actualizar el store de Zustand con los nuevos tokens
					useAuthStore.getState().setUserSession({
						access_token,
						refresh_token,
					});

					// Actualiza el header y reintenta la solicitud
					originalRequest.headers.Authorization = `Bearer ${access_token}`;
					return httpClient(originalRequest);
				}
			} catch (refreshError) {
				// Si falla la renovación del token, limpia la sesión en el store
				useAuthStore.getState().setUserSession(null);
				useAuthStore.getState().setUser(null);

				// Redirige a la página de login
				if (typeof window !== "undefined") {
					window.location.href = "/login";
				}
			}
		}

		// Devolver el error crudo para que el consumidor lo maneje
		return Promise.reject(error);
	},
);

// Métodos HTTP simplificados con tipado genérico
const http = {
	get: <T>(url: string, config: AxiosRequestConfig = {}) =>
		httpClient.get<T>(url, config),
	post: <T>(url: string, data: any, config: AxiosRequestConfig = {}) =>
		httpClient.post<T>(url, data, config),
	put: <T>(url: string, data: any, config: AxiosRequestConfig = {}) =>
		httpClient.put<T>(url, data, config),
	patch: <T>(url: string, data: any, config: AxiosRequestConfig = {}) =>
		httpClient.patch<T>(url, data, config),
	delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
		httpClient.delete<T>(url, config),
	instance: httpClient,
};

export default http;
