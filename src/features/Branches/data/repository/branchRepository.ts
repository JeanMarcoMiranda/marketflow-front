// repository/branchRepository.ts
import { supabase } from "@/lib/supabaseClient";
import { Branch, branchSchema } from "../models/branchSchema";
import { CreateBranchDTO, UpdateBranchDTO } from "../dtos/branchDTO";

export class BranchRepository {
  async fetchBranches(userId: string): Promise<Branch[]> {
    const { data, error } = await supabase
      .from("Branches")
      .select("*")
      .eq("id_user", userId);

    if (error) {
      throw new Error(`Error fetching branches: ${error.message}`);
    }

    return data?.map((branch) => branchSchema.parse(branch)) || [];
  }

  async createBranch(
    userId: string,
    newBranch: CreateBranchDTO
  ): Promise<Branch> {
    const { data, error } = await supabase
      .from("Branches")
      .insert([{ ...newBranch, id_user: userId }])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating branch: ${error.message}`);
    }

    return branchSchema.parse(data);
  }

  async updateBranch(id: number, updateData: UpdateBranchDTO): Promise<Branch> {
    const { data, error } = await supabase
      .from("Branches")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating branch: ${error.message}`);
    }

    return branchSchema.parse(data);
  }

  async deleteBranch(id: number): Promise<void> {
    const { error } = await supabase.from("Branches").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting branch: ${error.message}`);
    }
  }
}
