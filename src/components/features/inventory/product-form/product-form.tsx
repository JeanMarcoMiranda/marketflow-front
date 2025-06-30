import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, ProductFormData } from "./schema";

// Componentes de Shadcn UI
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/api/types/response.types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Iconos de Lucide React
import {
  Package,
  DollarSign,
  FlaskConical,
  Star,
  Loader2,
  Save,
  Plus,
  Info,
} from "lucide-react";

// Constantes para mejorar la mantenibilidad
const UNIT_OPTIONS = [
  { value: "unidad", label: "Unidad" },
  { value: "kg", label: "Kilogramo (kg)" },
  { value: "g", label: "Gramo (g)" },
  { value: "litro", label: "Litro" },
  { value: "ml", label: "Mililitro (ml)" },
  { value: "metro", label: "Metro" },
  { value: "cm", label: "Centímetro (cm)" },
  { value: "pack", label: "Paquete" },
  { value: "caja", label: "Caja" },
  { value: "docena", label: "Docena" },
] as const;

interface ProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  defaultValues?: Product;
  createProduct: (payload: CreateProductPayload) => Promise<void>;
  updateProduct: (
    product_id: string,
    business_id: string,
    payload: UpdateProductPayload
  ) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  createError: unknown;
  updateError: unknown;
  idBusiness: string;
  idBranch: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSuccess,
  onCancel,
  defaultValues,
  createProduct,
  updateProduct,
  isCreating,
  isUpdating,
  idBusiness,
  idBranch,
}) => {
  const isEditing = !!defaultValues?.id;
  const [isMetadataExpanded, setIsMetadataExpanded] = React.useState(false);

  // Valores por defecto mejorados
  const getDefaultValues = React.useCallback(
    (): Partial<ProductFormData> => ({
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      sku: defaultValues?.sku ?? "",
      unit_price: defaultValues?.unit_price ?? 0.01,
      cost_price: defaultValues?.cost_price ?? 0,
      unit_of_measure: defaultValues?.unit_of_measure ?? "unidad",
      taxable: defaultValues?.taxable ?? true,
      active: defaultValues?.active ?? true,
      id_business: defaultValues?.id_business ?? idBusiness,
      id_branch: defaultValues?.id_branch ?? idBranch,
      expiration_date: defaultValues?.expiration_date
        ? new Date(defaultValues.expiration_date).toISOString().split("T")[0]
        : "",
      batch_number: defaultValues?.batch_number ?? "",
      metadata: defaultValues?.metadata
        ? JSON.stringify(defaultValues.metadata, null, 2)
        : "",
    }),
    [defaultValues, idBusiness]
  );

  // Initialize form con memoización
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange", // Mejor UX con validación en tiempo real
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
  } = form;

  // Watch para calcular margen de ganancia en tiempo real
  const unitPrice = watch("unit_price");
  const costPrice = watch("cost_price");
  const profitMargin = React.useMemo(() => {
    if (unitPrice && costPrice && costPrice > 0) {
      return (((unitPrice - costPrice) / costPrice) * 100).toFixed(1);
    }
    return null;
  }, [unitPrice, costPrice]);

  console.log("Is dirty:", isDirty);
  console.log("Is valid:", isValid);
  console.log("Form values:", watch());

  const onSubmit = async (data: ProductFormData) => {
    try {
      let metadataObject = {};
      if (typeof data.metadata === "string" && data.metadata) {
        metadataObject = JSON.parse(data.metadata);
      } else if (typeof data.metadata === "object" && data.metadata !== null) {
        metadataObject = data.metadata;
      }

      const expirationDateISO = data.expiration_date
        ? new Date(data.expiration_date).toISOString()
        : undefined;

      if (isEditing && defaultValues?.id) {
        const payload: UpdateProductPayload = {
          name: data.name,
          description: data.description,
          sku: data.sku,
          unit_price: data.unit_price,
          cost_price: data.cost_price,
          unit_of_measure: data.unit_of_measure,
          taxable: data.taxable,
          active: data.active,
          expiration_date: expirationDateISO,
          batch_number: data.batch_number,
          metadata: metadataObject as Record<string, unknown>,
        };

        await updateProduct(defaultValues.id, idBusiness, payload);

        toast.success("Producto actualizado correctamente.", {
          description: `El producto "${data.name}" ha sido guardado.`,
        });
      } else {
        const payload: CreateProductPayload = {
          name: data.name,
          description: data.description,
          sku: data.sku,
          unit_price: data.unit_price,
          cost_price: data.cost_price,
          unit_of_measure: data.unit_of_measure,
          taxable: data.taxable,
          active: data.active,
          id_business: data.id_business,
          id_branch: data.id_branch,
          expiration_date: expirationDateISO,
          batch_number: data.batch_number,
          metadata: metadataObject as Record<string, unknown>,
        };

        await createProduct(payload);

        toast.success("Producto creado correctamente.", {
          description: `"${data.name}" ha sido añadido a tus productos.`,
        });
        reset();
      }
      onSuccess();
    } catch (err) {
      console.error("Error al guardar producto:", err);

      toast.error(`Error al ${isEditing ? "actualizar" : "crear"} producto.`, {
        description:
          getErrorMessage(err) ??
          "Ocurrió un problema inesperado. Inténtalo de nuevo.",
        action: {
          label: "Reintentar",
          onClick: () => {
            void handleSubmit(onSubmit)();
          },
        },
      });
    }
  };

  // Helper function para extraer mensajes de error
  const getErrorMessage = (error: unknown): string | null => {
    if (error && typeof error === "object" && "message" in error) {
      return (error as { message: string }).message;
    }
    return null;
  };

  const isPending = isEditing ? isUpdating : isCreating;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditing ? "Editar Producto" : "Nuevo Producto"}
            </h1>
            <p className="text-gray-600">
              {isEditing
                ? "Modifica la información de tu producto"
                : "Completa los datos para crear un nuevo producto"}
            </p>
          </div>
        </div>

        {/* Indicador de progreso visual */}
        <div className="flex gap-2 mt-4">
          <Badge variant={form.watch("name") ? "default" : "secondary"}>
            Información básica
          </Badge>
          <Badge variant={form.watch("unit_price") ? "default" : "secondary"}>
            Precios
          </Badge>
          <Badge variant="secondary">Opcional</Badge>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Información General</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Datos esenciales del producto
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Nombre del Producto
                        <Star className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Leche Entera La Vaquita 1L"
                          {...field}
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Código SKU
                        <Star className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: LEC-001"
                          {...field}
                          disabled={isPending}
                          className="h-11 font-mono"
                        />
                      </FormControl>
                      <FormDescription>
                        Código único para identificar el producto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe las características principales del producto..."
                        {...field}
                        disabled={isPending}
                        className="min-h-[100px] resize-none"
                      />
                    </FormControl>
                    <FormDescription>Máximo 500 caracteres</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit_of_measure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Unidad de Medida
                      <Star className="h-3 w-3 text-red-500" />
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Selecciona una unidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {UNIT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Precios y Configuración */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>Precios y Estado</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configuración de precios y disponibilidad
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="unit_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Precio de Venta
                        <Star className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            disabled={isPending}
                            className="h-11 pl-8"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cost_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Costo de Adquisición</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            disabled={isPending}
                            className="h-11 pl-8"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Indicador de margen de ganancia */}
              {profitMargin && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Margen de ganancia: {profitMargin}%
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="taxable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base font-medium">
                          Producto Gravado
                        </FormLabel>
                        <FormDescription>
                          ¿Este producto está sujeto a impuestos?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base font-medium">
                          Estado Activo
                        </FormLabel>
                        <FormDescription>
                          ¿El producto está disponible para venta?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Información Adicional (Colapsible) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <FlaskConical className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Información Adicional</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Datos opcionales como fechas, lotes y metadata
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="expiration_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Vencimiento</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value ?? ""}
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="batch_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Lote</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: L2024001"
                          {...field}
                          disabled={isPending}
                          className="h-11 font-mono"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="metadata"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setIsMetadataExpanded(!isMetadataExpanded)
                        }
                        className="p-0 h-auto font-medium text-sm"
                      >
                        Metadata (JSON) {isMetadataExpanded ? "▼" : "▶"}
                      </Button>
                    </FormLabel>
                    {isMetadataExpanded && (
                      <>
                        <FormControl>
                          <Textarea
                            placeholder='{"marca": "La Vaquita", "peso_gr": 1000, "origen": "Nacional"}'
                            {...field}
                            disabled={isPending}
                            className="min-h-[120px] resize-y font-mono text-sm"
                          />
                        </FormControl>
                        <FormDescription>
                          Datos adicionales en formato JSON. Ejemplo: {"{"}
                          "marca": "Ejemplo", "peso": 500{"}"}
                        </FormDescription>
                        <FormMessage />
                      </>
                    )}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending || !isDirty || !isValid}
              className="w-full sm:w-auto"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                <>
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Producto
                    </>
                  )}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
