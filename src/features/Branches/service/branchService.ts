import { supabase } from "@/lib/supabaseClient";
import { Branch, branchSchema } from "../data/branchSchema";

// ✅ Obtener todas las sucursales
export async function fetchBranches(): Promise<Branch[]> {
  const { data, error } = await supabase.from("Branches").select("*");

  if (error) throw new Error(`Error fetching branches: ${error.message}`);

  return data?.map((branch) => branchSchema.parse(branch)) || [];
}

// ✅ Crear nueva sucursal
export async function createBranch(
  newBranch: Omit<Branch, "id" | "created_at" | "id_user">
): Promise<Branch> {
  // Obtener el usuario tenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();    

  if (authError || !user) {
    throw new Error("No se pudo obtener el usuario autenticado.");
  }

  const { data, error } = await supabase
    .from("Branches")
    .insert([{...newBranch, id_user: user.id}])
    .select()
    .single();

  if (error) throw new Error(`Error creating branch: ${error.message}`);

  return branchSchema.parse(data);
}

// ✅ Actualizar sucursal existente
export async function updateBranch(
  id: number,
  updatedData: Partial<Branch>
): Promise<Branch> {
  const { data, error } = await supabase
    .from("Branches")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Error updating branch: ${error.message}`);

  return branchSchema.parse(data);
}

// ✅ Eliminar sucursal
export async function deleteBranch(id: number): Promise<void> {
  const { error } = await supabase.from("Branches").delete().eq("id", id);

  if (error) throw new Error(`Error deleting branch: ${error.message}`);
}
