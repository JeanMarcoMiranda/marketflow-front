import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface PersonalInfoStepProps {
  showPassword: boolean;
  showConfirmPassword: boolean;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
}

export const PersonalInfoStep = ({
  showPassword,
  showConfirmPassword,
  toggleShowPassword,
  toggleShowConfirmPassword,
}: PersonalInfoStepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email?.message && typeof errors.email.message === "string" && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid gap-2 relative">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.password?.message && typeof errors.password.message === "string" && (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="grid gap-2 relative">
        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword")}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
        />
        <button
          type="button"
          onClick={toggleShowConfirmPassword}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showConfirmPassword ? "Ocultar confirmación de contraseña" : "Mostrar confirmación de contraseña"}
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.confirmPassword?.message && typeof errors.confirmPassword.message === "string" && (
          <p id="confirmPassword-error" className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
};