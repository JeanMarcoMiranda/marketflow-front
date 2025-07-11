import type { Product } from "@/api/types/response.types";

export const mockProducts: Product[] = [
  {
    id: '1',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Coca Cola 500ml',
    description: 'Refresco de cola 500ml',
    sku: 'CC500',
    unit_price: 2.50,
    cost_price: 1.20,
    unit_of_measure: 'botella',
    image_url: '',
    taxable: true,
    active: true,
    expiration_date: '2025-12-31',
    batch_number: 'CC001',
    metadata: {},
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    deleted_at: ''
  },
  {
    id: '2',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Pan Integral',
    description: 'Pan integral artesanal',
    sku: 'PI001',
    unit_price: 3.75,
    cost_price: 1.80,
    unit_of_measure: 'unidad',
    image_url: '',
    taxable: true,
    active: true,
    expiration_date: '2025-07-10',
    batch_number: 'PI001',
    metadata: {},
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    deleted_at: ''
  },
  {
    id: '3',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Leche Entera 1L',
    description: 'Leche entera pasteurizada',
    sku: 'LE1L',
    unit_price: 4.20,
    cost_price: 2.50,
    unit_of_measure: 'litro',
    image_url: '',
    taxable: true,
    active: true,
    expiration_date: '2025-07-15',
    batch_number: 'LE001',
    metadata: {},
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    deleted_at: ''
  },
  {
    id: '4',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Arroz Blanco 1kg',
    description: 'Arroz blanco de grano largo',
    sku: 'AB1KG',
    unit_price: 5.00,
    cost_price: 2.80,
    unit_of_measure: 'kilogramo',
    image_url: '',
    taxable: false,
    active: true,
    expiration_date: '2026-03-20',
    batch_number: 'AB002',
    metadata: {},
    created_at: '2024-02-15',
    updated_at: '2024-02-15',
    deleted_at: ''
  },
  {
    id: '5',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Jabón Líquido 250ml',
    description: 'Jabón líquido antibacterial',
    sku: 'JL250',
    unit_price: 3.20,
    cost_price: 1.50,
    unit_of_measure: 'botella',
    image_url: '',
    taxable: true,
    active: true,
    expiration_date: '2026-06-30',
    batch_number: 'JL001',
    metadata: { scent: 'lavanda' },
    created_at: '2024-03-01',
    updated_at: '2024-03-01',
    deleted_at: ''
  },
  {
    id: '6',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Manzanas Fuji 1kg',
    description: 'Manzanas fuji frescas',
    sku: 'MF1KG',
    unit_price: 6.50,
    cost_price: 3.90,
    unit_of_measure: 'kilogramo',
    image_url: '',
    taxable: false,
    active: true,
    expiration_date: '2025-08-05',
    batch_number: 'MF003',
    metadata: { origin: 'Chile' },
    created_at: '2024-04-10',
    updated_at: '2024-04-10',
    deleted_at: ''
  },
  {
    id: '7',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Agua Mineral 1.5L',
    description: 'Agua mineral sin gas',
    sku: 'AM1.5L',
    unit_price: 1.80,
    cost_price: 0.90,
    unit_of_measure: 'botella',
    image_url: '',
    taxable: true,
    active: true,
    expiration_date: '2026-01-15',
    batch_number: 'AM002',
    metadata: {},
    created_at: '2024-05-01',
    updated_at: '2024-05-01',
    deleted_at: ''
  },
  {
    id: '8',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Galletas de Chocolate',
    description: 'Galletas rellenas de chocolate',
    sku: 'GC200',
    unit_price: 2.90,
    cost_price: 1.40,
    unit_of_measure: 'paquete',
    image_url: '',
    taxable: true,
    active: true,
    expiration_date: '2025-11-30',
    batch_number: 'GC001',
    metadata: { weight: '200g' },
    created_at: '2024-06-01',
    updated_at: '2024-06-01',
    deleted_at: ''
  },
  {
    id: '9',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Café Molido 500g',
    description: 'Café molido de origen colombiano',
    sku: 'CM500',
    unit_price: 8.75,
    cost_price: 5.00,
    unit_of_measure: 'paquete',
    image_url: '',
    taxable: true,
    active: true,
    expiration_date: '2026-02-28',
    batch_number: 'CM001',
    metadata: { roast: 'medium' },
    created_at: '2024-07-01',
    updated_at: '2024-07-01',
    deleted_at: ''
  },
  {
    id: '10',
    id_business: 'biz1',
    id_branch: 'branch1',
    name: 'Yogur Natural 1L',
    description: 'Yogur natural sin azúcar',
    sku: 'YN1L',
    unit_price: 4.80,
    cost_price: 2.70,
    unit_of_measure: 'litro',
    image_url: '',
    taxable: true,
    active: false, // Inactive product for testing
    expiration_date: '2025-09-20',
    batch_number: 'YN001',
    metadata: {},
    created_at: '2024-08-01',
    updated_at: '2024-08-01',
    deleted_at: ''
  }
];