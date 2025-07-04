import { z } from "zod";

export const inventoryFormSchema = z.object({
  id_product: z.string().min(1, "El producto es requerido"),
  id_branch: z.string().optional(),
  id_business: z.string().min(1, "El negocio es requerido"),
  available_quantity: z
    .number()
    .min(0, "La cantidad disponible debe ser mayor o igual a 0")
    .int("La cantidad disponible debe ser un número entero"),
  minimum_stock_quantity: z
    .number()
    .min(0, "El stock mínimo debe ser mayor o igual a 0")
    .int("El stock mínimo debe ser un número entero"),
  safety_stock: z
    .number()
    .min(0, "El stock de seguridad debe ser mayor o igual a 0")
    .int("El stock de seguridad debe ser un número entero"),
  reorder_quantity: z
    .number()
    .min(0, "La cantidad a reabastecer debe ser mayor o igual a 0")
    .int("La cantidad a reabastecer debe ser un número entero"),
  reorder_level: z
    .number()
    .min(0, "El nivel de reabastecimiento debe ser mayor o igual a 0")
    .int("El nivel de reabastecimiento debe ser un número entero"),
  status_alert: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || ["normal", "low", "critical"].includes(val.toLowerCase()),
      {
        message: "La alerta debe ser 'normal', 'low', 'critical' o vacía",
      }
    ),
  storage_location: z.string().optional(),
  last_reorder_date: z.string().optional(),
  updated_by_id: z.string().min(1, "El usuario actualizador es requerido"),
});

export type InventoryFormData = z.infer<typeof inventoryFormSchema>;
