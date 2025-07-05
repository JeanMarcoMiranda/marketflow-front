import { z } from "zod";

export const orderFormSchema = z.object({
  id_user: z.string().min(1, "El usuario es requerido"),
  id_branch: z.string().min(1, "La sucursal es requerida"),
  id_product_list: z.array(z.string()).min(1, "Debe seleccionar al menos un producto"),
  status: z.enum(["Pendiente", "Enviado", "Recibido", "Cancelado"], {
    required_error: "El estado es requerido",
  }),
  request_date: z.string().min(1, "La fecha de solicitud es requerida"),
  delivery_date: z.string().optional(),
  total_cost: z
    .number()
    .min(0, "El costo total debe ser mayor o igual a 0")
    .refine((val) => val >= 0, {
      message: "El costo total debe ser un número positivo",
    }),
  total_quantity: z
    .number()
    .min(1, "La cantidad total debe ser mayor o igual a 1")
    .int("La cantidad total debe ser un número entero"),
  notes: z.string().optional(),
  updated_by_id: z.string().min(1, "El usuario actualizador es requerido"),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;