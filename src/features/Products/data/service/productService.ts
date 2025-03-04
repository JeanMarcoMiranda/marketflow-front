import { supabase } from "@/lib/supabaseClient";
import { Product, productSchema } from "../models/productSchema";

export async function fetchProductsByBranchId(
  branchId: string
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("Product")
    .select("*")
    .eq("id_branch", branchId);

  if (error) throw new Error(`Error fetching Products: ${error.message}`);

  return data?.map((item) => productSchema.parse(item)) || [];
}

// ✅ Crear un nuevo producto
export async function createProduct(
  product: Omit<Product, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("Product")
    .insert([product])
    .select()
    .single();

  if (error) throw new Error(`Error creating product: ${error.message}`);

  return productSchema.parse(data);
}

// ✅ Actualizar un producto existente
export async function updateProduct(id: string, updates: Partial<Product>) {
  const { data, error } = await supabase
    .from("Product")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Error updating product: ${error.message}`);

  return productSchema.parse(data);
}

// ✅ Eliminar un producto por ID
export async function deleteProduct(id: string) {
  const { error } = await supabase.from("Product").delete().eq("id", id);

  if (error) throw new Error(`Error deleting product: ${error.message}`);

  return true;
}