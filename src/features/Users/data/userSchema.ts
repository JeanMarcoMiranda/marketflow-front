import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
});

export const userLabels = [
  { value: "admin", label: "Admin" },
  { value: "customer", label: "Customer" },
  { value: "moderator", label: "Moderator" },
];

export type User = z.infer<typeof userSchema>;
