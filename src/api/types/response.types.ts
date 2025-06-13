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

// Tipo para el body de esta respuesta específica
export interface LoginResponseBody {
  user: User;
  session: Session;
}

export interface RegisterResponseBody {
  user: User;
  session: Session;
}
