import { useQuery } from "@tanstack/react-query"
import { businessService } from "../services/businessService"

export const useGetBusinessByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["businessById", id],
    queryFn: () => businessService.getBusinessById(id)
  })
}