import { useQuery } from "@tanstack/react-query"
import { productService } from "../services/productService"

export const useGetProductsByBusinessAndBranchId = (id_business: string, id_branch: string) => {
  return useQuery({
    queryKey: ["productsByBusinessAndBranchId", id_business, id_branch],
    queryFn: () => productService.getProductsByBusinessAndBranchId(id_business, id_branch)
  })
}