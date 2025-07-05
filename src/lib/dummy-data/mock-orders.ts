import type { Order } from "@/api/types/orders.types";

export const mockOrders: Order[] = [
  {
    id: '1',
    id_user: 'user-1',
    id_branch: 'branch-1',
    id_product_list: ['prod-1', 'prod-2'],
    status: 'Pendiente',
    request_date: '2025-07-01',
    delivery_date: '2025-07-05',
    total_cost: 1500.00,
    updated_at: '2025-07-01T10:00:00Z',
    total_quantity: 10,
    notes: 'Orden urgente para sucursal principal'
  },
  {
    id: '2',
    id_user: 'user-2',
    id_branch: 'branch-2',
    id_product_list: ['prod-3', 'prod-4', 'prod-5'],
    status: 'Enviado',
    request_date: '2025-07-03',
    delivery_date: '2025-07-08',
    total_cost: 2300.50,
    updated_at: '2025-07-03T14:30:00Z',
    total_quantity: 25,
    notes: 'Material de oficina mensual'
  },
  {
    id: '3',
    id_user: 'user-1',
    id_branch: 'branch-1',
    id_product_list: ['prod-1'],
    status: 'Recibido',
    request_date: '2025-07-02',
    delivery_date: '2025-07-06',
    total_cost: 850.00,
    updated_at: '2025-07-06T16:45:00Z',
    total_quantity: 5,
    notes: 'Repuesto de emergencia'
  },
  {
    id: '4',
    id_user: 'user-3',
    id_branch: 'branch-3',
    id_product_list: ['prod-6', 'prod-7'],
    status: 'Cancelado',
    request_date: '2025-07-04',
    total_cost: 1200.00,
    updated_at: '2025-07-04T09:15:00Z',
    total_quantity: 8,
    notes: 'Cancelado por cambio de proveedor'
  },
  {
    id: '5',
    id_user: 'user-2',
    id_branch: 'branch-2',
    id_product_list: ['prod-2', 'prod-3'],
    status: 'Pendiente',
    request_date: '2025-07-10',
    delivery_date: '2025-07-15',
    total_cost: 3500.75,
    updated_at: '2025-07-10T11:20:00Z',
    total_quantity: 50,
    notes: 'Orden para nueva sucursal'
  },
  {
    id: '6',
    id_user: 'user-1',
    id_branch: 'branch-1',
    id_product_list: ['prod-8'],
    status: 'Enviado',
    request_date: '2025-07-12',
    delivery_date: '2025-07-18',
    total_cost: 975.25,
    updated_at: '2025-07-12T13:50:00Z',
    total_quantity: 15,
    notes: 'Equipos de seguridad'
  }
];