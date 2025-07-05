import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, type OrderFormData } from "./schema";
import { useAuth } from "@/hooks/use-auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { CreateOrderPayload, Order, UpdateOrderPayload } from "@/api/types/orders.types";
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
import { Package, Loader2, Save, Plus, Info } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// Mock data for dropdowns (replace with API queries in a real app)
const MOCK_USERS = [
  { id: "user-1", name: "Juan Pérez" },
  { id: "user-2", name: "María Gómez" },
  { id: "user-3", name: "Carlos López" },
];

const MOCK_BRANCHES = [
  { id: "branch-1", name: "Sucursal Principal" },
  { id: "branch-2", name: "Sucursal Norte" },
  { id: "branch-3", name: "Sucursal Sur" },
];

const MOCK_PRODUCTS = [
  { id: "prod-1", name: "Producto A" },
  { id: "prod-2", name: "Producto B" },
  { id: "prod-3", name: "Producto C" },
  { id: "prod-4", name: "Producto D" },
  { id: "prod-5", name: "Producto E" },
  { id: "prod-6", name: "Producto F" },
  { id: "prod-7", name: "Producto G" },
  { id: "prod-8", name: "Producto H" },
];

const STATUS_OPTIONS = [
  { value: "Pendiente", label: "Pendiente" },
  { value: "Enviado", label: "Enviado" },
  { value: "Recibido", label: "Recibido" },
  { value: "Cancelado", label: "Cancelado" },
] as const;

interface OrderFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  defaultValues?: Order;
  createOrder: (payload: CreateOrderPayload) => Promise<Order>;
  updateOrder: (id: string, payload: UpdateOrderPayload) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  createError: string | null;
  updateError: string | null;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  onSuccess,
  onCancel,
  defaultValues,
  createOrder,
  updateOrder,
  isCreating,
  isUpdating,
  createError,
  updateError,
}) => {
  const isEditing = !!defaultValues?.id;
  const { userData } = useAuth();

  // Default values for the form
  const getDefaultValues = React.useCallback(
    (): Partial<OrderFormData> => ({
      id_user: defaultValues?.id_user ?? "",
      id_branch: defaultValues?.id_branch ?? "",
      id_product_list: defaultValues?.id_product_list ?? [],
      status: defaultValues?.status ?? "Pendiente",
      request_date: defaultValues?.request_date
        ? new Date(defaultValues.request_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      delivery_date: defaultValues?.delivery_date
        ? new Date(defaultValues.delivery_date).toISOString().split("T")[0]
        : "",
      total_cost: defaultValues?.total_cost ?? 0,
      total_quantity: defaultValues?.total_quantity ?? 1,
      notes: defaultValues?.notes ?? "",
      updated_by_id: defaultValues?.updated_by_id ?? userData?.id ?? "",
    }),
    [defaultValues, userData]
  );

  // Initialize form
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
  } = form;

  // Watch for required fields to show progress badges
  const idUser = watch("id_user");
  const idBranch = watch("id_branch");
  const idProductList = watch("id_product_list");
  const status = watch("status");

  const onSubmit = async (data: OrderFormData) => {
    try {
      if (isEditing && defaultValues?.id) {
        const payload: UpdateOrderPayload = {
          id_user: data.id_user,
          id_branch: data.id_branch,
          id_product_list: data.id_product_list,
          status: data.status,
          request_date: data.request_date,
          delivery_date: data.delivery_date || undefined,
          total_cost: data.total_cost,
          total_quantity: data.total_quantity,
          notes: data.notes || undefined,
          updated_by_id: data.updated_by_id,
        };

        await updateOrder(defaultValues.id, payload);

        toast.success("Orden actualizada correctamente.", {
          description: "La orden ha sido guardada.",
        });
      } else {
        const payload: CreateOrderPayload = {
          id_user: data.id_user,
          id_branch: data.id_branch,
          id_product_list: data.id_product_list,
          status: data.status,
          request_date: data.request_date,
          delivery_date: data.delivery_date || undefined,
          total_cost: data.total_cost,
          total_quantity: data.total_quantity,
          notes: data.notes || undefined,
          updated_by_id: data.updated_by_id,
        };

        await createOrder(payload);

        toast.success("Orden creada correctamente.", {
          description: "La orden ha sido añadida.",
        });
        reset();
      }
      onSuccess();
    } catch (err) {
      console.error("Error al guardar orden:", err);

      toast.error(`Error al ${isEditing ? "actualizar" : "crear"} orden.`, {
        description: createError || updateError || "Ocurrió un problema inesperado. Inténtalo de nuevo.",
        action: {
          label: "Reintentar",
          onClick: () => {
            void handleSubmit(onSubmit)();
          },
        },
      });
    }
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
              {isEditing ? "Editar Orden" : "Nueva Orden"}
            </h1>
            <p className="text-gray-600">
              {isEditing
                ? "Modifica la información de la orden"
                : "Completa los datos para crear una nueva orden"}
            </p>
          </div>
        </div>

        {/* Progress badges */}
        <div className="flex gap-2 mt-4">
          <Badge variant={idUser ? "default" : "secondary"}>Usuario</Badge>
          <Badge variant={idBranch ? "default" : "secondary"}>Sucursal</Badge>
          <Badge variant={idProductList.length > 0 ? "default" : "secondary"}>Productos</Badge>
          <Badge variant={status ? "default" : "secondary"}>Estado</Badge>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* General Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Información General</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Datos esenciales de la orden
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="id_user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Usuario
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona un usuario" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOCK_USERS.length ? (
                            MOCK_USERS.map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No hay usuarios disponibles
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
                      <FormLabel className="flex items-center gap-2">
                        Sucursal
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona una sucursal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOCK_BRANCHES.length ? (
                            MOCK_BRANCHES.map((branch) => (
                              <SelectItem key={branch.id} value={branch.id}>
                                {branch.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
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

              <FormField
                control={form.control}
                name="id_product_list"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Productos
                      <Info className="h-3 w-3 text-red-500" />
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const current = field.value || [];
                        if (!current.includes(value)) {
                          field.onChange([...current, value]);
                        }
                      }}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Selecciona productos" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MOCK_PRODUCTS.length ? (
                          MOCK_PRODUCTS.map((product) => (
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
                    <div className="mt-2 flex flex-wrap gap-2">
                      {field.value?.map((productId) => {
                        const product = MOCK_PRODUCTS.find((p) => p.id === productId);
                        return (
                          <Badge
                            key={productId}
                            variant="secondary"
                            className="flex items-center gap-2"
                          >
                            {product?.name || productId}
                            <button
                              type="button"
                              onClick={() =>
                                field.onChange(field.value.filter((id) => id !== productId))
                              }
                              disabled={isPending}
                              className="ml-1 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                    <FormDescription>
                      Selecciona los productos incluidos en la orden
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Estado
                      <Info className="h-3 w-3 text-red-500" />
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_OPTIONS.map((option) => (
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

          {/* Order Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>Detalles de la Orden</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Información sobre fechas y cantidades
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="request_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Fecha de Solicitud
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value ?? ""}
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>Fecha en que se solicitó la orden</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="delivery_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Fecha de Entrega
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Opcional: fecha estimada de entrega</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value ?? ""}
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>Fecha estimada de entrega (opcional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="total_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Costo Total
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>Costo total de la orden en USD</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Cantidad Total
                        <Info className="h-3 w-3 text-red-500" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="1"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                          disabled={isPending}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>Cantidad total de productos en la orden</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Info className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Información Adicional</CardTitle>
                  <p className="text-sm text-muted-foreground">Notas opcionales de la orden</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Orden urgente para sucursal principal"
                        {...field}
                        value={field.value ?? ""}
                        disabled={isPending}
                        className="h-11"
                      />
                    </FormControl>
                    <FormDescription>Notas adicionales sobre la orden (opcional)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
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
                      Crear Orden
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