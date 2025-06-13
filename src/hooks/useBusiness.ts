import { useGetBusinessBranchesById, useGetBusinessByIdQuery } from "@/api/queries/businessQueries";
import { useAuth } from "./useAuth";

export const useBusiness = () => {
  const { userData } = useAuth();
  const businessId = userData?.id_business;

  // Fetch business details
  const businessQuery = useGetBusinessByIdQuery(businessId ?? "");

  // Fetch business branches
  const branchesQuery = useGetBusinessBranchesById(businessId ?? "");

  return {
    // Business query results
    business: businessQuery.data,
    isBusinessLoading: businessQuery.isLoading,
    businessError: businessQuery.error,
    // Branches query results
    branches: branchesQuery.data,
    isBranchesLoading: branchesQuery.isLoading,
    branchesError: branchesQuery.error,
    // Shared state
    hasBusinessId: !!businessId,
    isAnyLoading: businessQuery.isLoading || branchesQuery.isLoading,
    hasAnyError: businessQuery.error || branchesQuery.error,
  };
};