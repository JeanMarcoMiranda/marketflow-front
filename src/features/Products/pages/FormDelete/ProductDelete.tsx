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
import { Trash2 } from "lucide-react";

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
        <DialogTitle className="text-lg font-bold">Eliminar Producto</DialogTitle>
        <DialogDescription className="text-gray-500">
          Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este producto?
        </DialogDescription>
      </DialogHeader>

      <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
        <p className="text-sm text-gray-700">
          ¿Realmente deseas eliminar el producto{" "}
          <span className="font-semibold text-destructive">{data.name}</span>?
        </p>
      </div>

      <DialogFooter className="flex justify-between items-center gap-4">
        <DialogClose asChild>
          <Button variant="secondary">Cancelar</Button>
        </DialogClose>
        <Button
          onClick={handleDelete}
          variant="destructive"
          disabled={deleteProductMutation.isPending}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          {deleteProductMutation.isPending ? "Eliminando..." : "Confirmar"}
        </Button>
      </DialogFooter>
    </>
  );
}