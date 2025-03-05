import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Product, productSchema } from "../data/models/productSchema";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProduct>({
    resolver: zodResolver(productSchema.omit({ id: true, created_at: true })),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category || "",
      is_active: initialData?.is_active ?? true,
      id_branch: initialData?.id_branch || null,
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
      {/* Nombre */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Nombre
        </label>
        <input id="name" {...register("name")} className="border p-2 w-full" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">
          Descripción
        </label>
        <input
          id="description"
          {...register("description")}
          className="border p-2 w-full"
        />
      </div>

      {/* Precio */}
      <div className="mb-4">
        <label htmlFor="price" className="block mb-1">
          Precio
        </label>
        <input
          id="price"
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="border p-2 w-full"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Categoría */}
      <div className="mb-4">
        <label htmlFor="category" className="block mb-1">
          Categoría
        </label>
        <input
          id="category"
          {...register("category")}
          className="border p-2 w-full"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Activo */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="is_active">Activo</label>
        <input id="is_active" type="checkbox" {...register("is_active")} />
      </div>

      {/* Botón de envío */}
      <div className="hidden">
        <Button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
});
