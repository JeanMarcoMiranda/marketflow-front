import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/common/sidebar/sidebar";
import { useBusiness } from "@/hooks/use-business";
import { Header } from "@/components/common/header";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Asumiendo que tienes un componente Button de tu UI library
import { Loader2, AlertTriangle } from "lucide-react"; // Iconos de Lucide para spinner y error

// Componente para el estado de carga
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

// Componente para errores
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

// Componente para cuando no hay businessId
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
      <a href="/login">Iniciar sesión</a>
    </Button>
  </motion.div>
);

// Componente para cuando no hay datos de negocio
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
  const {
    refetchBranches,
    business,
    businessError,
    branches,
    branchesError,
    hasBusinessId,
    isAnyLoading,
    hasAnyError,
  } = useBusiness();

  if (!hasBusinessId) {
    return <NoBusinessId />;
  }

  if (isAnyLoading) {
    return <LoadingState />;
  }

  if (hasAnyError) {
    return (
      <ErrorState
        businessError={businessError}
        branchesError={branchesError}
        onRetry={refetchBranches}
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
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
