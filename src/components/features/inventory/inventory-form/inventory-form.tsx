import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inventoryFormSchema, InventoryFormData } from "./schema";
import { useGetProductsByBusinessAndBranchId } from "@/api/queries/product-queries";
import { useGetBusinessBranchesById } from "@/api/queries/business-queries";
import { useAuth } from "@/hooks/use-auth";

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
  Inventory,
  CreateInventoryPayload,
  UpdateInventoryPayload,
} from "@/api/types/response.types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Iconos de Lucide React
import { Package, Loader2, Save, Plus, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Constantes para mejorar la mantenibilidad
const STATUS_ALERT_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "low", label: "Bajo" },
  { value: "critical", label: "Crítico" },
] as const;

interface InventoryFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  defaultValues?: Inventory;
  createInventory: (payload: CreateInventoryPayload) => Promise<void>;
  updateInventory: (
    inventory_id: string,
    business_id: string,
    payload: UpdateInventoryPayload
  ) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  createError: unknown;
  updateError: unknown;
  idBusiness: string;
  idBranch?: string;
}

export const InventoryForm: React.FC<InventoryFormProps> = ({
  onSuccess,
  onCancel,
  defaultValues,
  createInventory,
  updateInventory,
  isCreating,
  isUpdating,
  idBusiness,
  idBranch,
}) => {
  const isEditing = !!defaultValues?.id;
  const { userData } = useAuth();

  // Obtener productos y sucursales para los selectores
  const { data: productsData, isLoading: isLoadingProducts } =
    useGetProductsByBusinessAndBranchId(idBusiness, idBranch || "");
  const { data: branchesData, isLoading: isLoadingBranches } =
    useGetBusinessBranchesById(idBusiness);

  // Valores por defecto
  const getDefaultValues = React.useCallback(
    (): Partial<InventoryFormData> => ({
      id_product: defaultValues?.id_product ?? "",
      id_branch: defaultValues?.id_branch ?? idBranch ?? "",
      id_business: defaultValues?.id_business ?? idBusiness,
      available_quantity: defaultValues?.available_quantity ?? 0,
      minimum_stock_quantity: defaultValues?.minimum_stock_quantity ?? 0,
      safety_stock: defaultValues?.safety_stock ?? 0,
      reorder_quantity: defaultValues?.reorder_quantity ?? 0,
      reorder_level: defaultValues?.reorder_level ?? 0,
      status_alert: defaultValues?.status_alert ?? "",
      storage_location: defaultValues?.storage_location ?? "",
      last_reorder_date: defaultValues?.last_reorder_date
        ? new Date(defaultValues.last_reorder_date).toISOString().split("T")[0]
        : "",
      updated_by_id: defaultValues?.updated_by_id ?? userData?.id ?? "",
    }),
    [defaultValues, idBusiness, idBranch, userData]
  );

  // Initialize form
  const form = useForm<InventoryFormData>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
  } = form;

  // Watch para validar si los campos requeridos están completos
  const productId = watch("id_product");
  const availableQuantity = watch("available_quantity");

  const onSubmit = async (data: InventoryFormData) => {
    try {
      if (isEditing && defaultValues?.id) {
        const payload: UpdateInventoryPayload = {
          available_quantity: data.available_quantity,
          minimum_stock_quantity: data.minimum_stock_quantity,
          safety_stock: data.safety_stock,
          reorder_quantity: data.reorder_quantity,
          reorder_level: data.reorder_level,
          status_alert: data.status_alert || undefined,
          storage_location: data.storage_location || undefined,
          last_reorder_date: data.last_reorder_date
            ? new Date(data.last_reorder_date).toISOString()
            : undefined,
          updated_by_id: data.updated_by_id,
        };

        await updateInventory(defaultValues.id, idBusiness, payload);

        toast.success("Inventario actualizado correctamente.", {
          description: `El registro de inventario para el producto ha sido guardado.`,
        });
      } else {
        const payload: CreateInventoryPayload = {
          id_product: data.id_product,
          id_branch: data.id_branch || undefined,
          id_business: data.id_business,
          available_quantity: data.available_quantity,
          minimum_stock_quantity: data.minimum_stock_quantity,
          safety_stock: data.safety_stock,
          reorder_quantity: data.reorder_quantity,
          reorder_level: data.reorder_level,
          status_alert: data.status_alert || undefined,
          storage_location: data.storage_location || undefined,
          last_reorder_date: data.last_reorder_date
            ? new Date(data.last_reorder_date).toISOString()
            : undefined,
          updated_by_id: data.updated_by_id,
        };

        await createInventory(payload);

        toast.success("Inventario creado correctamente.", {
          description: `El registro de inventario ha sido añadido.`,
        });
        reset();
      }
      onSuccess();
    } catch (err) {
      console.error("Error al guardar inventario:", err);

      toast.error(
        `Error al ${isEditing ? "actualizar" : "crear"} inventario.`,
        {
          description:
            getErrorMessage(err) ??
            "Ocurrió un problema inesperado. Inténtalo de nuevo.",
          action: {
            label: "Reintentar",
            onClick: () => {
              void handleSubmit(onSubmit)();
            },
          },
        }
      );
    }
  };

  // Helper function para extraer mensajes de error
  const getErrorMessage = (error: unknown): string | null => {
    console.log(error);
    if (error && typeof error === "object" && "response" in error) {
      const response = (error as { response: { data?: { body?: string } } })
        .response;
      return response.data?.body ?? null;
    }
    return "Ocurrió un problema inesperado.";
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
              {isEditing ? "Editar Inventario" : "Nuevo Inventario"}
            </h1>
            <p className="text-gray-600">
              {isEditing
                ? "Modifica la información del inventario"
                : "Completa los datos para crear un nuevo registro de inventario"}
            </p>
          </div>
        </div>

        {/* Indicador de progreso visual */}
        <div className="flex gap-2 mt-4">
          <Badge variant={productId ? "default" : "secondary"}>
            Información básica
          </Badge>
          <Badge variant={availableQuantity ? "default" : "secondary"}>
            Niveles de stock
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
                    Datos esenciales del inventario
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="id_product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Producto
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending || isLoadingProducts}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona un producto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productsData?.body?.length ? (
                            productsData.body.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No hay productos disponibles
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="id_branch"
                  render={({ field }) => (
                    <FormItem>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <FormLabel className="flex items-center gap-2">
                              Sucursal
                              <Info className="h-4 w-4 text-gray-500" />
                            </FormLabel>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Opcional: selecciona una sucursal específica</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending || isLoadingBranches}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona una sucursal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Sin sucursal</SelectItem>
                          {branchesData?.body?.length ? (
                            branchesData.body.map((branch) => (
                              <SelectItem key={branch.id} value={branch.id}>
                                {branch.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="" disabled>
                              No hay sucursales disponibles
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Niveles de Stock */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>Niveles de Stock</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configuración de cantidades y niveles de reabastecimiento
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="available_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Cantidad Disponible
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Cantidad actual de unidades disponibles
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minimum_stock_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Stock Mínimo
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Cantidad mínima para alerta de reabastecimiento
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="safety_stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Stock de Seguridad
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Reserva para cubrir variaciones en la demanda
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reorder_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Cantidad a Reabastecer
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Cantidad a pedir en reabastecimiento
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reorder_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Nivel de Reabastecimiento
                      <Info className="h-3 w-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                        disabled={isPending}
                        className="h-11"
                      />
                    </FormControl>
                    <FormDescription>
                      Nivel que dispara una orden de reabastecimiento
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Información Adicional */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Info className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Información Adicional</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Datos opcionales del inventario
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="status_alert"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alerta de Stock</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona una alerta (opcional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Sin alerta</SelectItem>
                          {STATUS_ALERT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Estado del stock (ej. Normal, Bajo, Crítico)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storage_location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicación en Almacén</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Pasillo A, Estante 12"
                          {...field}
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Ubicación física del producto en la sucursal
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="last_reorder_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Último Reabastecimiento</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value ?? ""}
                        disabled={isPending}
                        className="h-11"
                      />
                    </FormControl>
                    <FormDescription>
                      Fecha del último pedido de reabastecimiento
                    </FormDescription>
                    <FormMessage />
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
              disabled={isPending || !isDirty || !isValid || !userData?.id}
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
                      Crear Inventario
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
