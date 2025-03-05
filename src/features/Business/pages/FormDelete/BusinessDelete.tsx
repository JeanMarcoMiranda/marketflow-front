import { Business } from "../../data/models/businessSchema";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBusiness } from "../../hooks/useBusiness";

interface FormDeleteBusinessProps {
  data: Business;
  onSuccess: () => void;
}

export function FormDeleteBusiness({
  data,
  onSuccess,
}: FormDeleteBusinessProps) {
  const { deleteBusinessMutation } = useBusiness();

  const handleDelete = () => {
    deleteBusinessMutation.mutate(data.id, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        console.error("Error deleting business:", error);
      },
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Eliminar Negocio</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar este negocio?
        </DialogDescription>
      </DialogHeader>
      <p>
        ¿Realmente deseas eliminar el negocio <strong>{data.name}</strong>?
      </p>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleDelete}
          variant="destructive"
          disabled={deleteBusinessMutation.isPending}
        >
          {deleteBusinessMutation.isPending ? "Procesando..." : "Confirmar"}
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
