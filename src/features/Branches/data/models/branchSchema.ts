import { z } from "zod";

export const branchSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  id_business: z.string().uuid().nullable(),
  name: z.string().min(1, "El nombre es obligatorio"),
  location: z.string(),
  contact_number: z.string(),
});

export type Branch = z.infer<typeof branchSchema>;
