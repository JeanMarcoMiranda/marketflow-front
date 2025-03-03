import { supabase } from "@/lib/supabaseClient";
import { Session, User, WeakPassword } from "@supabase/supabase-js";
import { create } from "zustand";
import { authService } from "../services/authService";

interface LoggedInUser {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
}

interface AuthState {
  user: LoggedInUser | null;
  signIn: (email: string, password: string) => Promise<LoggedInUser>;
  signUp: (email: string, password: string) => Promise<LoggedInUser | null>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  signIn: async (email: string, password: string) => {
    const LoggedInUser = await authService.signIn(email, password);
    set({ user: LoggedInUser });
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
    set({ user: null });
  },

  checkAuth: async () => {},
}));

// Escucha los cambios de sesión automáticamente
supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    useAuthStore.setState({
      user: { user: session.user, session },
    });
  } else {
    useAuthStore.setState({ user: null });
  }
});
