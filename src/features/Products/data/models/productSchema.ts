import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  id_branch: z.string().uuid(),
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  price: z.number().positive("El precio debe ser mayor a 0"),
  category: z.string().min(1, "La categoría es obligatoria"),
  is_active: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;
