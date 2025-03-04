import { useQuery } from "@tanstack/react-query";
import { fetchProductsByBranchId } from "../data/service/productService";

export const useProduct = (branchId?: string) => {
  // ✅ Obtener productos por sucursal
  const productsByBranchQuery = useQuery({
    queryKey: ["products", branchId],
    queryFn: () => (branchId ? fetchProductsByBranchId(branchId) : null),
    enabled: !!branchId,
  });

  return {
    productsByBranchQuery,
  };
};
