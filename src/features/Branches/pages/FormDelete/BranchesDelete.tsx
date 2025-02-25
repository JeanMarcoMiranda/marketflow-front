import { Branch } from "../../data/branchSchema";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationProps {
  branch: Branch;
  onConfirm: () => Promise<void>;
}

export function FormDelete({ branch, onConfirm }: DeleteConfirmationProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Eliminar Sucursal</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar esta sucursal?
        </DialogDescription>
      </DialogHeader>
      <p>
        ¿Realmente deseas eliminar la sucursal <strong>{branch.name}</strong>?
      </p>
      <div className="mt-4 flex justify-end">
        <button onClick={onConfirm} className="btn btn-destructive">
          Confirmar
        </button>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancelar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
