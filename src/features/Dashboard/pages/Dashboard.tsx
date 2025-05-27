import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserBusiness } from "@/features/Business/hooks/useBusiness";
import { LogOut, Bell, BarChart2, Users, ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormCreateBusiness } from "@/features/Business/pages/FormCreate/BusinessCreate";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  //TODO: Cmabiar la funcion para obtener del localstorage
  const { userBusinessesQuery } = useUserBusiness(userData?.id ?? "");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (userData && userBusinessesQuery.data?.length === 0) {
      setShowDialog(true);
    }
  }, [userData, userBusinessesQuery.data]);

  //TODO: Implementar la función de cerrar sesión y redirigir al login
  const handleLogout = async () => {
    // await signOut();
    navigate("/auth/login");
  };

  // Datos ficticios para métricas y notificaciones
  const stats = [
    {
      title: "Usuarios Activos",
      value: 1254,
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Ventas Hoy",
      value: "$3,487",
      icon: <ShoppingBag className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Tareas Pendientes",
      value: 23,
      icon: <Bell className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: "Actividad Reciente",
      value: "Alta",
      icon: <BarChart2 className="h-6 w-6 text-red-500" />,
    },
  ];

  const notifications = [
    "Nuevo usuario registrado: Juan Pérez",
    "Pedido #98234 completado",
    "Servidor en mantenimiento a las 2AM",
    "Pago recibido de $149.99",
  ];

  return (
    <div>
      {/* Encabezado */}
      <header className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-300"
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </button>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 p-8">
        {/* Bienvenida */}
        <p className="text-gray-600 text-lg mb-6">
          Bienvenido, <span className="font-semibold">Jacket</span>
        </p>

        {/* Tarjetas de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"
            >
              <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-semibold">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Notificaciones */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Notificaciones recientes
            </h2>
            <button className="text-blue-600 hover:underline text-sm">
              Ver todas
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-3">
              {notifications.map((note, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 border-b last:border-none py-3 px-4 rounded-lg hover:bg-gray-100 transition duration-200"
                >
                  {/* Indicador de nuevo mensaje */}
                  <span className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></span>

                  {/* Texto de la notificación */}
                  <p className="text-gray-700 flex-1">{note}</p>

                  {/* Hora de la notificación (simulada) */}
                  <span className="text-xs text-gray-500">
                    Hace {index + 1} min
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Dialog para crear negocio si el usuario no tiene uno */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Bienvenido!</DialogTitle>
            <DialogDescription>
              Para comenzar, por favor crea tu negocio.
            </DialogDescription>
          </DialogHeader>
          <FormCreateBusiness onSuccess={() => setShowDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
