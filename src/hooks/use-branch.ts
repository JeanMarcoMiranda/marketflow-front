import { useCreateBranchMutation } from '@/api/queries/branch-queries';
import { CreateBranch } from '@/api/types/response.types';
import { useCallback } from 'react';

export const useBranch = () => {
  const createBranchMutation = useCreateBranchMutation();

  // Función para crear una sucursal
  const createBranch = useCallback(
    async (branch: CreateBranch) => {
      if (!branch.name || !branch.id_business) {
        throw new Error('El nombre y el ID del negocio son obligatorios');
      }
      const response = await createBranchMutation.mutateAsync(branch);
      return response;
    },
    [createBranchMutation]
  );

  return {
    // Operaciones
    createBranch,
    // Estados de creación
    isCreating: createBranchMutation.isPending,
    isCreateError: createBranchMutation.isError,
    createError: createBranchMutation.error,
    isCreateSuccess: createBranchMutation.isSuccess,
    createData: createBranchMutation.data,
  };
};