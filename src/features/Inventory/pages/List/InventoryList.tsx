import { useInventory } from "../../hooks/useInventory";
import { DataTable } from "@/components/common/data-table";
import { Inventory } from "../../data/models/inventorySchema";
import { getInventoryColumns } from "../../components/columns";
import { useBranchQuery } from "@/features/Branches/hooks/useBranch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormCreateInventory } from "../FormCreate/InventoryCreate";
import { useDialogStore } from "@/app/store/useDialogStore";
import { FormUpdateInventory } from "../FormUpdate/InventoryUpdate";
import { FormDeleteInventory } from "../FormDelete/InventoryDelete";

const InventoryList = () => {
  const { branchesQuery } = useBranchQuery();
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const { openDialog, closeDialog } = useDialogStore();

  // Si hay datos y no hay una sucursal seleccionada, establecer la primera disponible
  if (!selectedBranchId && branchesQuery.data?.length) {
    setSelectedBranchId(branchesQuery.data[0].id);
  }

  const { inventoryByBranchQuery } = useInventory(selectedBranchId || "");

  const openCreateModal = () => {
    openDialog(
      <FormCreateInventory
        idBranch={selectedBranchId || ""}
        onSuccess={async () => {
          closeDialog();
          inventoryByBranchQuery.refetch();
        }}
      />
    );
  };

  const openEditModal = (inventory: Inventory) => {
    openDialog(
      <FormUpdateInventory
        data={inventory}
        branchId={selectedBranchId || ""}
        onSuccess={async () => {
          closeDialog();
          inventoryByBranchQuery.refetch();
        }}
      />
    );
  };

  const openDeleteModal = (inventory: Inventory) => {
    openDialog(
      <FormDeleteInventory
        data={inventory}
        branchId={selectedBranchId || ""}
        onSuccess={async () => {
          closeDialog();
          inventoryByBranchQuery.refetch();
        }}
      />
    );
  };

  const columns = getInventoryColumns(openEditModal, openDeleteModal);

  return (
    <>
      <div className="mb-8">
        {branchesQuery.isFetching ? (
          <div className="text-center text-gray-500">
            Cargando sucursales...
          </div>
        ) : (
          <div className="space-y-2">
            <Label
              htmlFor="branch-select"
              className="text-lg font-semibold mb-4"
            >
              Seleccionar Sucursal
            </Label>
            <Select
              onValueChange={setSelectedBranchId}
              value={selectedBranchId || ""}
            >
              <SelectTrigger className="w-full md:w-64 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm">
                <SelectValue placeholder="Selecciona una sucursal" />
              </SelectTrigger>
              <SelectContent>
                {branchesQuery.data?.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="mb-4">
        <Button onClick={openCreateModal}>Agregar Inventario</Button>
      </div>

      {inventoryByBranchQuery.isFetching ? (
        <div>Cargando Inventario...</div>
      ) : (
        <DataTable
          data={inventoryByBranchQuery.data || []}
          columns={columns}
          toolbarProps={{
            searchColumnId: "id_product",
            searchPlaceholder: "Buscar por ID de producto...",
          }}
        />
      )}
    </>
  );
};

export default InventoryList;
