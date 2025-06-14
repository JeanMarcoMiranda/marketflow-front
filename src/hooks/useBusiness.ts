import { useGetBusinessBranchesById, useGetBusinessByIdQuery } from "@/api/queries/businessQueries";
import { useAuth } from "./useAuth";

export const useBusiness = () => {
  const { userData } = useAuth();
  const businessId = userData?.id_business;

  // Fetch business details
  const businessQuery = useGetBusinessByIdQuery(businessId ?? "");

  // Fetch business branches
  const businessBranchesQuery = useGetBusinessBranchesById(businessId ?? "");

  return {
    // Business query results
    business: businessQuery.data,
    isBusinessLoading: businessQuery.isLoading,
    businessError: businessQuery.error,
    // Branches query results
    branches: businessBranchesQuery.data?.body,
    isBranchesLoading: businessBranchesQuery.isLoading,
    branchesError: businessBranchesQuery.error,
    // Shared state
    hasBusinessId: !!businessId,
    isAnyLoading: businessQuery.isLoading || businessBranchesQuery.isLoading,
    hasAnyError: businessQuery.error || businessBranchesQuery.error,
  };
};