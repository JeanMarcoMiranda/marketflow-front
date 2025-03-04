import { Branch } from "../../data/models/branchSchema";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBranchQuery } from "@/shared/hooks/useBranch";

interface FormDeleteProps {
  data: Branch;
  onSuccess: () => void;
}

export function FormDelete({ data, onSuccess }: FormDeleteProps) {
  const { deleteBranchMutation } = useBranchQuery();

  const handleDelete = () => {
    deleteBranchMutation.mutate(data.id, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        console.error("Error deleting branch:", error);
      },
    });
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
        <Button
          onClick={handleDelete}
          variant="destructive"
          disabled={deleteBranchMutation.isPending}
        >
          {deleteBranchMutation.isPending ? "Procesando..." : "Confirmar"}
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
