import { toast } from "sonner";
import { GalleryVerticalEnd } from "lucide-react";
import ImgBackground from "@/assets/img/background_auth.png";
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
      await register(
        data.email,
        data.password,
        data.businessName,
        data.branchName
      );
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error al momento de registrar", error);
      toast.error("Error al registrarte");
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
            <RegisterForm onSubmit={handleRegister} />
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
