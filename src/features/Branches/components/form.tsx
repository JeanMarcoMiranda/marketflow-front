import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Branch } from "../data/models/branchSchema";

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
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    id_business: initialData?.id_business || "",
    contact_number: initialData?.contact_number || "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submitForm() {
      onSubmit(formData);
    },
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <label htmlFor="location" className="block mb-1">
          Localización
        </label>
        <input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contact_number" className="block mb-1">
          Número de Contacto
        </label>
        <input
          id="contact_number"
          name="contact_number"
          value={formData.contact_number}
          onChange={handleChange}
          className="border p-2 w-full"
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
