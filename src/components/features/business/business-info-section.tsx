import { Business } from "@/api/types/response.types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import BusinessInfoField from "./business-info-field";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Calendar,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const BusinessInfoSection = ({ business }: { business: Business | undefined }) => {
  if (!business) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-8">
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-start gap-6"
          >
            <div className="flex-shrink-0">
              {business.logo_url ? (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={business.logo_url}
                  alt={`Logo de ${business.name}`}
                  className="h-20 w-20 rounded-xl object-cover shadow-md ring-2 ring-slate-200"
                />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-20 w-20 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-md ring-2 ring-slate-200"
                >
                  <Building className="h-10 w-10 text-slate-500" />
                </motion.div>
              )}
            </div>

            <div className="flex-grow space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-3xl font-bold text-slate-900">
                    {business.name}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600 mt-1">
                    {business.description || "Sin descripción disponible"}
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-slate-50 transition-colors w-fit"
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </div>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants}>
              <BusinessInfoField
                label="Estado"
                value={business.status}
                icon={<Tag className="h-4 w-4" />}
              >
                <Badge
                  variant={business.status === 'active' ? 'default' : 'secondary'}
                  className="flex items-center gap-1 w-fit"
                >
                  <div className={`h-2 w-2 rounded-full ${business.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`} />
                  {business.status === 'active' ? 'Activo' : 'Inactivo'}
                </Badge>
              </BusinessInfoField>
            </motion.div>

            <motion.div variants={itemVariants}>
              <BusinessInfoField
                label="Correo de contacto"
                value={business.email}
                icon={<Mail className="h-4 w-4" />}
                copyable
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <BusinessInfoField
                label="Número de teléfono"
                value={business.contact_number}
                icon={<Phone className="h-4 w-4" />}
                copyable
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <BusinessInfoField
                label="Dirección"
                value={business.address}
                icon={<MapPin className="h-4 w-4" />}
                className="md:col-span-2"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <BusinessInfoField
                label="Tipo de negocio"
                value={business.business_type_id?.toString()}
                icon={<Building className="h-4 w-4" />}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <BusinessInfoField
                label="Fecha de creación"
                value={new Date(business.created_at).toLocaleDateString('es-PE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                icon={<Calendar className="h-4 w-4" />}
              />
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BusinessInfoSection;
