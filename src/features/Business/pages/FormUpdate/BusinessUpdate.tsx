import { Business } from "../../data/models/businessSchema";
import {
  FormComponentBusiness,
  FormComponentBusinessRef,
} from "../../components/form";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBusiness } from "../../hooks/useBusiness";
import { useRef } from "react";

interface FormUpdateBusinessProps {
  data: Business;
  onSuccess: () => void;
}

export function FormUpdateBusiness({
  data,
  onSuccess,
}: FormUpdateBusinessProps) {
  const { updateBusinessMutation } = useBusiness();
  const formRef = useRef<FormComponentBusinessRef>(null);

  const handleUpdate = async (formData: Partial<Business>) => {
    updateBusinessMutation.mutate(
      { id: data.id, updates: formData },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          console.error("Error updating business:", error);
        },
      }
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Editar Negocio</DialogTitle>
        <DialogDescription>
          Modifica la información del negocio.
        </DialogDescription>
      </DialogHeader>
      <h3 className="text-lg font-bold mb-4">Editar Negocio</h3>
      <FormComponentBusiness
        ref={formRef}
        onSubmit={handleUpdate}
        loading={updateBusinessMutation.isPending}
        initialData={data}
      />
      <DialogFooter>
        <Button
          onClick={() => formRef.current?.submitForm()}
          disabled={updateBusinessMutation.isPending}
        >
          {updateBusinessMutation.isPending ? "Procesando..." : "Editar"}
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
