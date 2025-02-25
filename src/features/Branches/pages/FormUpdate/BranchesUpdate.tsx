import { useState, useEffect } from "react";
import { Branch } from "../../data/branchSchema";
import { FormComponent } from "../../components/form";
import { updateBranch } from "../../service/branchService";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FormUpdateProps {
  branchData: Branch;
  onSuccess: () => void;
}

export function FormUpdate({ branchData, onSuccess }: FormUpdateProps) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Branch | null>(null);

  useEffect(() => {
    // Si se requiere, se puede hacer una carga más detallada de los datos.
    setInitialData(branchData);
  }, [branchData]);

  const handleUpdate = async (formData: Partial<Branch>) => {
    setLoading(true);
    try {
      await updateBranch(branchData.id, formData);
      onSuccess();
    } catch (error) {
      console.error("Error updating branch:", error);
    } finally {
      setLoading(false);
    }
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
      {initialData && (
        <FormComponent
          onSubmit={handleUpdate}
          loading={loading}
          initialData={initialData}
        />
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
