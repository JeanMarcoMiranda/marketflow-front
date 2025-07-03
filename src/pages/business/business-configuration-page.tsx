import BusinessBranchSection from "@/components/features/business/business-branch-section";
import BusinessConfigurationSkeleton from "@/components/features/business/business-configuration-skeleton";
import BusinessInfoSection from "@/components/features/business/business-info-section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useBusiness } from "@/hooks/use-business";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlertTriangle, RefreshCcw } from "lucide-react";

const BusinessConfigurationPage = () => {
  const { userData } = useAuth();
  const businessId = userData?.id_business;

  const { business, branches, isLoading, isError, error, refetchAll } =
    useBusiness(businessId ?? "");

  if (!businessId) {
    return <NoBusinessId />;
  }

  if (isLoading) {
    return <BusinessConfigurationSkeleton />;
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error al cargar los datos del negocio</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-3">
              {error?.message ?? "Ocurrió un error desconocido"}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={refetchAll}
              className="hover:bg-destructive/10"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50"
    >
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent pb-2">
              Configuración del Negocio
            </h1>
            <p className="text-slate-600">
              Administra la información y configuración de tu negocio
            </p>
          </div>

          <div className="flex items-center gap-3">
            {business?.status && (
              <Badge
                variant={business.status === "active" ? "default" : "secondary"}
                className="flex items-center gap-1 px-3 py-1"
              >
                <Activity className="h-3 w-3" />
                {business.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            )}
            <Button
              onClick={refetchAll}
              variant="outline"
              className="hover:bg-slate-50 transition-colors"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Actualizar
            </Button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Business Info Section */}
            <BusinessInfoSection business={business} />

            {/* Branches Section */}
            <BusinessBranchSection branches={branches} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BusinessConfigurationPage;

// Componente para cuando no hay ID de negocio
const NoBusinessId = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse" />
      <div className="relative bg-white rounded-full p-6 shadow-lg">
        <AlertTriangle className="h-12 w-12 text-yellow-500" />
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-3 max-w-md"
    >
      <h2 className="text-2xl font-bold text-slate-800">
        No se encontró un negocio
      </h2>
      <p className="text-slate-600 leading-relaxed">
        Necesitas estar asociado a un negocio para acceder a esta página. Por
        favor inicia sesión o registra tu negocio para continuar.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Button
        asChild
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3"
      >
        <a href="/login">Comenzar</a>
      </Button>
    </motion.div>
  </motion.div>
);
