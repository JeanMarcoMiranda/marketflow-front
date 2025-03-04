import { Branch } from "@/features/Branches/data/models/branchSchema";
import { create } from "zustand";

interface BranchStore {
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null) => void;
}

export const useBranchStore = create<BranchStore>((set) => ({
  selectedBranch: null,
  setSelectedBranch: (branch) => set({ selectedBranch: branch }),
}));
