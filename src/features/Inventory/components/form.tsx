import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Inventory } from "../data/models/inventorySchema";
import { useProduct } from "@/features/Products/hooks/useProduct";

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

    const [formData, setFormData] = useState<FormDataInventory>({
      id_branch: initialData?.id_branch || branchId,
      id_product: initialData?.id_product || "",
      available_quantity: initialData?.available_quantity || 0,
      reorder_level: initialData?.reorder_level || 0,
    });

    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
      submitForm() {
        onSubmit(formData);
      },
    }));

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value, type } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) || 0 : value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await onSubmit(formData);
    };

    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="id_product" className="block mb-1">
            Producto
          </label>
          <select
            id="id_product"
            name="id_product"
            value={formData.id_product}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Selecciona un producto</option>
            {productsByBranchQuery.data?.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="available_quantity" className="block mb-1">
            Cantidad Disponible
          </label>
          <input
            id="available_quantity"
            name="available_quantity"
            type="number"
            value={formData.available_quantity}
            onChange={handleChange}
            className="border p-2 w-full"
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reorder_level" className="block mb-1">
            Nivel de Reorden
          </label>
          <input
            id="reorder_level"
            name="reorder_level"
            type="number"
            value={formData.reorder_level}
            onChange={handleChange}
            className="border p-2 w-full"
            min="0"
            required
          />
        </div>

        <div className="hidden">
          <Button type="submit" disabled={loading}>
            {loading ? "Procesando..." : "Guardar"}
          </Button>
        </div>
      </form>
    );
  }
);
