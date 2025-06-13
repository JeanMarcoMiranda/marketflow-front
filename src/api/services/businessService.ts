import http from "../httpClient";
import { ApiResponse, Business } from "../types/response.types";

export class BusinessService {
  private BUSINESS_ENDPOINT = "/business"

  async getBusinessById(id: string): Promise<ApiResponse<Business>> {
    try {
      const response = await http.get<ApiResponse<Business>>(`${this.BUSINESS_ENDPOINT}/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const businessService = new BusinessService