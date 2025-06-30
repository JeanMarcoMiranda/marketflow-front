import { authService } from "@/api/services/auth-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onError: (error) => {
      console.error("Error de autenticación:", error);
    }
  })
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: ({ email, password, businessName, branchName }: { email: string; password: string, businessName: string, branchName: string }) =>
      authService.register(email, password, businessName, branchName),
    onError: (error) => {
      console.error("Error de registro:", error);
    }
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
    onError: (error) => {
      console.error("Error al cerrar sesión:", error);
    }
  })
}

export const useGetCurrentAuthUserQuery = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentAuthUser(),
  })
}