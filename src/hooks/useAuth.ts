import { useLoginMutation } from "@/api/queries/authQueries";
import { useAuthStore } from "@/store/useAuthStore"

export const useAuth = () => {
  const { userData, userSession, setUser, setUserSession } = useAuthStore();
  const loginMutation = useLoginMutation();

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginMutation.mutateAsync({ email, password });
      setUser(userData.body.user);
      setUserSession(userData.body.session);
      return userData;
    } catch (error) {
      console.error("Error de autenticación:", error);
      throw error;
    }
  }

  return {
    userData,
    userSession,
    login,
    isLoading: loginMutation.isPending,
    error: loginMutation.error
  }
}