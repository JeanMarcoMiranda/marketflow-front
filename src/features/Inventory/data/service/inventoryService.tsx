import { supabase } from "@/lib/supabaseClient";
import { Inventory, inventorySchema } from "../models/inventorySchema";

// ✅ Obtener inventario por ID de sucursal
export async function fetchInventoryByBranchId(
  branchId: string
): Promise<Inventory[]> {
  const { data, error } = await supabase
    .from("Inventory")
    .select("*")
    .eq("id_branch", branchId);

  if (error) throw new Error(`Error fetching inventory: ${error.message}`);

  return data?.map((item) => inventorySchema.parse(item)) || [];
}

// ✅ Crear un nuevo registro de inventario
export async function createInventory(
  inventory: Omit<Inventory, "id" | "created_at" | "last_updated">
) {
  const { data, error } = await supabase
    .from("Inventory")
    .insert([{ ...inventory, last_updated: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw new Error(`Error creating inventory: ${error.message}`);

  return inventorySchema.parse(data);
}

// ✅ Actualizar un registro de inventario existente
export async function updateInventory(id: string, updates: Partial<Inventory>) {
  const { data, error } = await supabase
    .from("Inventory")
    .update({ ...updates, last_updated: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Error updating inventory: ${error.message}`);

  return inventorySchema.parse(data);
}

// ✅ Eliminar un registro de inventario por ID
export async function deleteInventory(id: string) {
  const { error } = await supabase.from("Inventory").delete().eq("id", id);

  if (error) throw new Error(`Error deleting inventory: ${error.message}`);

  return true;
}
