import http from "../httpClient";
import { ApiResponse, Product } from "../types/response.types";

export class ProductService {
  private PRODUCT_ENDPOINT = "/product"

  async getProductsByBusinessAndBranchId(id_business: string, id_branch: string): Promise<ApiResponse<Product[]>> {
    const response = await http.get<ApiResponse<Product[]>>(
      `${this.PRODUCT_ENDPOINT}/?id_business=${id_business}&id_branch=${id_branch}`
    );
    return response.data;
  }
}

export const productService = new ProductService