// InventoriesTable.tsx

import { DataTable } from "@/components/common/data-table/data-table";
import { useInventory } from "@/hooks/use-inventory";
import { useUserPreferencesStore } from "@/store/use-user-preferences-store";
import { getInventoryColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useDialogStore } from "@/store/use-dialog-store";
import { InventoryForm } from "../inventory-form/inventory-form";
import { Inventory } from "@/api/types/response.types";

function InventoryTable() {
  const { selected_branch_id, business_id } = useUserPreferencesStore();
  const {
    inventories,
    isLoading,
    error,
    refetch,
    createInventory,
    updateInventory,
    isCreating,
    isUpdating,
    createError: rawCreateError,
    updateError: rawUpdateError,
  } = useInventory(business_id!, selected_branch_id!);

  const createError = rawCreateError ?? null;
  const updateError = rawUpdateError ?? null;

  const { openDialog, closeDialog } = useDialogStore();

  const handleSuccess = () => {
    closeDialog();
    refetch();
  };

  const handleCancel = () => {
    closeDialog();
  };

  const openCreateInventoryModal = () => {
    openDialog(
      <InventoryForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        createInventory={createInventory}
        updateInventory={updateInventory}
        isCreating={isCreating}
        isUpdating={isUpdating}
        createError={createError}
        updateError={updateError}
        idBusiness={business_id!}
        idBranch={selected_branch_id!}
      />,
      {
        maxWidth: "xl",
      }
    );
  };

  const openEditInventoryModal = (inventory: Inventory) => {
    openDialog(
      <InventoryForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        createInventory={createInventory}
        updateInventory={updateInventory}
        isCreating={isCreating}
        isUpdating={isUpdating}
        createError={createError}
        updateError={updateError}
        idBusiness={business_id!}
        defaultValues={inventory}
        idBranch={selected_branch_id!}
      />,
      {
        maxWidth: "xl",
      }
    );
  };

  const columns = getInventoryColumns({
    onEdit: openEditInventoryModal,
  });

  const toolbarActions = (
    <Button
      variant="default"
      size="sm"
      onClick={openCreateInventoryModal}
      disabled={isLoading || !business_id || isCreating}
    >
      {isCreating ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PlusCircle className="mr-2 h-4 w-4" />
      )}
      {isCreating ? "Creando..." : "Agregar Inventario"}
    </Button>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error al cargar inventario
          </h3>
          <p className="text-gray-600 mb-4">
            No se pudieron cargar los registros de inventario. Intenta recargar
            la página.
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">Cargando inventario...</p>
          </div>
        </div>
      ) : (
        <DataTable
          data={inventories || []}
          columns={columns}
          toolbarProps={{
            actions: toolbarActions,
          }}
        />
      )}
    </>
  );
}

export default InventoryTable;
