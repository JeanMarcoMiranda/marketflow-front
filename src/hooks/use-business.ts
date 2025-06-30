import {
  useGetBusinessBranchesById,
  useGetBusinessByIdQuery,
} from "@/api/queries/business-queries";
import { useMemo } from "react";

export const useBusiness = (businessId: string) => {
  // Ejecutar los queries
  const {
    data: businessData,
    isLoading: isLoadingBusiness,
    isError: isErrorBusiness,
    error: businessError,
    refetch: refetchBusiness
  } = useGetBusinessByIdQuery(businessId);

  const {
    data: branchesData,
    isLoading: isLoadingBranches,
    isError: isErrorBranches,
    error: branchesError,
    refetch: refetchBranches
  } = useGetBusinessBranchesById(businessId);

  // Calcular estados combinados
  const isLoading = isLoadingBusiness || isLoadingBranches;
  const isError = isErrorBusiness || isErrorBranches;
  const error = businessError || branchesError;

  // Memoizar los datos combinados para evitar recálculos innecesarios
  const businessWithBranches = useMemo(() => {
    if (!businessData?.body || !branchesData?.body) return null;

    return {
      ...businessData.body,
      branches: branchesData.body
    };
  }, [businessData, branchesData]);

  // Función para refetch de todos los datos
  const refetchAll = () => {
    refetchBusiness();
    refetchBranches();
  };

  return {
    // Datos individuales
    business: businessData?.body,
    branches: branchesData?.body,

    // Datos combinados
    businessWithBranches,

    // Estados de carga
    isLoading,
    isLoadingBusiness,
    isLoadingBranches,

    // Estados de error
    isError,
    isErrorBusiness,
    isErrorBranches,
    error,

    // Funciones de refetch
    refetchBusiness,
    refetchBranches,
    refetchAll,

    // Datos crudos de las respuestas (por si necesitas metadata)
    businessResponse: businessData,
    branchesResponse: branchesData
  };
};
