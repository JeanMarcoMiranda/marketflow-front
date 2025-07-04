export interface ApiResponse<T> {
  status: number;
  body: T;
  reason: string;
}

// Tipos específicos para User y Session
export interface User {
  id: string;
  email: string;
  name: string;
  role_id: string;
  active: boolean;
  phone_number: string | null;
  id_business: string | null,
  id_branch: string | null,
  created_at: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
}

export interface Business {
  id: string;
  id_super_admin: string;
  name: string;
  description: string;
  business_type_id: string;
  status: string;
  logo_url: string;
  address: string;
  contact_number: string;
  email: string;
  created_at: string;
  updated_at: string
}

export interface Branch {
  id: string
  id_business: string
  name: string
  contact_number: string
  manager_id: string
  address: string
  city: string
  postal_code: string
  country_id: string
  status: string
  image_url: string
  coordinates: {
    lat: number
    lng: number
  }
  inventory_capacity: number
  operating_hours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  created_at: string
  updated_at: string
}

export interface CreateBranch {
  id_business: string;
  id_super_admin: string;
  name: string;
  contact_number?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country_id?: string;
  status?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  inventory_capacity?: number;
  operating_hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
}

export interface Product {
  id: string;
  id_business: string;
  id_branch: string;
  name: string;
  description: string;
  sku: string;
  unit_price: number;
  cost_price: number;
  unit_of_measure: string;
  image_url: string;
  taxable: boolean;
  active: boolean;
  expiration_date: string;
  batch_number: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface SaleItem {
  id: string;
  product: Product;
  quantity: number;
  unit_price: number;
  total: number;
  discount?: number;
}

export interface SaleSummary {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  items_count: number;
}

export type Metadata = Record<string, unknown>;

export interface CreateProductPayload {
  name: string;
  description: string;
  sku: string;
  unit_price: number;
  cost_price: number;
  unit_of_measure: string;
  taxable: boolean;
  active: boolean;
  id_business: string;
  id_branch: string;
  expiration_date?: string;
  batch_number?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  sku?: string;
  unit_price?: number;
  cost_price?: number;
  unit_of_measure?: string;
  taxable?: boolean;
  active?: boolean;
  expiration_date?: string;
  batch_number?: string;
  metadata?: Record<string, unknown>;
}

// Tipo para el body de esta respuesta específica
export interface LoginResponseBody {
  user: User;
  session: Session;
}

export interface RegisterResponseBody {
  user: User;
  session: Session;
}

