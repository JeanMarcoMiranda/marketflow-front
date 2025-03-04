import { Branch } from "../../data/models/branchSchema";
import { FormComponent } from "../../components/form";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBranchQuery } from "@/shared/hooks/useBranch";

interface FormUpdateProps {
  data: Branch;
  onSuccess: () => void;
}

export function FormUpdate({ data, onSuccess }: FormUpdateProps) {
  const { updateBranchMutation } = useBranchQuery();

  const handleUpdate = async (formData: Partial<Branch>) => {
    updateBranchMutation.mutate(
      { id: data.id, updatedData: formData },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          console.error("Error updating branch:", error);
        },
      }
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Editar Sucursal</DialogTitle>
        <DialogDescription>
          Modifica la información de la sucursal.
        </DialogDescription>
      </DialogHeader>
      <h3 className="text-lg font-bold mb-4">Editar Sucursal</h3>
      <FormComponent
        onSubmit={handleUpdate}
        loading={updateBranchMutation.isPending}
        initialData={data}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
