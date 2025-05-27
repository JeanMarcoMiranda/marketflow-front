import { authService } from "@/api/services/authService";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onError: (error) => {
      console.error("Error de autenticación:", error);
    }
  })
}