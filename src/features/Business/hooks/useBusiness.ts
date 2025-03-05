import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBusiness,
  deleteBusiness,
  fetchBusinesses,
  fetchBusinessesBySuperAdminId,
  updateBusiness,
} from "../data/service/businessService";
import { Business } from "../data/models/businessSchema";

export const useBusiness = (businessId?: string) => {
  const queryClient = useQueryClient();

  // ✅ Obtener todos los negocios
  const businessesQuery = useQuery({
    queryKey: ["businesses"],
    queryFn: fetchBusinesses,
  });

  // ✅ Crear un negocio
  const createBusinessMutation = useMutation({
    mutationFn: createBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses", businessId] });
    },
  });

  // ✅ Actualizar un negocio
  const updateBusinessMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Business> }) =>
      updateBusiness(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses", businessId] });
    },
  });

  // ✅ Eliminar un negocio
  const deleteBusinessMutation = useMutation({
    mutationFn: deleteBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses", businessId] });
    },
  });

  return {
    businessesQuery,
    createBusinessMutation,
    updateBusinessMutation,
    deleteBusinessMutation,
  };
};

// ✅ Hook para verificar si un usuario tiene negocios (Para el Dashboard)
export const useUserBusiness = (userId: string) => {
  const queryClient = useQueryClient();

  // ✅ Obtener negocios del usuario por su ID
  const userBusinessesQuery = useQuery({
    queryKey: ["userBusinesses", userId],
    queryFn: () => fetchBusinessesBySuperAdminId(userId),
    enabled: !!userId, // Solo ejecuta la consulta si el usuario está logueado
  });

  // ✅ Crear un negocio y asociarlo al usuario
  const createUserBusinessMutation = useMutation({
    mutationFn: async (businessData: Omit<Business, "id">) => {
      const business = await createBusiness(businessData);

      // Refrescar la lista de negocios del usuario
      queryClient.invalidateQueries({ queryKey: ["userBusinesses", userId] });

      return business;
    },
  });

  return { userBusinessesQuery, createUserBusinessMutation };
};
