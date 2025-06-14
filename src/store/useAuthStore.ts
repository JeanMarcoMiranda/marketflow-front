import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	userData: UserData | null;
	userSession: UserSession | null;
	isAuthenticated: boolean;
	setUser: (user: UserData | null) => void;
	setUserSession: (user: UserSession | null) => void;
	logout: () => void
}

interface UserData {
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

interface UserSession {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	expires_at: number;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			userData: null,
			userSession: null,
			isAuthenticated: false,

			setUser: (userData: UserData | null) => {
				set((state) => ({
					userData,
					isAuthenticated: !!userData && !!state.userSession
				}))
			},

			setUserSession: (userSession: UserSession | null) => {
				set((state) => ({
					userSession,
					isAuthenticated: !!userSession && !!state.userData
				}))
			},

			reset: () => {
				set({ userData: null, userSession: null });
			},

			logout: () => set({ userData: null, userSession: null, isAuthenticated: false }),
		}),
		{
			name: "auth-storage", // Nombre de la clave en localStorage
			storage: createJSONStorage(() => localStorage), // Usa localStorage para persistencia
		},
	),
);
