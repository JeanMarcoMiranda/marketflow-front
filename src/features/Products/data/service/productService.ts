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
