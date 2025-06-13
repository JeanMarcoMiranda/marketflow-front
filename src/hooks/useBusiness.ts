import { useGetBusinessByIdQuery } from "@/api/queries/businessQueries";
import { useAuth } from "./useAuth"

export const useBusiness = () => {
  const { userData } = useAuth();
  const businessId = userData?.id_business;

  // Only enable the query if businessId is defined
  const queryResult = useGetBusinessByIdQuery(businessId ?? "");

  return {
    ...queryResult,
    business: queryResult.data,
    isBusinessLoading: queryResult.isLoading,
    businessError: queryResult.error,
    hasBusinessId: !!businessId,
  };
};