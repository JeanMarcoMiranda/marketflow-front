import { Product } from "../../data/models/productSchema";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProduct } from "../../hooks/useProduct";

interface FormDeleteProductProps {
  data: Product;
  branchId: string;
  onSuccess: () => void;
}

export function FormDeleteProduct({ data, branchId, onSuccess }: FormDeleteProductProps) {
  const { deleteProductMutation } = useProduct(branchId);

  const handleDelete = () => {
    deleteProductMutation.mutate(data.id, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        console.error("Error deleting product:", error);
      },
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Eliminar Producto</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar este producto?
        </DialogDescription>
      </DialogHeader>
      <p>
        ¿Realmente deseas eliminar el producto <strong>{data.name}</strong>?
      </p>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleDelete}
          variant="destructive"
          disabled={deleteProductMutation.isPending}
        >
          {deleteProductMutation.isPending ? "Procesando..." : "Confirmar"}
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
