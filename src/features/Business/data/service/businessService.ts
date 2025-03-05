import { supabase } from "@/lib/supabaseClient";
import { Business, businessSchema } from "../models/businessSchema";

// ✅ Obtener negocios por ID de super administrador
export async function fetchBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase.from("Business").select("*");

  if (error) throw new Error(`Error fetching businesses: ${error.message}`);

  return data?.map((item) => businessSchema.parse(item)) || [];
}

// ✅ Crear un nuevo negocio
export async function createBusiness(
  business: Omit<Business, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("Business")
    .insert([business])
    .select()
    .single();

  if (error) throw new Error(`Error creating business: ${error.message}`);

  return businessSchema.parse(data);
}

// ✅ Actualizar un negocio existente
export async function updateBusiness(id: string, updates: Partial<Business>) {
  const { data, error } = await supabase
    .from("Business")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Error updating business: ${error.message}`);

  return businessSchema.parse(data);
}

// ✅ Eliminar un negocio por ID
export async function deleteBusiness(id: string) {
  const { error } = await supabase.from("Business").delete().eq("id", id);

  if (error) throw new Error(`Error deleting business: ${error.message}`);

  return true;
}
