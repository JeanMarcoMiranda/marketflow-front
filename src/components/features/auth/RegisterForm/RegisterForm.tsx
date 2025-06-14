import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, User2 } from "lucide-react";
import { useState } from "react";
import { Step, Stepper } from "@/components/common/Stepper";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { BusinessInfoStep } from "./steps/BusinessInfoStep";

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

export interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterFormData, "confirmPassword">) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const { handleSubmit, trigger } = methods;

  const steps: Step[] = [
    {
      id: "personal-info",
      title: "Personal",
      subtitle: "Información Personal",
      icon: <User2 className="h-5 w-5" />,
      content: (
        <PersonalInfoStep
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          toggleShowPassword={() => setShowPassword((prev) => !prev)}
          toggleShowConfirmPassword={() => setShowConfirmPassword((prev) => !prev)}
        />
      ),
    },
    {
      id: "business-info",
      title: "Business",
      subtitle: "Información del Negocio",
      icon: <Building2 className="h-5 w-5" />,
      content: <BusinessInfoStep />,
    },
  ];

  const submitForm = (data: RegisterFormData) => {
    const { email, password, businessName, branchName } = data;
    onSubmit({ email, password, businessName, branchName });
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Regístrate</h1>
          <p className="text-sm text-muted-foreground max-w-md">
            Completa los siguientes pasos para crear tu cuenta
          </p>
        </div>

        <Stepper
          steps={steps}
          onComplete={handleSubmit(submitForm)}
          variant="filled"
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
                    className="min-w-[100px]"
                  >
                    Anterior
                  </Button>
                )}

                <div className="ml-auto flex gap-2">
                  {!isLastStep ? (
                    <Button
                      type="button"
                      onClick={validateAndNext}
                      className="min-w-[100px]"
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      onClick={handleSubmit(submitForm)}
                      className="min-w-[150px]"
                    >
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
          <Link
            to="/auth/login"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            Inicia Sesión
          </Link>
        </div>
      </div>
    </FormProvider>
  );
}