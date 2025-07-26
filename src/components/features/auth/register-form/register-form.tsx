import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User2, Building2, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { type Step, Stepper } from "@/components/common/temp-stepper";
import { BusinessInfoStep } from "./steps/business-info-step";
import { PersonalInfoStep } from "./steps/personal-info-step";

// Esquema de validación con Zod
const registerSchema = z
  .object({
    email: z.string().email("Correo electrónico inválido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
    businessName: z.string().min(1, "El nombre del negocio es requerido"),
    branchName: z.string().min(1, "El nombre de la sucursal es requerido"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterFormData, "confirmPassword">) => void;
}

export function RegisterForm({ onSubmit }: Readonly<RegisterFormProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          toggleShowConfirmPassword={() =>
            setShowConfirmPassword((prev) => !prev)
          }
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
    setIsLoading(true);
    // try {
    const { email, password, businessName, branchName } = data;
    console.log("wenas register form", data);
    onSubmit({ email, password, businessName, branchName });
    // } finally {
    setIsLoading(false);
    // }
  };

  return (
    <FormProvider {...methods}>
      <div className="animate-in fade-in duration-500">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <User2 className="size-5" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Crear cuenta nueva
            </h1>
            <p className="text-balance text-muted-foreground max-w-sm">
              Completa los siguientes pasos para configurar tu sistema de punto
              de venta
            </p>
          </div>

          {/* Stepper Form */}
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
                <div className="flex justify-between mt-8">
                  {!isFirstStep && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="h-12 px-6 transition-all duration-200 ease-in-out hover:scale-105 bg-transparent"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Anterior
                    </Button>
                  )}
                  <div className="ml-auto flex gap-2">
                    {!isLastStep ? (
                      <Button
                        type="button"
                        onClick={validateAndNext}
                        className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 group"
                      >
                        Siguiente
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        onClick={handleSubmit(submitForm)}
                        className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 group"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                            Creando cuenta...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            Completar registro
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                          </div>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              );
            }}
          />

          {/* Footer Links */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors duration-200 ease-in-out underline-offset-4 hover:underline"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
