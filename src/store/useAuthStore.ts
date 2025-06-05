import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	userData: UserData | null;
	userSession: UserSession | null;
	setUser: (user: UserData | null) => void;
	setUserSession: (user: UserSession | null) => void;
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

			setUser: (userData: UserData | null) => {
				set({ userData: userData });
			},

			setUserSession: (userSession: UserSession | null) => {
				set({ userSession: userSession });
			},

			reset: () => {
				set({ userData: null, userSession: null });
			},
		}),
		{
			name: "auth-storage", // Nombre de la clave en localStorage
			storage: createJSONStorage(() => localStorage), // Usa localStorage para persistencia
		},
	),
);
