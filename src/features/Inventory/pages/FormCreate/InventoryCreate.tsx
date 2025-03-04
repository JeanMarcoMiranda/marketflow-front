import { Inventory } from "../../data/models/inventorySchema";
import {
  FormComponentInventory,
  FormComponentInventoryRef,
} from "../../components/form";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useInventory } from "../../hooks/useInventory";

interface FormCreateInventoryProps {
  onSuccess: () => void;
  idBranch: string; // Recibe la ID de la sucursal seleccionada
}

export function FormCreateInventory({
  onSuccess,
  idBranch,
}: FormCreateInventoryProps) {
  const { createInventoryMutation } = useInventory(idBranch);
  const formRef = useRef<FormComponentInventoryRef>(null);

  const handleCreate = async (
    formData: Omit<Inventory, "id" | "created_at" | "last_updated">
  ) => {
    createInventoryMutation.mutate(
      { ...formData, id_branch: idBranch }, // Se asigna la ID de la sucursal
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          console.error("Error creating inventory entry:", error);
        },
      }
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">
          Crear Inventario
        </DialogTitle>
        <DialogDescription>
          Ingresa la información para agregar un nuevo registro de inventario.
        </DialogDescription>
      </DialogHeader>
      <FormComponentInventory
        ref={formRef}
        onSubmit={handleCreate}
        loading={createInventoryMutation.isPending}
        branchId={idBranch}
      />
      <DialogFooter className="flex justify-end items-center gap-2">
        <Button
          onClick={() => formRef.current?.submitForm()}
          disabled={createInventoryMutation.isPending}
        >
          {createInventoryMutation.isPending ? "Procesando..." : "Guardar"}
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
