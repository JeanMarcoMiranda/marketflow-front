import { toast } from "sonner";
import { GalleryVerticalEnd } from "lucide-react";
import ImgBackground from "@/assets/img/background_auth_2.webp";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { RegisterForm } from "@/components/features/auth/register-form/index";

export default function RegisterPage() {
  const { register, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";

  if (userData) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRegister = async (data: {
    email: string;
    password: string;
    businessName: string;
    branchName: string;
  }) => {
    try {
      console.log("wenas register page", data);

      await register(
        data.email,
        data.password,
        data.businessName,
        data.branchName
      );
      toast.success("¡Cuenta creada exitosamente!", {
        description: "Bienvenido a MarketFlow, tu sistema POS está listo",
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error al momento de registrar", error);
      toast.error("Error al crear la cuenta", {
        description: "Verifica los datos e intenta nuevamente",
      });
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-background">
      {/* Left Panel - Background Image */}
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <img
          src={ImgBackground || "/placeholder.svg"}
          alt="Sistema de punto de venta moderno"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale transition-all duration-300"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="text-white animate-in fade-in duration-1000 delay-500">
            <h2 className="text-3xl font-bold mb-4">Únete a MarketFlow</h2>
            <p className="text-lg text-white/90 max-w-md leading-relaxed">
              Configura tu minimarket en minutos y comienza a gestionar ventas,
              inventario y clientes de manera profesional.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                Configuración rápida
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                Soporte incluido
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex flex-col gap-6 p-6 md:p-10 lg:p-12">
        {/* Brand Header */}
        <div className="flex justify-center gap-2 md:justify-start animate-in fade-in duration-300">
          <a className="flex items-center gap-3 font-bold text-xl group transition-all duration-200 ease-in-out hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:shadow-xl transition-all duration-200">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              MarketFlow
            </span>
          </a>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <RegisterForm onSubmit={handleRegister} />
          </div>
        </div>
      </div>
    </div>
  );
}
