import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Branch, branchSchema } from "../data/models/branchSchema";

export type FormData = Omit<Branch, "id" | "created_at">;

export interface FormComponentRef {
  submitForm: () => void;
}

interface FormComponentProps {
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
  initialData?: Branch;
}

export const FormComponent = forwardRef(function FormComponent(
  { onSubmit, loading, initialData }: FormComponentProps,
  ref
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(branchSchema.omit({ id: true, created_at: true })),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      id_business: initialData?.id_business || null,
      contact_number: initialData?.contact_number || "",
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

      {/* Localización */}
      <div className="mb-4">
        <label htmlFor="location" className="block mb-1">
          Localización
        </label>
        <input
          id="location"
          {...register("location")}
          className="border p-2 w-full"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      {/* Número de Contacto */}
      <div className="mb-4">
        <label htmlFor="contact_number" className="block mb-1">
          Número de Contacto
        </label>
        <input
          id="contact_number"
          {...register("contact_number")}
          className="border p-2 w-full"
        />
        {errors.contact_number && (
          <p className="text-red-500 text-sm">
            {errors.contact_number.message}
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
});
