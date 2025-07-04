export interface Order {
  id: string;
  id_user: string;
  id_branch: string;
  id_product_list: string[];
  status: 'Pendiente' | 'Enviado' | 'Recibido' | 'Cancelado';
  request_date: string;
  delivery_date?: string;
  total_cost: number;
  updated_at: string;
  total_quantity: number;
  notes?: string;
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