import http from "../httpClient";
import { ApiResponse, CreateProductPayload, Product, UpdateProductPayload } from "../types/response.types";

export class ProductService {
  private PRODUCT_ENDPOINT = "/product"

  async getProductsByBusinessAndBranchId(id_business: string, id_branch: string): Promise<ApiResponse<Product[]>> {
    const response = await http.get<ApiResponse<Product[]>>(
      `${this.PRODUCT_ENDPOINT}/?id_business=${id_business}&id_branch=${id_branch}`
    );

    console.log("Response from getProductsByBusinessAndBranchId:", response.data);
    return response.data;
  }

  async createProduct(product: CreateProductPayload): Promise<ApiResponse<Product>> {
    const response = await http.post<ApiResponse<Product>>(
      `${this.PRODUCT_ENDPOINT}`,
      product
    )
    return response.data
  }

  async updateProduct(product_id: string, business_id: string, product: UpdateProductPayload) {
    const response = await http.put<ApiResponse<Product>>(
      `${this.PRODUCT_ENDPOINT}/${product_id}?id_business=${business_id} `,
      product
    )
    return response.data
  }

  async deleteProduct(product_id: string) {
    const response = await http.delete<ApiResponse<string>>(
      `${this.PRODUCT_ENDPOINT}/${product_id}`
    )
    return response.data
  }
}

export const productService = new ProductService