import { Branch } from "@/features/Branches/data/models/branchSchema";
import {
  fetchBranch,
  createBranch,
  updateBranch,
  deleteBranch,
} from "@/features/Branches/data/service/branchService";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export const useBranchQuery = () => {
  const queryClient = useQueryClient();

  // ✅ Obtener sucursales
  const branchesQuery = useQuery({
    queryKey: ["branch"],
    queryFn: fetchBranch,
  });

  // ✅ Crear sucursal
  const createBranchMutation = useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branch"] });
    },
  });

  // ✅ Actualizar sucursal
  const updateBranchMutation = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: Partial<Branch>;
    }) => updateBranch(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branch"] });
    },
  });

  // ✅ Eliminar sucursal
  const deleteBranchMutation = useMutation({
    mutationFn: (id: string) => deleteBranch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branch"] });
    },
  });

  return {
    branchesQuery,
    createBranchMutation,
    updateBranchMutation,
    deleteBranchMutation,
  };
};
