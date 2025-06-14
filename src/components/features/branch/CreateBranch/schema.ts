import { z } from 'zod';

// Schema for operating_hours
const operatingHoursSchema = z.object({
  monday: z.string().optional(),
  tuesday: z.string().optional(),
  wednesday: z.string().optional(),
  thursday: z.string().optional(),
  friday: z.string().optional(),
  saturday: z.string().optional(),
  sunday: z.string().optional(),
}).optional();

// Schema for coordinates
const coordinatesSchema = z.object({
  lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90).optional(),
  lng: z.number().min(-180, 'Longitude must be between -180 and 180').max(180).optional(),
}).optional();

// Main CreateBranch schema
export const createBranchSchema = z.object({
  id_business: z.string().uuid('Invalid business ID'),
  name: z.string().min(1, 'Name is required'),
  contact_number: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country_id: z.string().uuid('Invalid country ID').optional(),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Status must be active or inactive' }),
  }).optional(),
  coordinates: coordinatesSchema,
  inventory_capacity: z.number().min(0, 'Inventory capacity cannot be negative').optional(),
  operating_hours: operatingHoursSchema,
  id_super_admin: z.string().uuid('Invalid super admin ID'),
});
// Type for form data
export type CreateBranchFormData = z.infer<typeof createBranchSchema>;