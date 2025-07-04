import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "../services/inventory-service";
import {
  ApiResponse,
  CreateInventoryPayload,
  UpdateInventoryPayload,
  Inventory,
} from "../types/response.types";

export const useGetInventoriesByBusinessAndBranchId = (
  id_business: string,
  id_branch?: string
) => {
  return useQuery({
    queryKey: ["inventoriesByBusinessAndBranchId", id_business, id_branch],
    queryFn: () =>
      inventoryService.getInventoriesByBusinessAndBranchId(
        id_business,
        id_branch
      ),
    enabled: !!id_business, // Only run query if id_business is provided
    staleTime: 5 * 60 * 1000, // 5 minutes stale time
  });
};

export const useCreateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inventory: CreateInventoryPayload) =>
      inventoryService.createInventory(inventory),
    onSuccess: () => {
      // Invalidate inventories query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["inventoriesByBusinessAndBranchId"],
      });
    },
  });
};

export const useUpdateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inventory_id,
      business_id,
      inventory,
    }: {
      inventory_id: string;
      business_id: string;
      inventory: UpdateInventoryPayload;
    }) =>
      inventoryService.updateInventory(inventory_id, business_id, inventory),
    onSuccess: (data: ApiResponse<Inventory>) => {
      // Invalidate inventories query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["inventoriesByBusinessAndBranchId"],
      });
      // Optionally update the specific inventory in cache
      queryClient.setQueryData(
        ["inventoriesByBusinessAndBranchId"],
        (oldData: ApiResponse<Inventory[]> | undefined) => {
          if (!oldData?.body || !Array.isArray(oldData.body)) return oldData;
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

export const useDeleteInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inventory_id,
      business_id,
    }: {
      inventory_id: string;
      business_id: string;
    }) => inventoryService.deleteInventory(inventory_id, business_id),
    onSuccess: () => {
      // Invalidate inventories query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["inventoriesByBusinessAndBranchId"],
      });
    },
  });
};
