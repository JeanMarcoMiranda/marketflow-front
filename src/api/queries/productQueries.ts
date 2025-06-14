import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { productService } from "../services/productService"
import { ApiResponse, CreateProductPayload, Product, UpdateProductPayload } from "../types/response.types";

export const useGetProductsByBusinessAndBranchId = (
  id_business: string,
  id_branch: string
) => {
  return useQuery({
    queryKey: ["productsByBusinessAndBranchId", id_business, id_branch],
    queryFn: () => productService.getProductsByBusinessAndBranchId(id_business, id_branch),
    enabled: !!id_business && !!id_branch, // Only run query if both IDs are provided
    staleTime: 5 * 60 * 1000, // 5 minutes stale time
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: CreateProductPayload) => productService.createProduct(product),
    onSuccess: () => {
      // Invalidate products query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["productsByBusinessAndBranchId"],
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      product_id,
      business_id,
      product,
    }: {
      product_id: string;
      business_id: string;
      product: UpdateProductPayload;
    }) => productService.updateProduct(product_id, business_id, product),
    onSuccess: (data: ApiResponse<Product>) => {
      // Invalidate products query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["productsByBusinessAndBranchId"],
      });
      // Optionally update the specific product in cache
      queryClient.setQueryData(
        ["productsByBusinessAndBranchId"],
        (oldData: ApiResponse<Product[]> | undefined) => {
          if (!oldData?.body) return oldData;
          return {
            ...oldData,
            data: oldData.body.map((item) =>
              item.id === data.body.id ? data.body : item
            ),
          };
        }
      );
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product_id: string) => productService.deleteProduct(product_id),
    onSuccess: () => {
      // Invalidate products query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["productsByBusinessAndBranchId"],
      });
    },
  });
};