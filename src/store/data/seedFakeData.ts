// src/utils/seedFakeData.ts

import { initFakeData } from "./localFakeApi";

// Datos falsos
import productData from "../data/product.json";
import categoryData from "../data/category.json";
import inventoryData from "../data/inventory.json";
import supplierData from "../data/supplier.json";
import productSupplierData from "../data/product_supplier.json";
import purchaseOrderData from "../data/purchase_orders.json";
import purchaseOrderItemData from "../data/purchase_order_item.json";
import productCategoryData from "../data/product_category.json";

import type { EntityType, BaseEntity } from "./localFakeApi";

interface EntitySeed {
  key: EntityType;
  data: BaseEntity[];
}

/**
 * Lista de entidades y sus datos falsos
 */
const entitiesToSeed: EntitySeed[] = [
  { key: "product", data: productData },
  { key: "category", data: categoryData },
  { key: "inventory", data: inventoryData },
  { key: "supplier", data: supplierData },
  { key: "product_supplier", data: productSupplierData },
  { key: "purchase_order", data: purchaseOrderData },
  { key: "purchase_order_item", data: purchaseOrderItemData },
  { key: "product_category", data: productCategoryData },
];

/**
 * Carga todos los datos falsos al localStorage
 */
export function seedFakeDatabase(): void {
  for (const entity of entitiesToSeed) {
    initFakeData(entity.key, entity.data);
  }
}
