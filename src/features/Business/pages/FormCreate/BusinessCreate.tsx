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
import { useRef } from "react";
import { useBusiness } from "../../hooks/useBusiness";

interface FormCreateBusinessProps {
  onSuccess: () => void;
}

export function FormCreateBusiness({ onSuccess }: FormCreateBusinessProps) {
  const { createBusinessMutation } = useBusiness();
  const formRef = useRef<FormComponentBusinessRef>(null);

  const handleCreate = async (
    formData: Omit<Business, "id" | "created_at">
  ) => {
    createBusinessMutation.mutate(formData, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        console.error("Error creating business:", error);
      },
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">Crear Negocio</DialogTitle>
        <DialogDescription>
          Ingresa la información para crear un nuevo negocio.
        </DialogDescription>
      </DialogHeader>
      <FormComponentBusiness
        ref={formRef}
        onSubmit={handleCreate}
        loading={createBusinessMutation.isPending}
      />
      <DialogFooter className="flex justify-end items-center gap-2">
        <Button
          onClick={() => formRef.current?.submitForm()}
          disabled={createBusinessMutation.isPending}
        >
          {createBusinessMutation.isPending ? "Procesando..." : "Guardar"}
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
