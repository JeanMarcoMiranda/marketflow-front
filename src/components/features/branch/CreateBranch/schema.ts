import { z } from 'zod';

// Schema for operating_hours
const operatingHoursSchema = z.object({
  monday: z.string().min(1, 'Monday hours are required'),
  tuesday: z.string().min(1, 'Tuesday hours are required'),
  wednesday: z.string().min(1, 'Wednesday hours are required'),
  thursday: z.string().min(1, 'Thursday hours are required'),
  friday: z.string().min(1, 'Friday hours are required'),
  saturday: z.string().min(1, 'Saturday hours are required'),
  sunday: z.string().min(1, 'Sunday hours are required'),
});

// Schema for coordinates
const coordinatesSchema = z.object({
  lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90),
  lng: z.number().min(-180, 'Longitude must be between -180 and 180').max(180),
});

// Main CreateBranch schema
export const createBranchSchema = z.object({
  id_business: z.string().uuid('Invalid business ID'),
  name: z.string().min(1, 'Name is required'),
  contact_number: z.string().min(1, 'Contact number is required'),
  manager_id: z.string().uuid('Invalid manager ID'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  country_id: z.string().uuid('Invalid country ID'),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Status must be active or inactive' }),
  }),
  image_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  coordinates: coordinatesSchema,
  inventory_capacity: z.number().min(0, 'Inventory capacity cannot be negative'),
  operating_hours: operatingHoursSchema,
  id_super_admin: z.string().uuid('Invalid super admin ID'),
});

// Type for form data
export type CreateBranchFormData = z.infer<typeof createBranchSchema>;