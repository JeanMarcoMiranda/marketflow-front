import { useGetProductsByBusinessAndBranchId } from "@/api/queries/productQueries";
import { Product } from "@/api/types/response.types";

interface UseProductsReturn {
  products: Product[] | undefined;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

export const useProduct = (id_business: string, id_branch: string): UseProductsReturn => {
  const { data, isLoading, error, refetch } = useGetProductsByBusinessAndBranchId(id_business, id_branch);

  return {
    products: data?.body,
    isLoading,
    error,
    refetch,
  };
};