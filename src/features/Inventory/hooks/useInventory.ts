import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInventory,
  deleteInventory,
  fetchInventoryByBranchId,
  updateInventory,
} from "../data/service/inventoryService";
import { Inventory } from "../data/models/inventorySchema";

export const useInventory = (branchId?: string) => {
  const queryClient = useQueryClient();

  // ✅ Obtener inventario por sucursal
  const inventoryByBranchQuery = useQuery({
    queryKey: ["inventory", branchId],
    queryFn: () => (branchId ? fetchInventoryByBranchId(branchId) : null),
    enabled: !!branchId,
  });

  // ✅ Crear un nuevo registro de inventario
  const createInventoryMutation = useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", branchId] });
    },
  });

  // ✅ Actualizar un registro de inventario
  const updateInventoryMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Inventory>;
    }) => updateInventory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", branchId] });
    },
  });

  // ✅ Eliminar un registro de inventario
  const deleteInventoryMutation = useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", branchId] });
    },
  });

  return {
    inventoryByBranchQuery,
    createInventoryMutation,
    updateInventoryMutation,
    deleteInventoryMutation,
  };
};
