import {
  useGetProductsByBusinessAndBranchId,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/api/queries/productQueries";
import { Product, CreateProductPayload, UpdateProductPayload } from "@/api/types/response.types";

interface UseProductsReturn {
  products: Product[] | undefined;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  createProduct: (payload: CreateProductPayload) => Promise<void>;
  updateProduct: (
    product_id: string,
    business_id: string,
    payload: UpdateProductPayload
  ) => Promise<void>;
  deleteProduct: (product_id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  createError: unknown;
  updateError: unknown;
  deleteError: unknown;
}

export const useProduct = (id_business: string, id_branch: string): UseProductsReturn => {
  // Query for fetching products
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetProductsByBusinessAndBranchId(id_business, id_branch);

  // Mutation for creating a product
  const createMutation = useCreateProduct();

  // Mutation for updating a product
  const updateMutation = useUpdateProduct();

  // Mutation for deleting a product
  const deleteMutation = useDeleteProduct();

  // Create product handler
  const createProduct = async (payload: CreateProductPayload): Promise<void> => {
    try {
      await createMutation.mutateAsync(payload);
    } catch (err) {
      throw new Error(`Failed to create product: ${err}`);
    }
  };

  // Update product handler
  const updateProduct = async (
    product_id: string,
    business_id: string,
    payload: UpdateProductPayload
  ): Promise<void> => {
    try {
      await updateMutation.mutateAsync({
        product_id,
        business_id,
        product: payload,
      });
    } catch (err) {
      throw new Error(`Failed to update product: ${err}`);
    }
  };

  // Delete product handler
  const deleteProduct = async (product_id: string): Promise<void> => {
    try {
      await deleteMutation.mutateAsync(product_id);
    } catch (err) {
      throw new Error(`Failed to delete product: ${err}`);
    }
  };

  return {
    products: data?.body, // Assuming ApiResponse has a 'data' field
    isLoading,
    error,
    refetch,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};