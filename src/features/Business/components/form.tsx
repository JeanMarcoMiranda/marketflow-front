import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Business } from "../data/models/businessSchema";
import { useAuthStore } from "@/store/useAuthStore";

export type FormDataBusiness = Omit<Business, "id" | "created_at">;

export interface FormComponentBusinessRef {
  submitForm: () => void;
}

interface FormComponentBusinessProps {
  onSubmit: (data: FormDataBusiness) => Promise<void>;
  loading: boolean;
  initialData?: Business;
}

export const FormComponentBusiness = forwardRef(function FormComponentBusiness(
  { onSubmit, loading, initialData }: FormComponentBusinessProps,
  ref
) {
  const { userData } = useAuthStore();
  const userId = userData?.id || "";
  const userRole = userData?.role || "customer";

  const [formData, setFormData] = useState<FormDataBusiness>({
    name: initialData?.name || "",
    business_type: initialData?.business_type || "",
    description: initialData?.description || "",
    id_super_admin: initialData?.id_super_admin || "",
  });

  useEffect(() => {
    if (userRole === "super_admin" && userId) {
      setFormData((prev) => ({
        ...prev,
        id_super_admin: userId,
      }));
    }
  }, [userId, userRole]);

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submitForm() {
      onSubmit(formData);
    },
  }));

  // Consulta para obtener los usuarios con rol "super_admin"
  const { data: superAdmins, isLoading } = useQuery({
    queryKey: ["super_admins"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("User")
        .select("id, name, email")
        .eq("role", "super_admin");

      if (error)
        throw new Error(`Error fetching super admins: ${error.message}`);
      return data || [];
    },
    enabled: userRole === "developer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          Nombre del Negocio
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="business_type" className="block mb-1">
          Tipo de Negocio
        </label>
        <input
          id="business_type"
          name="business_type"
          value={formData.business_type}
          onChange={handleChange}
          className="border p-2 w-full"
          required
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
      {userRole === "developer" && (
        <div className="mb-4">
          <label htmlFor="id_super_admin" className="block mb-1">
            Administrador del Negocio
          </label>
          <select
            id="id_super_admin"
            name="id_super_admin"
            value={formData.id_super_admin}
            onChange={handleChange}
            className="border p-2 w-full"
            required
            disabled={isLoading}
          >
            <option value="">Seleccione un Super Admin</option>
            {superAdmins?.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.email}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Si el usuario es super_admin, no se muestra el select, pero se asigna automáticamente su propio ID */}
      {userRole === "super_admin" && (
        <div className="mb-4">
          <label htmlFor="id_super_admin" className="block mb-1">
            Administrador del Negocio
          </label>
          <input
            type="text"
            id="id_super_admin"
            name="id_super_admin"
            value={userData?.email || "Cargando..."}
            className="border p-2 w-full bg-gray-100"
            disabled
          />
          <input
            type="hidden"
            name="id_super_admin"
            value={formData.id_super_admin}
          />
        </div>
      )}
      <div className="hidden">
        <Button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
});
