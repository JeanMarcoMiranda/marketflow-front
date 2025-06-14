import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Building2, Eye, EyeOff, User2 } from "lucide-react";
import { useState } from "react";
import { Step, Stepper } from "@/components/common/Stepper";

// Esquema de validación con Zod
const registerSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string(),
  businessName: z.string().min(1, "El nombre del negocio es requerido"),
  branchName: z.string().min(1, "El nombre de la sucursal es requerido"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterFormData, "confirmPassword">) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const steps: Step[] = [
    {
      id: "personal-info",
      title: "Información Personal",
      icon: <User2 />,
      content: (
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-8 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-8 text-muted-foreground"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "business-info",
      title: "Información del Negocio",
      icon: <Building2 />,
      content: (
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="businessName">Nombre del Negocio</Label>
            <Input
              id="businessName"
              {...register("businessName")}
            />
            {errors.businessName && (
              <span className="text-sm text-red-500">{errors.businessName.message}</span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="branchName">Nombre de la Sucursal</Label>
            <Input
              id="branchName"
              {...register("branchName")}
            />
            {errors.branchName && (
              <span className="text-sm text-red-500">{errors.branchName.message}</span>
            )}
          </div>
        </div>
      ),
    },
  ];

  const submitForm = (data: RegisterFormData) => {
    const { email, password, businessName, branchName } = data;
    onSubmit({ email, password, businessName, branchName });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Regístrate</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Completa los siguientes pasos para crear tu cuenta
        </p>
      </div>

      <Stepper
        steps={steps}
        onComplete={handleSubmit(submitForm)}
        renderActions={({
          nextStep,
          prevStep,
          isFirstStep,
          isLastStep,
          currentStep,
        }) => {
          const validateAndNext = async () => {
            let fieldsToValidate: (keyof RegisterFormData)[] = [];

            if (currentStep === 0) {
              fieldsToValidate = ["email", "password", "confirmPassword"];
            } else if (currentStep === 1) {
              fieldsToValidate = ["businessName", "branchName"];
            }

            const isValid = await trigger(fieldsToValidate);
            if (isValid) nextStep();
          };

          return (
            <div className="flex justify-between mt-6">
              {!isFirstStep && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                >
                  Anterior
                </Button>
              )}

              <div className="ml-auto flex gap-2">
                {!isLastStep ? (
                  <Button
                    type="button"
                    onClick={validateAndNext}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button type="submit">
                    Completar Registro
                  </Button>
                )}
              </div>
            </div>
          );
        }}
      />

      <div className="text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/auth/login" className="underline underline-offset-4">
          Inicia Sesión
        </Link>
      </div>
    </div>
  );
}