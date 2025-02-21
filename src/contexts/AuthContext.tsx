import { createContext, useState } from "react";
import { authService } from "@/services/authService";

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState(null);

  return (
    <AuthContext.Provider value={{ user, signIn: authService.signIn, signOut: authService.signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
