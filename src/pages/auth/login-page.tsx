import { toast } from "sonner";
import { GalleryVerticalEnd } from "lucide-react";
import ImgBackground from "@/assets/img/background_auth.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/features/auth/login-form";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const { login, userData, userSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";

  console.log("User data:", userData);
  console.log("User session:", userSession);

  if (userData) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      console.log("Inicio de sesión exitoso");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error de autenticación:", error);
      toast("Error al iniciar sesión");
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            MarketFlow
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={ImgBackground}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
