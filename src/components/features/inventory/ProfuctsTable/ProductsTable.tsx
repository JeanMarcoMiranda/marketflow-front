// ProductsTable.tsx

import { DataTable } from "@/components/common/DataTable/data-table"
import { useProduct } from "@/hooks/useProduct"
import { useUserPreferencesStore } from "@/store/useUserPreferences"
import { getProductColumns } from "./columns"
import { Button } from "@/components/ui/button"
import { Loader2, PlusCircle } from "lucide-react"
import { useDialogStore } from "@/store/useDialogStore"
import { ProductForm } from "../ProductForm/ProductForm"
import { Product } from "@/api/types/response.types"

function ProductsTable() {
  const { selected_branch_id, business_id } = useUserPreferencesStore()
  const {
    products,
    isLoading,
    error,
    refetch,
    createProduct,
    updateProduct,
    isCreating,
    isUpdating,
    createError: rawCreateError,
    updateError: rawUpdateError
  } = useProduct(business_id!, selected_branch_id!)

  const createError = rawCreateError ?? null;
  const updateError = rawUpdateError ?? null;

  const { openDialog, closeDialog } = useDialogStore()

  const handleSuccess = () => {
    closeDialog();
  };

  const handleCancel = () => {
    closeDialog();
  };

  const openCreateProductModal = () => {
    openDialog(
      <ProductForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        createProduct={createProduct}
        updateProduct={updateProduct}
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

  const openEditProductModal = (product: Product) => {
    openDialog(
      <ProductForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        createProduct={createProduct}
        updateProduct={updateProduct}
        isCreating={isCreating}
        isUpdating={isUpdating}
        createError={createError}
        updateError={updateError}
        idBusiness={business_id!}
        defaultValues={product}
        idBranch={selected_branch_id!}
      />,
      {
        maxWidth: "xl",
      }
    );
  };

  const columns = getProductColumns({
    onEdit: openEditProductModal,
  });

  const toolbarActions = (
    <>
      <Button
        variant="default"
        size="sm"
        onClick={openCreateProductModal}
        disabled={isLoading || !business_id || isCreating}
      >
        {isCreating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <PlusCircle className="mr-2 h-4 w-4" />
        )}
        {isCreating ? "Creando..." : "Agregar Producto"}
      </Button>
    </>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error al cargar productos
          </h3>
          <p className="text-gray-600 mb-4">
            No se pudieron cargar los productos. Intenta recargar la página.
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
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        </div>
      ) : (
        <DataTable
          data={products || []}
          columns={columns}
          toolbarProps={{
            actions: toolbarActions,
          }}
        />
      )}
    </>
  );
}

export default ProductsTable;