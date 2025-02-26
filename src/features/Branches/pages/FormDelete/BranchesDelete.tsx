import { useState } from "react";
import { Branch } from "../../data/models/branchSchema";
import { deleteBranch } from "../../service/branchService";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FormDeleteProps {
  data: Branch;
  onSuccess: () => void;
}

export function FormDelete({ data, onSuccess }: FormDeleteProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteBranch(data.id);
      onSuccess();
    } catch (error) {
      console.error("Error deleting branch:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Eliminar Sucursal</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar esta sucursal?
        </DialogDescription>
      </DialogHeader>
      <p>
        ¿Realmente deseas eliminar la sucursal <strong>{data.name}</strong>?
      </p>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleDelete} variant="destructive" disabled={loading}>
          {loading ? "Procesando..." : "Confirmar"}
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
