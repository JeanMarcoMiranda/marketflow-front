import { useQuery } from "@tanstack/react-query"
import { businessService } from "../services/business-service"

export const useGetBusinessByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["businessById", id],
    queryFn: () => businessService.getBusinessById(id)
  })
}

export const useGetBusinessBranchesById = (id: string) => {
  return useQuery({
    queryKey: ["businessBranchesById", id],
    queryFn: () => businessService.getBusinessBranchesById(id)
  })
}