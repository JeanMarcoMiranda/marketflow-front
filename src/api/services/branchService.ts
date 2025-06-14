import http from "../httpClient";
import { ApiResponse, Branch, CreateBranch } from "../types/response.types";

export class BranchService {
  private BRANCH_ENDPOINT = "/branch"

  async createBranch(branch: CreateBranch): Promise<ApiResponse<Branch>> {
    try {

      const response = await http.post<ApiResponse<Branch>>(
        `${this.BRANCH_ENDPOINT}`, branch
      )

      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const branchService = new BranchService