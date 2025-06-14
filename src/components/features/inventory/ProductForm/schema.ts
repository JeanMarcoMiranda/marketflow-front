import { z } from "zod";

// Schema para Metadata más robusto
const metadataSchema = z.record(z.unknown()).optional().nullable();

export const productFormSchema = z.object({
  // Campos requeridos
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres")
    .trim(),

  description: z
    .string()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .trim(),

  sku: z
    .string()
    .min(3, "El SKU debe tener al menos 3 caracteres")
    .max(50, "El SKU no puede exceder los 50 caracteres")
    .trim(),

  unit_price: z
    .number({
      required_error: "El precio unitario es requerido",
      invalid_type_error: "El precio debe ser un número válido"
    })
    .min(0.01, "El precio unitario debe ser mayor que 0")
    .max(1000000, "El precio unitario es demasiado alto")
    .multipleOf(0.01, "El precio debe tener máximo 2 decimales"),

  cost_price: z
    .number({
      invalid_type_error: "El costo debe ser un número válido"
    })
    .min(0, "El costo debe ser 0 o mayor")
    .max(1000000, "El costo es demasiado alto")
    .multipleOf(0.01, "El costo debe tener máximo 2 decimales")
    .optional()
    .default(0),

  unit_of_measure: z
    .string()
    .min(1, "La unidad de medida es requerida")
    .max(50, "La unidad de medida no puede exceder los 50 caracteres")
    .trim(),

  taxable: z.boolean().default(true),

  active: z.boolean().default(true),

  id_business: z
    .string()
    .min(1, "ID de negocio es requerido")
    .uuid("ID de negocio debe ser un UUID válido"),

  id_branch: z
    .string()
    .min(1, "ID de negocio es requerido")
    .uuid("ID de negocio debe ser un UUID válido"),

  // Campos opcionales
  expiration_date: z
    .string()
    .optional()
    .nullable()
    .refine(
      (date) => {
        if (!date || date === "") return true;
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
      },
      "La fecha de vencimiento debe ser válida y futura"
    ),

  batch_number: z
    .string()
    .max(50, "El número de lote no puede exceder los 50 caracteres")
    .trim(),

  metadata: z
    .union([
      metadataSchema,
      z.string().transform((str, ctx) => {
        // Permite cadena vacía para representar null
        if (str === "" || str.trim() === "") return null;

        try {
          const parsed = JSON.parse(str);
          // Validar que sea un objeto, no array u otro tipo
          if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Metadata debe ser un objeto JSON válido",
            });
            return z.NEVER;
          }
          return parsed;
        } catch (e) {
          console.log(e)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Metadata debe ser un JSON válido",
          });
          return z.NEVER;
        }
      })
    ])
    .optional()
    .nullable(),
})
  .refine(
    (data) => {
      // Validación cruzada: el precio de venta debe ser mayor al costo
      if (data.cost_price && data.unit_price && data.cost_price >= data.unit_price) {
        return false;
      }
      return true;
    },
    {
      message: "El precio de venta debe ser mayor al costo de adquisición",
      path: ["unit_price"], // Error se muestra en el campo unit_price
    }
  );

// Tipo derivado del esquema
export type ProductFormData = z.infer<typeof productFormSchema>;