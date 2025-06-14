import { CreateBranchFormData, createBranchSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBranch } from "@/hooks/useBranch";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useDialogStore } from "@/store/useDialogStore";
import {
  Building2,
  MapPin,
  Clock,
  Star,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface CreateBranchFormProps {
  onSuccess: () => void;
  defaultValues?: Partial<CreateBranchFormData>;
}

const DAYS_OF_WEEK = [
  { key: "monday", label: "Lunes" },
  { key: "tuesday", label: "Martes" },
  { key: "wednesday", label: "Miércoles" },
  { key: "thursday", label: "Jueves" },
  { key: "friday", label: "Viernes" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
];

export const CreateBranchForm: React.FC<CreateBranchFormProps> = ({
  onSuccess,
  defaultValues = {},
}) => {
  const { closeDialog } = useDialogStore();
  const { userData } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Initialize form with React Hook Form and Zod resolver
  const form = useForm<CreateBranchFormData>({
    resolver: zodResolver(createBranchSchema),
    defaultValues: {
      id_business: userData?.id_business || "",
      name: "",
      contact_number: "",
      address: "",
      city: "",
      postal_code: "",
      status: "active",
      coordinates: { lat: 0, lng: 0 },
      inventory_capacity: 0,
      operating_hours: {
        monday: "09:00-18:00",
        tuesday: "09:00-18:00",
        wednesday: "09:00-18:00",
        thursday: "09:00-18:00",
        friday: "09:00-18:00",
        saturday: "09:00-18:00",
        sunday: "Cerrado",
      },
      id_super_admin: userData?.id || "",
      ...defaultValues,
    },
  });

  // Use the useBranch hook
  const { createBranch, isCreating, isCreateError, createError } = useBranch();

  // Handle form submission
  const onSubmit = async (data: CreateBranchFormData) => {
    await createBranch({
      id_business: data.id_business,
      id_super_admin: data.id_super_admin,
      name: data.name,
      ...(data.contact_number && { contact_number: data.contact_number }),
      ...(data.address && { address: data.address }),
      ...(data.city && { city: data.city }),
      ...(data.postal_code && { postal_code: data.postal_code }),
      ...(data.status && { status: data.status }),
      ...(data.coordinates && {
        coordinates: {
          lat: Number(data.coordinates.lat) || 0,
          lng: Number(data.coordinates.lng) || 0,
        },
      }),
      ...(data.inventory_capacity && {
        inventory_capacity: Number(data.inventory_capacity) || 0,
      }),
      ...(data.operating_hours && { operating_hours: data.operating_hours }),
    });
    onSuccess();
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepProgress = () => (currentStep / totalSteps) * 100;

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Paso {currentStep} de {totalSteps}
        </h3>
        <Badge variant="secondary" className="text-sm">
          {Math.round(getStepProgress())}% completado
        </Badge>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${getStepProgress()}%` }}
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Información Básica</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Datos esenciales de la sucursal
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  Nombre de la Sucursal
                  <Star className="h-4 w-4 text-red-500" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Sucursal Centro, La Leña Norte..."
                    {...field}
                    disabled={isCreating}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Número de Contacto
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+51 123 456 789"
                    {...field}
                    disabled={isCreating}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isCreating}
                >
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Activo
                      </div>
                    </SelectItem>
                    <SelectItem value="inactive">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-gray-500" />
                        Inactivo
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Ubicación</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Dirección y coordenadas de la sucursal
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Dirección</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Av. Principal 123, Distrito, Provincia"
                  {...field}
                  disabled={isCreating}
                  className="min-h-[80px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Ciudad</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Arequipa"
                    {...field}
                    disabled={isCreating}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Código Postal
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="04001"
                    {...field}
                    disabled={isCreating}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />

        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Coordenadas GPS (Opcional)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="coordinates.lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Latitud</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder="-16.4040"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      disabled={isCreating}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordinates.lng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Longitud</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder="-71.5440"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      disabled={isCreating}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Configuración Adicional</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Ajustes opcionales de la sucursal
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="inventory_capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Capacidad de Inventario
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    disabled={isCreating}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />

        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Horarios de Operación (Opcional)
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {DAYS_OF_WEEK.map((day) => (
              <FormField
                key={day.key}
                control={form.control}
                name={`operating_hours.${day.key}` as keyof CreateBranchFormData}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium min-w-[100px]">
                        {day.label}
                      </FormLabel>
                      <div className="flex-1 max-w-[200px]">
                        <FormControl>
                          <Input
                            placeholder="09:00-18:00 o Cerrado"
                            {...field}
                            disabled={isCreating}
                            className="h-10"
                            value={field.value as string | undefined ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Formato:</strong> Use "09:00-18:00" para horarios o
              "Cerrado" para días sin atención
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  // Verificar autenticación
  if (!userData || !userData.id_business || !userData.id) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error de Autenticación
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            No se pudo obtener la información del usuario o del negocio.
          </p>
          <Button onClick={closeDialog} variant="outline">
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderStepIndicator()}

          <div className="min-h-[500px]">{renderCurrentStep()}</div>

          {/* Error Message */}
          {isCreateError && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">
                {createError?.message ||
                  "Ocurrió un error inesperado. Inténtalo de nuevo."}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? closeDialog : prevStep}
              disabled={isCreating}
              className="min-w-[100px]"
            >
              {currentStep === 1 ? "Cancelar" : "Anterior"}
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i + 1 <= currentStep ? "bg-blue-500" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={isCreating}
                className="min-w-[100px]"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isCreating}
                className="min-w-[120px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creando...
                  </>
                ) : (
                  "Crear Sucursal"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};;