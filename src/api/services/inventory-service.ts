import http from "../http-client";
import {
  ApiResponse,
  CreateInventoryPayload,
  UpdateInventoryPayload,
  Inventory,
} from "../types/response.types";

export class InventoryService {
  private readonly INVENTORY_ENDPOINT = "/inventory";

  async getInventoriesByBusinessAndBranchId(
    id_business: string,
    id_branch?: string
  ): Promise<ApiResponse<Inventory[]>> {
    const queryParams = new URLSearchParams({ id_business });
    if (id_branch) {
      queryParams.append("id_branch", id_branch);
    }

    const response = await http.get<ApiResponse<Inventory[]>>(
      `${this.INVENTORY_ENDPOINT}?${queryParams.toString()}`
    );

    console.log(
      "Response from getInventoriesByBusinessAndBranchId:",
      response.data
    );
    return response.data;
  }

  async createInventory(
    inventory: CreateInventoryPayload
  ): Promise<ApiResponse<Inventory>> {
    const response = await http.post<ApiResponse<Inventory>>(
      `${this.INVENTORY_ENDPOINT}`,
      inventory
    );
    return response.data;
  }

  async updateInventory(
    inventory_id: string,
    business_id: string,
    inventory: UpdateInventoryPayload
  ): Promise<ApiResponse<Inventory>> {
    const response = await http.put<ApiResponse<Inventory>>(
      `${this.INVENTORY_ENDPOINT}/${inventory_id}?id_business=${business_id}`,
      inventory
    );
    return response.data;
  }

  async deleteInventory(
    inventory_id: string,
    business_id: string
  ): Promise<ApiResponse<string>> {
    const response = await http.delete<ApiResponse<string>>(
      `${this.INVENTORY_ENDPOINT}/${inventory_id}?id_business=${business_id}`
    );
    return response.data;
  }
}

export const inventoryService = new InventoryService();
