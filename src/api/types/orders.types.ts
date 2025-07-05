export interface Order {
  id: string;
  id_user: string;
  id_branch: string;
  id_product_list: string[];
  status: 'Pendiente' | 'Enviado' | 'Recibido' | 'Cancelado';
  request_date: string;
  delivery_date?: string;
  total_cost: number;
  total_quantity: number;
  notes?: string;
  updated_at: string;
  updated_by_id?: string;
}

export interface CreateOrderPayload {
  id_user: string;
  id_branch: string;
  id_product_list: string[];
  status: 'Pendiente' | 'Enviado' | 'Recibido' | 'Cancelado';
  request_date: string;
  delivery_date?: string;
  total_cost: number;
  total_quantity: number;
  notes?: string;
  updated_by_id: string;
}

export interface UpdateOrderPayload {
  id_user?: string;
  id_branch?: string;
  id_product_list?: string[];
  status?: 'Pendiente' | 'Enviado' | 'Recibido' | 'Cancelado';
  request_date?: string;
  delivery_date?: string | null;
  total_cost?: number;
  total_quantity?: number;
  notes?: string | null;
  updated_by_id?: string;
}

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  orders: Order[];
}

export interface MonthYear {
  month: number;
  year: number;
}