import { Link, Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { useBusiness } from "@/hooks/use-business";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { AppSidebar } from "@/components/common/temp-sidebar/temp-sidebar";
import { Header } from "@/components/common/temp-header";
import { useAuth } from "@/hooks/use-auth";

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50"
  >
    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    <p className="text-lg font-medium text-gray-600">Cargando datos...</p>
  </motion.div>
);

const ErrorState = ({
  businessError,
  branchesError,
  onRetry,
}: {
  businessError?: Error | null;
  branchesError?: Error | null;
  onRetry?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-4 text-center"
  >
    <AlertTriangle className="h-12 w-12 text-red-500" />
    <h2 className="text-xl font-semibold text-gray-800">Ocurrió un error</h2>
    <div className="space-y-2 text-gray-600">
      {businessError && <p>Error en negocio: {businessError.message}</p>}
      {branchesError && <p>Error en sucursales: {branchesError.message}</p>}
    </div>
    {onRetry && (
      <Button
        onClick={onRetry}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
      >
        Reintentar
      </Button>
    )}
  </motion.div>
);

const NoBusinessId = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-4 text-center"
  >
    <AlertTriangle className="h-12 w-12 text-yellow-500" />
    <h2 className="text-xl font-semibold text-gray-800">
      No se encontró ID de negocio
    </h2>
    <p className="text-gray-600">
      Por favor, inicia sesión o registra un negocio para continuar.
    </p>
    <Button asChild className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
      <Link to="/login">Iniciar sesión</Link>
    </Button>
  </motion.div>
);

const NoBusinessData = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-4 text-center"
  >
    <AlertTriangle className="h-12 w-12 text-yellow-500" />
    <h2 className="text-xl font-semibold text-gray-800">
      No hay datos de negocio disponibles
    </h2>
    <p className="text-gray-600">
      No se encontraron datos para el negocio actual.
    </p>
  </motion.div>
);

export default function PrivateLayout() {
  const { userData } = useAuth();
  const businessId = userData?.id_business;

  const {
    business,
    branches,
    isLoading,
    isError,
    error,
    refetchAll,
    refetchBranches,
  } = useBusiness(businessId ?? "");

  if (!businessId) {
    return <NoBusinessId />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState
        businessError={error}
        branchesError={error}
        onRetry={refetchAll}
      />
    );
  }

  if (!business) {
    return <NoBusinessData />;
  }

  return (
    <SidebarProvider>
      <AppSidebar
        businessBranches={branches ?? []}
        onBranchesRefetch={() => {
          refetchBranches();
        }}
      />
      <SidebarInset>
        <Header />
        <main className="flex h-full flex-1 flex-col space-y-8 p-8">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
