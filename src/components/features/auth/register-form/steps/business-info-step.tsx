import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const BusinessInfoStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="businessName">Nombre del Negocio</Label>
        <Input
          id="businessName"
          placeholder="Mi Minimarket"
          {...register("businessName")}
          aria-invalid={!!errors.businessName}
          aria-describedby={
            errors.businessName ? "businessName-error" : undefined
          }
        />
        {errors.businessName?.message &&
          typeof errors.businessName.message === "string" && (
            <p id="businessName-error" className="text-sm text-destructive">
              {errors.businessName.message}
            </p>
          )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="branchName">Nombre de la Sucursal</Label>
        <Input
          id="branchName"
          placeholder="Sucursal Principal"
          {...register("branchName")}
          aria-invalid={!!errors.branchName}
          aria-describedby={errors.branchName ? "branchName-error" : undefined}
        />
        {errors.branchName?.message &&
          typeof errors.branchName.message === "string" && (
            <p id="branchName-error" className="text-sm text-destructive">
              {errors.branchName.message}
            </p>
          )}
      </div>
    </div>
  );
};
