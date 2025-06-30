import http from "../http-client";
import { ApiResponse, Branch, Business } from "../types/response.types";

export class BusinessService {
  private BUSINESS_ENDPOINT = "/business";

  async getBusinessById(id: string): Promise<ApiResponse<Business>> {
    const response = await http.get<ApiResponse<Business>>(
      `${this.BUSINESS_ENDPOINT}/${id}`
    );
    return response.data;
  }

  async getBusinessBranchesById(id: string): Promise<ApiResponse<Branch[]>> {
    const response = await http.get<ApiResponse<Branch[]>>(
      `${this.BUSINESS_ENDPOINT}/${id}/branches`
    );
    return response.data;
  }
}

export const businessService = new BusinessService();
