import { supabase } from "@/lib/supabaseClient";
import { Session, User, WeakPassword } from "@supabase/supabase-js";
import { User as UserData } from "@/features/Users/data/userSchema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "../services/authService";
import { fetchUserById } from "@/features/Users/services/usersService";

interface LoggedInUser {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
}

interface AuthState {
  user: LoggedInUser | null;
  userData: UserData | null;
  signIn: (email: string, password: string) => Promise<LoggedInUser>;
  signUp: (email: string, password: string) => Promise<LoggedInUser | null>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   userData: null,

//   signIn: async (email: string, password: string) => {
//     const LoggedInUser = await authService.signIn(email, password);
//     const userData = await fetchUserById(LoggedInUser.user.id);
//     set({ user: LoggedInUser, userData });
//     return LoggedInUser;
//   },

//   signUp: async (email: string, password: string) => {
//     const response = await authService.signUp(email, password);
//     if (response.user && response.session) {
//       const newUser: LoggedInUser = {
//         user: response.user,
//         session: response.session,
//       };
//       set({ user: newUser });
//       return newUser;
//     }
//     return null;
//   },

//   signOut: async () => {
//     await authService.signOut();
//     set({ user: null });
//   },

//   checkAuth: async () => {},
// }));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      userData: null,

      signIn: async (email: string, password: string) => {
        const LoggedInUser = await authService.signIn(email, password);
        const userData = await fetchUserById(LoggedInUser.user.id);
        set({ user: LoggedInUser, userData });
        return LoggedInUser;
      },

      signUp: async (email: string, password: string) => {
        const response = await authService.signUp(email, password);
        if (response.user && response.session) {
          const newUser: LoggedInUser = {
            user: response.user,
            session: response.session,
          };
          set({ user: newUser });
          return newUser;
        }
        return null;
      },

      signOut: async () => {
        await authService.signOut();
        set({ user: null, userData: null });
      },

      checkAuth: async () => {
        const session = await supabase.auth.getSession();
        if (session.data.session) {
          const user = session.data.session.user;
          const userData = await fetchUserById(user.id);
          set({ user: { user, session: session.data.session }, userData });
        } else {
          set({ user: null, userData: null });
        }
      },
    }),
    {
      name: "auth-storage", // Nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage), // Usa localStorage para persistencia
    }
  )
);

// Escucha los cambios de sesión automáticamente
supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    useAuthStore.setState({
      user: { user: session.user, session },
    });
  } else {
    useAuthStore.setState({ user: null, userData: null });
  }
});
