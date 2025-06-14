import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware";

interface UserPreferencesState {
  selected_branch_id: string | null
  business_id: string | null

  setSelectedBranch: (branch_id: string | null) => void
  setBusiness: (business_id: string | null) => void
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      selected_branch_id: null,
      business_id: null,

      setSelectedBranch: (branch_id: string | null) => {
        set(() => ({
          selected_branch_id: branch_id,
        }));
      },

      setBusiness: (business_id: string | null) => {
        set(() => ({
          business_id: business_id,
        }));
      },
    }),
    {
      name: "user-preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);