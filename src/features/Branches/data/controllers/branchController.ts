import { BranchRepository } from "../repository/branchRepository";
import { CreateBranchDTO, UpdateBranchDTO } from "../dtos/branchDTO";

const branchRepo = new BranchRepository();

export async function getBranches(userId: string) {
  try {
    const branches = await branchRepo.fetchBranches(userId);
    return branches;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function createBranch(userId: string, newBranch: CreateBranchDTO) {
  try {
    const branch = await branchRepo.createBranch(userId, newBranch);
    return branch;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function updateBranch(id: number, updateData: UpdateBranchDTO) {
  try {
    const branch = await branchRepo.updateBranch(id, updateData);
    return branch;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function deleteBranch(id: number) {
  try {
    await branchRepo.deleteBranch(id);
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}
