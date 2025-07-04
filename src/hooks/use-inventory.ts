import {
  useGetInventoriesByBusinessAndBranchId,
  useCreateInventory,
  useUpdateInventory,
  useDeleteInventory,
} from "@/api/queries/inventory-queries";
import {
  Inventory,
  CreateInventoryPayload,
  UpdateInventoryPayload,
} from "@/api/types/response.types";

interface UseInventoryReturn {
  inventories: Inventory[] | undefined;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  createInventory: (payload: CreateInventoryPayload) => Promise<void>;
  updateInventory: (
    inventory_id: string,
    business_id: string,
    payload: UpdateInventoryPayload
  ) => Promise<void>;
  deleteInventory: (inventory_id: string, business_id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  createError: unknown;
  updateError: unknown;
  deleteError: unknown;
}

export const useInventory = (
  id_business: string,
  id_branch?: string
): UseInventoryReturn => {
  // Query for fetching inventories
  const { data, isLoading, error, refetch } =
    useGetInventoriesByBusinessAndBranchId(id_business, id_branch);

  // Mutation for creating an inventory
  const createMutation = useCreateInventory();

  // Mutation for updating an inventory
  const updateMutation = useUpdateInventory();

  // Mutation for deleting an inventory
  const deleteMutation = useDeleteInventory();

  // Create inventory handler
  const createInventory = async (
    payload: CreateInventoryPayload
  ): Promise<void> => {
    await createMutation.mutateAsync(payload);
  };

  // Update inventory handler
  const updateInventory = async (
    inventory_id: string,
    business_id: string,
    payload: UpdateInventoryPayload
  ): Promise<void> => {
    await updateMutation.mutateAsync({
      inventory_id,
      business_id,
      inventory: payload,
    });
  };

  // Delete inventory handler
  const deleteInventory = async (
    inventory_id: string,
    business_id: string
  ): Promise<void> => {
    await deleteMutation.mutateAsync({ inventory_id, business_id });
  };

  return {
    inventories: data?.body, // Extract inventory array from response
    isLoading,
    error,
    refetch,
    createInventory,
    updateInventory,
    deleteInventory,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};
