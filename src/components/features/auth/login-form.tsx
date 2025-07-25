import type React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onLogin: (email: string, password: string) => void;
}

export function LoginForm({
  onLogin,
  className,
  ...props
}: Readonly<LoginFormProps>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <form
        className={cn("flex flex-col gap-8", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Lock className="size-5" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Bienvenido de vuelta
          </h1>
          <p className="text-balance text-muted-foreground max-w-sm">
            Ingresa tus credenciales para acceder a tu sistema de punto de venta
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6">
          {/* Email Field */}
          <div className="grid gap-3">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200" />
              <Input
                id="email"
                type="email"
                placeholder="tu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-background border-border focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 ease-in-out hover:border-primary/50"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Contraseña
              </Label>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 ease-in-out underline-offset-4 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-12 h-12 bg-background border-border focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 ease-in-out hover:border-primary/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] group"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Ingresando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Ingresar al sistema
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
              </div>
            )}
          </Button>
        </div>

        {/* Footer Links */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-primary hover:text-primary/80 transition-colors duration-200 ease-in-out underline-offset-4 hover:underline"
            >
              Crear cuenta nueva
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
