import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { useDialogStore } from "@/app/store/useDialogStore";

import { Branch } from "../../data/models/branchSchema";
import { getColumns } from "../../components/columns";
import { fetchBranches } from "../../service/branchService";
import { FormCreate } from "../FormCreate/BranchesCreate";
import { FormUpdate } from "../FormUpdate/BranchesUpdate";
import { FormDelete } from "../FormDelete/BranchesDelete";

export function BranchesList() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const { openDialog, closeDialog } = useDialogStore();

  useEffect(() => {
    async function loadBranches() {
      try {
        const data = await fetchBranches();
        setBranches(data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBranches();
  }, []);

  // Función para refrescar la lista tras crear, editar o eliminar
  const refreshBranches = async () => {
    try {
      const data = await fetchBranches();
      setBranches(data);
    } catch (error) {
      console.error("Error refreshing branches:", error);
    }
  };

  // Abre el modal de creación delegando todo el contenido en FormCreate
  const openCreateModal = () => {
    openDialog(
      <FormCreate
        onSuccess={async () => {
          closeDialog();
          await refreshBranches();
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
          await refreshBranches();
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
          await refreshBranches();
        }}
      />
    );
  };

  // Se generan las columnas pasando las funciones para abrir los modales
  const columns = getColumns(openEditModal, openDeleteModal);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Sucursales</h2>
      <div className="mb-4">
        <Button onClick={openCreateModal}>Agregar Sucursal</Button>
      </div>
      {loading ? (
        <div>Loading branches...</div>
      ) : (
        <DataTable data={branches} columns={columns} />
      )}
    </div>
  );
}
