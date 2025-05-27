import { useProduct } from "../../hooks/useProduct";
import { DataTable } from "@/components/common/data-table";
import { Product } from "../../data/models/productSchema";
import { getColumns } from "../../components/columns";
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
import { FormCreateProduct } from "../FormCreate/ProductCreate";
import { useDialogStore } from "@/store/useDialogStore";
import { FormUpdateProduct } from "../FormUpdate/ProductUpdate";
import { FormDeleteProduct } from "../FormDelete/ProductDelete";

const ProductsList = () => {
  const { branchesQuery } = useBranchQuery();
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const { openDialog, closeDialog } = useDialogStore();

  // Si hay datos y no hay una sucursal seleccionada, establecer la primera disponible
  if (!selectedBranchId && branchesQuery.data?.length) {
    setSelectedBranchId(branchesQuery.data[0].id);
  }

  const { productsByBranchQuery } = useProduct(selectedBranchId || "");

  const openCreateModal = () => {
    openDialog(
      <FormCreateProduct
        idBranch={selectedBranchId || ""}
        onSuccess={async () => {
          closeDialog();
          productsByBranchQuery.refetch()
        }}
      />
    );
  };
  const openEditModal = (product: Product) => {
    openDialog(
      <FormUpdateProduct
        data={product}
        branchId={selectedBranchId || ""}
        onSuccess={async () => {
          closeDialog();
        }}
      />
    );
  };
  const openDeleteModal = (product: Product) => {
    openDialog(
      <FormDeleteProduct
        data={product}
        branchId={selectedBranchId || ""}
        onSuccess={async () => {
          closeDialog();
        }}
      />
    );
  };

  const columns = getColumns(openEditModal, openDeleteModal);

  return (
    <>
      <div className="mb-8">
        {branchesQuery.isFetching ? (
          <div className="text-center text-gray-500">
            Cargando productos...
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
        <Button onClick={openCreateModal}>Agregar Producto</Button>
      </div>

      {productsByBranchQuery.isFetching ? (
        <div>Cargando Productos...</div>
      ) : (
        <DataTable
          data={productsByBranchQuery.data || []}
          columns={columns}
          toolbarProps={{
            searchColumnId: "name",
            searchPlaceholder: "Buscar por producto...",
          }}
        />
      )}
    </>
  );
};

export default ProductsList;
