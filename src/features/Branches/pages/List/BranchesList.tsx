// import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { useDialogStore } from "@/app/store/useDialogStore";

import { getColumns } from "../../components/columns";
import { useBranchQuery } from "../../hooks/useBranch";
import { Branch } from "../../data/models/branchSchema";
import { FormCreate } from "../FormCreate/BranchesCreate";
import { FormUpdate } from "../FormUpdate/BranchesUpdate";
import { FormDelete } from "../FormDelete/BranchesDelete";

export function BranchesList() {
  const { branchesQuery } = useBranchQuery();
  const { openDialog, closeDialog } = useDialogStore();

  // Abre el modal de creación delegando todo el contenido en FormCreate
  const openCreateModal = () => {
    openDialog(
      <FormCreate
        onSuccess={async () => {
          closeDialog();
        }}
      />
    );
  };

  // Abre el modal de edición delegando el contenido en FormUpdate
  const openEditModal = (branch: Branch) => {
    openDialog(
      <FormUpdate
        data={branch}
        onSuccess={async () => {
          closeDialog();
        }}
      />
    );
  };

  // Abre el modal de eliminación delegando el contenido en FormDelete
  const openDeleteModal = (branch: Branch) => {
    openDialog(
      <FormDelete
        data={branch}
        onSuccess={async () => {
          closeDialog();
        }}
      />
    );
  };

  // Se generan las columnas pasando las funciones para abrir los modales
  const columns = getColumns(openEditModal, openDeleteModal);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Lista de Sucursales</h2>
      <div className="mb-4">
        <Button onClick={openCreateModal}>Agregar Sucursal</Button>
      </div>

      {branchesQuery.isFetching ? (
        <div>Loading branches...</div>
      ) : (
        <DataTable
          data={branchesQuery.data || []}
          columns={columns}
          toolbarProps={{
            searchColumnId: "name",
            searchPlaceholder: "Buscar por sucursal...",
          }}
        />
        //<DataTable
        //   data={users}
        //   columns={userColumns}
        //   toolbarProps={{
        //     searchColumnId: "username",
        //     searchPlaceholder: "Buscar usuario...",
        //     filters: [
        //       {
        //         columnId: "role",
        //         title: "Roles",
        //         options: [
        //           { label: "Admin", value: "admin" },
        //           { label: "Editor", value: "editor" },
        //           { label: "Viewer", value: "viewer" },
        //         ],
        //       },
        //     ],
        //   }}
        // />
      )}
    </>
  );
}
