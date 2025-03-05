import { z } from "zod";

export const businessSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  id_super_admin: z.string().uuid(),
  name: z.string().min(1, "El nombre del negocio es obligatorio"),
  business_type: z.string().min(1, "El tipo de negocio es obligatorio"),
  description: z.string().optional(),
});

export type Business = z.infer<typeof businessSchema>;
