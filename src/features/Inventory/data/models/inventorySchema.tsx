import { z } from "zod";

export const inventorySchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  id_branch: z.string().uuid(),
  id_product: z.string().uuid(),
  available_quantity: z
    .number()
    .nonnegative("La cantidad disponible no puede ser negativa"),
  reorder_level: z
    .number()
    .nonnegative("El nivel de reorden no puede ser negativo"),
  last_updated: z.string(),
});

export type Inventory = z.infer<typeof inventorySchema>;
