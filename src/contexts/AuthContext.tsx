import { supabase } from "@/lib/supabaseClient";
import { authService } from "@/services/authService";
import { createContext, useEffect, useState } from "react";
import { Session, User, WeakPassword } from "@supabase/supabase-js";

interface LoggedInUser {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
}

interface AuthContextType {
  user: LoggedInUser | null;
  signIn: (email: string, password: string) => Promise<LoggedInUser>;
  signUp: (email: string, password: string) => Promise<LoggedInUser | null>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser({
          user: data.session.user,
          session: data.session,
        });
      }
    };

    getSession();

    // Escucha los cambios en la sesión (login, logout, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser({
            user: session.user,
            session,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const loggedInUser = await authService.signIn(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signUp = async (email: string, password: string) => {
    const response = await authService.signUp(email, password);
    if (response.user && response.session) {
      const newUser: LoggedInUser = {
        user: response.user,
        session: response.session,
      };
      setUser(newUser);
      return newUser;
    }
    return null;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
