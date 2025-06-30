import http from "../http-client";
import { ApiResponse, Branch, CreateBranch } from "../types/response.types";

export class BranchService {
  private BRANCH_ENDPOINT = "/branch";

  async createBranch(branch: CreateBranch): Promise<ApiResponse<Branch>> {
    const response = await http.post<ApiResponse<Branch>>(
      `${this.BRANCH_ENDPOINT}`,
      branch
    );
    return response.data;
  }
}

export const branchService = new BranchService();
