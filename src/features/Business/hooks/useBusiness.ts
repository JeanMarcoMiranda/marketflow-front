import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBusiness,
  deleteBusiness,
  fetchBusinesses,
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
