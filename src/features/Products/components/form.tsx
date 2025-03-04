import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Product } from "../data/models/productSchema";

export type FormDataProduct = Omit<Product, "id" | "created_at">;

export interface FormComponentProductRef {
  submitForm: () => void;
}

interface FormComponentProductProps {
  onSubmit: (data: FormDataProduct) => Promise<void>;
  loading: boolean;
  initialData?: Product;
}

export const FormComponentProduct = forwardRef(function FormComponentProduct(
  { onSubmit, loading, initialData }: FormComponentProductProps,
  ref
) {
  const [formData, setFormData] = useState<FormDataProduct>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    category: initialData?.category || "",
    is_active: initialData?.is_active ?? true,
    id_branch: initialData?.id_branch || "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submitForm() {
      onSubmit(formData);
    },
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) || 0 : value, // Convierte el precio a número
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">
          Descripción
        </label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block mb-1">
          Precio
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-1">
          Categoría
        </label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="is_active">Activo</label>
        <input
          id="is_active"
          name="is_active"
          type="checkbox"
          checked={formData.is_active}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
          }
        />
      </div>
      <div className="hidden">
        <Button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
});
