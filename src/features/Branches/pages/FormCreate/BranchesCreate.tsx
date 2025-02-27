import { useState } from "react";
import { Branch } from "../../data/models/branchSchema";
import { FormComponent } from "../../components/form";
import { createBranch } from "../../service/branchService";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FormCreateProps {
  onSuccess: () => void;
}

export function FormCreate({ onSuccess }: FormCreateProps) {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: Omit<Branch, "id" | "created_at">) => {
    setLoading(true);
    try {
      await createBranch(formData);
      onSuccess();
    } catch (error) {
      console.error("Error creating branch:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">Crear Sucursal</DialogTitle>
        <DialogDescription>
          Ingresa la información para crear una nueva sucursal.
        </DialogDescription>
      </DialogHeader>
      <FormComponent onSubmit={handleCreate} loading={loading} />
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
