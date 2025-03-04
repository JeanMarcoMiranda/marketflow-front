import { Inventory } from "../../data/models/inventorySchema";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useInventory } from "../../hooks/useInventory";

interface FormDeleteInventoryProps {
  data: Inventory;
  branchId: string;
  onSuccess: () => void;
}

export function FormDeleteInventory({
  data,
  branchId,
  onSuccess,
}: FormDeleteInventoryProps) {
  const { deleteInventoryMutation } = useInventory(branchId);

  const handleDelete = () => {
    deleteInventoryMutation.mutate(data.id, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        console.error("Error deleting inventory entry:", error);
      },
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Eliminar Inventario</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar este registro de inventario?
        </DialogDescription>
      </DialogHeader>
      <p>
        ¿Realmente deseas eliminar el registro de inventario del producto con ID{" "}
        <strong>{data.id_product}</strong>?
      </p>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleDelete}
          variant="destructive"
          disabled={deleteInventoryMutation.isPending}
        >
          {deleteInventoryMutation.isPending ? "Procesando..." : "Confirmar"}
        </Button>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancelar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
