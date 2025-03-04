import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  fetchProductsByBranchId,
  updateProduct,
} from "../data/service/productService";
import { Product } from "../data/models/productSchema";

export const useProduct = (branchId?: string) => {
  const queryClient = useQueryClient();

  // ✅ Obtener productos por sucursal
  const productsByBranchQuery = useQuery({
    queryKey: ["products", branchId],
    queryFn: () => (branchId ? fetchProductsByBranchId(branchId) : null),
    enabled: !!branchId,
  });

  // ✅ Crear un producto
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", branchId] });
    },
  });

  // ✅ Actualizar un producto
  const updateProductMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      updateProduct(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", branchId] });
    },
  });

  // ✅ Eliminar un producto
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", branchId] });
    },
  });

  return {
    productsByBranchQuery,
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  };
};
