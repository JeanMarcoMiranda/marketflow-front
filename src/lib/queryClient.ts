import { QueryClient } from "@tanstack/react-query";

// Configuración del cliente de TanStack Query
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2, // Reintentar 2 veces en caso de fallo
			staleTime: 1000 * 60 * 5, // 5 minutos de datos frescos
			// Removed cacheTime as it is not a valid property
			refetchOnWindowFocus: false, // No recargar al cambiar de ventana
		},
	},
});
