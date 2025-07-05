import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button"; // Asegúrate de importar el componente Button

// Mapeo de rutas de inglés a español con capitalización
const routeMap: Record<string, string> = {
  dashboard: "Panel de Control",
  orders: "Pedidos",
  inventory: "Inventario",
  users: "Usuarios",
  branches: "Sucursales",
  products: "Productos",
  help: "Soporte",
  reports: "Reportes",
  settings: "Configuración",
};

export const Header = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Función para cerrar sesión y redirigir al login
  const handleLogout = async () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {/* Primer elemento fijo: "MarketFlow" sin enlace */}
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold">
                  MarketFlow
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === pathSegments.length - 1;

                // Obtener traducción o capitalizar el segmento si no está en el mapa
                const translatedSegment =
                  routeMap[segment] ||
                  segment.charAt(0).toUpperCase() + segment.slice(1);

                return (
                  <BreadcrumbItem key={href}>
                    {isLast ? (
                      <BreadcrumbPage>{translatedSegment}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink asChild>
                          <Link to={href}>{translatedSegment}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* Botón de cerrar sesión */}
        <Button variant="default" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>
    </header>
  );
};
