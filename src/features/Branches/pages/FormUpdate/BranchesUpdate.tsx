import { Branch } from "../../data/models/branchSchema";
import { FormComponent, FormComponentRef } from "../../components/form";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBranchQuery } from "../../hooks/useBranch";
import { useRef } from "react";

interface FormUpdateProps {
  data: Branch;
  onSuccess: () => void;
}

export function FormUpdate({ data, onSuccess }: FormUpdateProps) {
  const { updateBranchMutation } = useBranchQuery();
  const formRef = useRef<FormComponentRef>(null);

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
        ref={formRef}
        onSubmit={handleUpdate}
        loading={updateBranchMutation.isPending}
        initialData={data}
      />
      <DialogFooter>
        <Button
          onClick={() => formRef.current?.submitForm()}
          disabled={updateBranchMutation.isPending}
        >
          {updateBranchMutation.isPending ? "Procesando..." : "Editar"}
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
