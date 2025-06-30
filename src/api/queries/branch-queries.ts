import { useMutation } from "@tanstack/react-query"
import { CreateBranch } from "../types/response.types"
import { branchService } from "../services/branch-service"

export const useCreateBranchMutation = () => {
  return useMutation({
    mutationFn: (branch: CreateBranch) => branchService.createBranch(branch),
    onError: (error) => {
      console.log("Error al crear branch: ", error)
    }
  })
}