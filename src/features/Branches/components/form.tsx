/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Branch } from "../data/branchSchema";

interface FormComponentProps {
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  initialData?: Branch;
}

export function FormComponent({
  onSubmit,
  loading,
  initialData,
}: FormComponentProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    id_user: initialData?.id_user || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? "Procesando..." : "Guardar"}
      </button>
    </form>
  );
}
