import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware";

interface UserPreferencesState {
  selected_branch_id: string | null

  setSelectedBranch: (branch_id: string | null) => void
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      selected_branch_id: null,

      setSelectedBranch: (branch_id: string | null) => {
        set((state) => ({
          selected_branch_id: branch_id
        }))
      }
    }),
    {
      name: "user-preferences",
      storage: createJSONStorage(() => localStorage)
    }
  )
)