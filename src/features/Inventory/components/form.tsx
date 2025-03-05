import { forwardRef, useImperativeHandle, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Inventory, inventorySchema } from "../data/models/inventorySchema";
import { useProduct } from "@/features/Products/hooks/useProduct";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormDataInventory = Omit<
  Inventory,
  "id" | "created_at" | "last_updated"
>;

export interface FormComponentInventoryRef {
  submitForm: () => void;
}

interface FormComponentInventoryProps {
  onSubmit: (data: FormDataInventory) => Promise<void>;
  loading: boolean;
  initialData?: Inventory;
  branchId: string;
}

export const FormComponentInventory = forwardRef(
  function FormComponentInventory(
    { onSubmit, loading, initialData, branchId }: FormComponentInventoryProps,
    ref
  ) {
    const { productsByBranchQuery } = useProduct(branchId);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormDataInventory>({
      resolver: zodResolver(
        inventorySchema.omit({ id: true, created_at: true, last_updated: true })
      ),
      defaultValues: {
        id_branch: initialData?.id_branch || branchId,
        id_product: initialData?.id_product || "",
        available_quantity: initialData?.available_quantity || 0,
        reorder_level: initialData?.reorder_level || 0,
      },
    });

    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
      submitForm() {
        handleSubmit(onSubmit)();
      },
    }));

    return (
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        {/* Producto */}
        <div className="mb-4">
          <label htmlFor="id_product" className="block mb-1">
            Producto
          </label>
          <select
            id="id_product"
            {...register("id_product")}
            className="border p-2 w-full"
          >
            <option value="">Selecciona un producto</option>
            {productsByBranchQuery.data?.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          {errors.id_product && (
            <p className="text-red-500 text-sm">{errors.id_product.message}</p>
          )}
        </div>

        {/* Cantidad Disponible */}
        <div className="mb-4">
          <label htmlFor="available_quantity" className="block mb-1">
            Cantidad Disponible
          </label>
          <input
            id="available_quantity"
            type="number"
            {...register("available_quantity", { valueAsNumber: true })}
            className="border p-2 w-full"
          />
          {errors.available_quantity && (
            <p className="text-red-500 text-sm">
              {errors.available_quantity.message}
            </p>
          )}
        </div>

        {/* Nivel de Reorden */}
        <div className="mb-4">
          <label htmlFor="reorder_level" className="block mb-1">
            Nivel de Reorden
          </label>
          <input
            id="reorder_level"
            type="number"
            {...register("reorder_level", { valueAsNumber: true })}
            className="border p-2 w-full"
          />
          {errors.reorder_level && (
            <p className="text-red-500 text-sm">
              {errors.reorder_level.message}
            </p>
          )}
        </div>

        {/* Botón de envío */}
        <div className="hidden">
          <Button type="submit" disabled={loading}>
            {loading ? "Procesando..." : "Guardar"}
          </Button>
        </div>
      </form>
    );
  }
);
