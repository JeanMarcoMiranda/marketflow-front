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
import { useInventory } from "../../hooks/useInventory";
import { useRef } from "react";

interface FormUpdateInventoryProps {
  data: Inventory;
  branchId: string;
  onSuccess: () => void;
}

export function FormUpdateInventory({
  data,
  branchId,
  onSuccess,
}: FormUpdateInventoryProps) {
  const { updateInventoryMutation } = useInventory(branchId);
  const formRef = useRef<FormComponentInventoryRef>(null);

  const handleUpdate = async (formData: Partial<Inventory>) => {
    updateInventoryMutation.mutate(
      { id: data.id, updates: formData },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          console.error("Error updating inventory entry:", error);
        },
      }
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Editar Inventario</DialogTitle>
        <DialogDescription>
          Modifica la información del registro de inventario.
        </DialogDescription>
      </DialogHeader>
      <h3 className="text-lg font-bold mb-4">Editar Inventario</h3>
      <FormComponentInventory
        ref={formRef}
        onSubmit={handleUpdate}
        loading={updateInventoryMutation.isPending}
        initialData={data}
        branchId={branchId}
      />
      <DialogFooter>
        <Button
          onClick={() => formRef.current?.submitForm()}
          disabled={updateInventoryMutation.isPending}
        >
          {updateInventoryMutation.isPending ? "Procesando..." : "Editar"}
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
