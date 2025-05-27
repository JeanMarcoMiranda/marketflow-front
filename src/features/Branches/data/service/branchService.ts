import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { Branch, branchSchema } from "../models/branchSchema";

// ✅ Obtener todas las sucursales
export async function fetchBranch(): Promise<Branch[]> {
  const { user } = useAuthStore.getState();

  const { data, error } = await supabase
    .from("UserBranch")
    .select("Branch(*)")
    .eq("id_user", user!.user.id);

  if (error) throw new Error(`Error fetching Branch: ${error.message}`);

  return data?.map((item) => branchSchema.parse(item.Branch)) || [];
}

// ✅ Crear nueva sucursal
export async function createBranch(
  newBranch: Omit<Branch, "id" | "created_at" | "id_user">
): Promise<Branch> {
  const { user } = useAuthStore.getState();

  //TODO: Reemplazar con un metodo que obtenga el negocio del localstorage o parecido
  const { data: business, error: errorBusiness } = await supabase
    .from("Business")
    .select("*")
    .eq("id_super_admin", user!.user.id)
    .single();

  if (errorBusiness) {
    throw new Error("No business found for the super_admin.");
  }

  const { data, error } = await supabase
    .from("Branch")
    .insert([{ ...newBranch, id_business: business.id }])
    .select()
    .single();

  if (error) throw new Error(`Error creating branch: ${error.message}`);

  const { error: errorUserBranch } = await supabase
    .from("UserBranch")
    .insert([{ id_user: user!.user.id, id_branch: data.id }]);

  if (errorUserBranch) {
    throw new Error(`Error creating UserBranch: ${errorUserBranch.message}`);
  }

  return branchSchema.parse(data);
}

// ✅ Actualizar sucursal existente
export async function updateBranch(
  id: string,
  updatedData: Partial<Branch>
): Promise<Branch> {
  const { data, error } = await supabase
    .from("Branch")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Error updating branch: ${error.message}`);

  return branchSchema.parse(data);
}

// ✅ Eliminar sucursal
export async function deleteBranch(id: string): Promise<void> {
  const { error } = await supabase.from("Branch").delete().eq("id", id);

  if (error) throw new Error(`Error deleting branch: ${error.message}`);
}
