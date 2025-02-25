import { z } from "zod";

export const branchSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  created_at: z.string(),
  id_user: z.string(),
});

export type Branch = z.infer<typeof branchSchema>;
