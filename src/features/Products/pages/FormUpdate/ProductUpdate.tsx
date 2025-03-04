import { Product } from "../../data/models/productSchema";
import {
  FormComponentProduct,
  FormComponentProductRef,
} from "../../components/form";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProduct } from "../../hooks/useProduct";
import { useRef } from "react";

interface FormUpdateProps {
  data: Product;
  branchId: string;
  onSuccess: () => void;
}

export function FormUpdateProduct({
  data,
  branchId,
  onSuccess,
}: FormUpdateProps) {
  const { updateProductMutation } = useProduct(branchId);
  const formRef = useRef<FormComponentProductRef>(null);

  const handleUpdate = async (formData: Partial<Product>) => {
    updateProductMutation.mutate(
      { id: data.id, updates: formData },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          console.error("Error updating product:", error);
        },
      }
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogDescription>
          Modifica la información del producto.
        </DialogDescription>
      </DialogHeader>
      <h3 className="text-lg font-bold mb-4">Editar Producto</h3>
      <FormComponentProduct
        ref={formRef}
        onSubmit={handleUpdate}
        loading={updateProductMutation.isPending}
        initialData={data}
      />
      <DialogFooter>
        <Button
          onClick={() => formRef.current?.submitForm()}
          disabled={updateProductMutation.isPending}
        >
          {updateProductMutation.isPending ? "Procesando..." : "Editar"}
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
