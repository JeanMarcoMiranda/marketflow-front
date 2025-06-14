import { useLoginMutation, useLogoutMutation, useRegisterMutation } from "@/api/queries/authQueries";
import { useAuthStore } from "@/store/useAuthStore"
import { useUserPreferencesStore } from "@/store/useUserPreferences";

export const useAuth = () => {
  const { userData, userSession, setUser, setUserSession, logout: logoutStore } = useAuthStore();
  const { setSelectedBranch, setBusiness } = useUserPreferencesStore()
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
  const registerMutation = useRegisterMutation();

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginMutation.mutateAsync({ email, password });
      setUser(userData.body.user);
      setUserSession(userData.body.session);
      setSelectedBranch(userData.body.user.id_branch)
      setBusiness(userData.body.user.id_business)
      return userData;
    } catch (error) {
      console.error("Error de autenticación:", error);
      throw error;
    }
  }

  const register = async (email: string, password: string, businessName: string, branchName: string) => {
    try {
      const userData = await registerMutation.mutateAsync({ email, password, businessName, branchName });
      setUser(userData.body.user);
      setUserSession(userData.body.session);
      setSelectedBranch(userData.body.user.id_branch)
      setBusiness(userData.body.user.id_business)
      return userData;
    } catch (error) {
      console.error("Error de autenticación:", error);
      throw error;
    }
  }

  const logout = async () => {
    try {
      logoutStore()
      setSelectedBranch(null)
      setBusiness(null)
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  }

  return {
    userData,
    userSession,
    login,
    logout,
    register,
    isLoading: loginMutation.isPending,
    error: loginMutation.error
  }
}