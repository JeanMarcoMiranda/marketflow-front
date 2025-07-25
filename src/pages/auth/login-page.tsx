import { useState } from "react";
import { toast } from "sonner";
import {
  GalleryVerticalEnd,
  ShoppingCart,
  TrendingUp,
  Package,
  Check,
} from "lucide-react";
import ImgBackground from "@/assets/img/background_auth_2.webp";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/features/auth/login-form";
import { useAuth } from "@/hooks/use-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  VentasModalContent,
  ReportesModalContent,
} from "@/components/features/auth/feature-modals";

export default function LoginPage() {
  const { login, userData, userSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";

  console.log("User data:", userData);
  console.log("User session:", userSession);

  const [activeModal, setActiveModal] = useState<
    "ventas" | "reportes" | "orders" | null
  >(null);

  if (userData) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      console.log("Inicio de sesión exitoso");
      toast.success("¡Bienvenido de vuelta!", {
        description: "Has iniciado sesión correctamente",
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error de autenticación:", error);
      toast.error("Error al iniciar sesión", {
        description: "Verifica tus credenciales e intenta nuevamente",
      });
    }
  };

  const getDialogContent = () => {
    switch (activeModal) {
      case "ventas":
        return <VentasModalContent />;
      case "reportes":
        return <ReportesModalContent />;
      case "orders":
        return (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Módulo de Pedidos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Gestión eficiente de pedidos
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">
                    Creación y seguimiento de pedidos
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">
                    Actualizaciones de estado en tiempo real
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Integración con inventario</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">
                    Notificaciones automáticas de pedidos
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (activeModal) {
      case "ventas":
        return "Módulo de Ventas";
      case "reportes":
        return "Reportes y Analytics";
      case "orders":
        return "Módulo de Pedidos";
      default:
        return "";
    }
  };

  const getDialogDescription = () => {
    switch (activeModal) {
      case "ventas":
        return "Conoce las características del sistema de punto de venta";
      case "reportes":
        return "Visualiza y analiza el rendimiento de tu negocio";
      case "orders":
        return "Gestiona tus pedidos de manera eficiente";
      default:
        return "";
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-background">
      {/* Left Panel - Login Form */}
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
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>

        {/* Footer Features */}
        <div className="hidden md:block animate-in fade-in duration-700 delay-300">
          <div className="grid grid-cols-3 gap-4 text-center">
            <button
              onClick={() => setActiveModal("ventas")}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card/50 border border-border/50 transition-all duration-200 hover:bg-card hover:border-border hover:scale-105 cursor-pointer group"
            >
              <ShoppingCart className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-200">
                Ventas
              </span>
            </button>
            <button
              onClick={() => setActiveModal("reportes")}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card/50 border border-border/50 transition-all duration-200 hover:bg-card hover:border-border hover:scale-105 cursor-pointer group"
            >
              <TrendingUp className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-200">
                Reportes
              </span>
            </button>
            <button
              onClick={() => setActiveModal("orders")}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card/50 border border-border/50 transition-all duration-200 hover:bg-card hover:border-border hover:scale-105 cursor-pointer group"
            >
              <Package className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-200">
                Pedidos
              </span>
            </button>
          </div>
        </div>

        {/* Dialog usando shadcn/ui */}
        <Dialog
          open={activeModal !== null}
          onOpenChange={(open) => !open && setActiveModal(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{getDialogTitle()}</DialogTitle>
              <DialogDescription>{getDialogDescription()}</DialogDescription>
            </DialogHeader>
            {getDialogContent()}
          </DialogContent>
        </Dialog>
      </div>

      {/* Right Panel - Background Image */}
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
            <h2 className="text-3xl font-bold mb-4">Sistema POS Profesional</h2>
            <p className="text-lg text-white/90 max-w-2xl leading-relaxed mb-6">
              Transforma la gestión de tu minimarket con MarketFlow, un sistema
              integral de punto de venta diseñado para optimizar tus operaciones
              diarias. Administra ventas, pedidos e inventario con facilidad y
              obtén insights valiosos a través de reportes detallados.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                Sistema seguro y confiable
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                Interfaz intuitiva y fácil de usar
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                Gestión de pedidos en tiempo real
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="h-2 w-2 rounded-full bg-orange-400" />
                Reportes detallados para tu negocio
              </div>
            </div>
            <p className="text-sm text-white/70 mt-4 max-w-md">
              💡 <strong>Tip:</strong> Optimiza tu flujo de trabajo con nuestras
              herramientas integradas para ventas, pedidos y análisis, todo
              desde un solo lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
