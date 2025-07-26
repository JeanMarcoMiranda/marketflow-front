import { useAuthStore } from "../use-auth-store";

// Tipos de las entidades principales
export interface BaseEntity {
  id: string;
  [key: string]: unknown;
}

interface StoredData<T extends BaseEntity> {
  businessId: string;
  branchId: string;
  data: T[];
}

const ENTITIES = [
  "category",
  "inventory",
  "product",
  "product_category",
  "product_supplier",
  "purchase_order",
  "purchase_order_item",
  "supplier",
] as const;

export type EntityType = (typeof ENTITIES)[number];

// 🚀 Inicializa datos falsos si no existen para el negocio/sucursal actual
export function initFakeData<T extends BaseEntity>(
  entity: EntityType,
  initialData: T[]
): void {
  const { userData } = useAuthStore.getState();
  if (!userData?.id_business || !userData?.id_branch) return;

  const existing = localStorage.getItem(entity);
  if (!existing) {
    const metaData: StoredData<T> = {
      businessId: userData.id_business,
      branchId: userData.id_branch,
      data: initialData,
    };
    localStorage.setItem(entity, JSON.stringify(metaData));
  }
}

// ✅ Devuelve todos los registros de la entidad activa
export function getAll<T extends BaseEntity>(entity: EntityType): T[] {
  const raw = localStorage.getItem(entity);
  if (!raw) return [];

  const parsed: StoredData<T> = JSON.parse(raw);
  const { userData } = useAuthStore.getState();

  if (
    !userData ||
    parsed.businessId !== userData.id_business ||
    parsed.branchId !== userData.id_branch
  ) {
    return [];
  }

  return parsed.data;
}

// 🔍 Obtener un registro por ID
export function getById<T extends BaseEntity>(
  entity: EntityType,
  id: string
): T | null {
  const items = getAll<T>(entity);
  return items.find((item) => item.id === id) ?? null;
}

// ➕ Agregar nuevo registro
export function create<T extends BaseEntity>(
  entity: EntityType,
  newItem: T
): T | null {
  const raw = localStorage.getItem(entity);
  const { userData } = useAuthStore.getState();
  if (!userData?.id_business || !userData?.id_branch) return null;

  let existing: StoredData<T> = {
    businessId: userData.id_business,
    branchId: userData.id_branch,
    data: [],
  };

  if (raw) {
    const parsed: StoredData<T> = JSON.parse(raw);
    if (
      parsed.businessId !== userData.id_business ||
      parsed.branchId !== userData.id_branch
    ) {
      return null;
    }
    existing = parsed;
  }

  existing.data.push(newItem);
  localStorage.setItem(entity, JSON.stringify(existing));
  return newItem;
}

// ✏️ Actualizar registro
export function update<T extends BaseEntity>(
  entity: EntityType,
  id: string,
  updatedFields: Partial<T>
): T | null {
  const items = getAll<T>(entity);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;

  items[index] = { ...items[index], ...updatedFields };

  const { userData } = useAuthStore.getState();
  if (!userData?.id_business || !userData?.id_branch) return null;

  const updated: StoredData<T> = {
    businessId: userData.id_business,
    branchId: userData.id_branch,
    data: items,
  };

  localStorage.setItem(entity, JSON.stringify(updated));
  return items[index];
}

// 🗑️ Eliminar registro
export function remove<T extends BaseEntity>(
  entity: EntityType,
  id: string
): boolean {
  const items = getAll<T>(entity).filter((item) => item.id !== id);

  const { userData } = useAuthStore.getState();
  if (!userData?.id_business || !userData?.id_branch) return false;

  const updated: StoredData<T> = {
    businessId: userData.id_business,
    branchId: userData.id_branch,
    data: items,
  };

  localStorage.setItem(entity, JSON.stringify(updated));
  return true;
}

// 🔄 Limpiar todos los datos falsos
export function clearAll(): void {
  ENTITIES.forEach((entity) => localStorage.removeItem(entity));
}
