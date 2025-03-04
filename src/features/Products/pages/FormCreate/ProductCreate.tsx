import { Product } from "../../data/models/productSchema";
import { FormComponentProduct, FormComponentProductRef } from "../../components/form";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useProduct } from "../../hooks/useProduct";


interface FormCreateProductProps {
  onSuccess: () => void;
  idBranch: string; // Recibe la ID de la sucursal seleccionada
}

export function FormCreateProduct({ onSuccess, idBranch }: FormCreateProductProps) {
  const { createProductMutation } = useProduct();
  const formRef = useRef<FormComponentProductRef>(null);

  const handleCreate = async (formData: Omit<Product, "id" | "created_at">) => {
    createProductMutation.mutate(
      { ...formData, id_branch: idBranch }, // Se asigna la ID de la sucursal
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          console.error("Error creating product:", error);
        },
      }
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">Crear Producto</DialogTitle>
        <DialogDescription>
          Ingresa la información para crear un nuevo producto.
        </DialogDescription>
      </DialogHeader>
      <FormComponentProduct
        ref={formRef}
        onSubmit={handleCreate}
        loading={createProductMutation.isPending}
      />
      <DialogFooter className="flex justify-end items-center gap-2">
        <Button
          onClick={() => formRef.current?.submitForm()}
          disabled={createProductMutation.isPending}
        >
          {createProductMutation.isPending ? "Procesando..." : "Guardar"}
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
