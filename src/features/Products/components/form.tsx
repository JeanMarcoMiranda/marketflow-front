import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  { onSubmit, initialData }: FormComponentProductProps,
  ref
) {
  const {
    register,
    handleSubmit,
    control,
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
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nombre */}
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Input id="description" {...register("description")} />
      </div>

      {/* Precio */}
      <div>
        <Label htmlFor="price">Precio</Label>
        <Input
          id="price"
          type="number"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Categoría */}
      <div>
        <Label htmlFor="category">Categoría</Label>
        <Input id="category" {...register("category")} />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Activo (Switch) */}
      <div className="flex items-center gap-2">
        <Controller
          name="is_active"
          control={control}
          render={({ field }) => (
            <Switch
              id="is_active"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="is_active">Activo</Label>
      </div>
    </form>
  );
});
