import { useBusiness } from "../../hooks/useBusiness";
import { DataTable } from "@/components/common/data-table";
import { Business } from "../../data/models/businessSchema";
import { getBusinessColumns } from "../../components/columns";
import { Button } from "@/components/ui/button";
import { FormCreateBusiness } from "../FormCreate/BusinessCreate";
import { useDialogStore } from "@/app/store/useDialogStore";
import { FormUpdateBusiness } from "../FormUpdate/BusinessUpdate";
import { FormDeleteBusiness } from "../FormDelete/BusinessDelete";

const BusinessList = () => {
  const { openDialog, closeDialog } = useDialogStore();
  const { businessesQuery } = useBusiness();

  const openCreateModal = () => {
    openDialog(
      <FormCreateBusiness
        onSuccess={async () => {
          closeDialog();
          businessesQuery.refetch();
        }}
      />
    );
  };

  const openEditModal = (business: Business) => {
    openDialog(
      <FormUpdateBusiness
        data={business}
        onSuccess={async () => {
          closeDialog();
          businessesQuery.refetch();
        }}
      />
    );
  };

  const openDeleteModal = (business: Business) => {
    openDialog(
      <FormDeleteBusiness
        data={business}
        onSuccess={async () => {
          closeDialog();
          businessesQuery.refetch();
        }}
      />
    );
  };

  const columns = getBusinessColumns(openEditModal, openDeleteModal);

  return (
    <>
      <div className="mb-4">
        <Button onClick={openCreateModal}>Agregar Negocio</Button>
      </div>

      {businessesQuery.isFetching ? (
        <div>Cargando Negocios...</div>
      ) : (
        <DataTable
          data={businessesQuery.data || []}
          columns={columns}
          toolbarProps={{
            searchColumnId: "name",
            searchPlaceholder: "Buscar por negocio...",
          }}
        />
      )}
    </>
  );
};

export default BusinessList;
