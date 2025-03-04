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

interface FormCreateProps {
  onSuccess: () => void;
}

export function FormCreate({ onSuccess }: FormCreateProps) {
  const { createBranchMutation } = useBranchQuery();
  const formRef = useRef<FormComponentRef>(null);

  const handleCreate = async (formData: Omit<Branch, "id" | "created_at">) => {
    createBranchMutation.mutate(formData, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        console.error("Error creating branch:", error);
      },
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">Crear Sucursal</DialogTitle>
        <DialogDescription>
          Ingresa la información para crear una nueva sucursal.
        </DialogDescription>
      </DialogHeader>
      <FormComponent
        ref={formRef}
        onSubmit={handleCreate}
        loading={createBranchMutation.isPending}
      />
      <DialogFooter className="flex justify-end items-center gap-2">
        <Button
          onClick={() => formRef.current?.submitForm()}
          disabled={createBranchMutation.isPending}
        >
          {createBranchMutation.isPending ? "Procesando..." : "Guardar"}
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
