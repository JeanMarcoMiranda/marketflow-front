import { useEffect, useState } from "react";

const generateFakeOrders = () => [
  {
    id: "ORD123",
    city: "Arequipa",
    status: "En camino",
    coordinates: [50, 30],
  },
  {
    id: "ORD456",
    city: "Camaná",
    status: "Pendiente",
    coordinates: [120, 70],
  },
  { id: "ORD789", city: "Chicago", status: "Entregado", coordinates: [80, 50] },
  {
    id: "ORD101",
    city: "Caravelí",
    status: "En camino",
    coordinates: [150, 60],
  },
  { id: "ORD202", city: "Houston", status: "Pendiente", coordinates: [90, 80] },
  { id: "ORD303", city: "Miami", status: "Entregado", coordinates: [60, 90] },
  {
    id: "ORD404",
    city: "Condesuyos",
    status: "En camino",
    coordinates: [140, 40],
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState(generateFakeOrders());

  // Función para simular movimiento leve de las coordenadas
  const updateOrderPositions = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        coordinates: [
          order.coordinates[0] + (Math.random() > 0.5 ? 0.5 : -0.5),
          order.coordinates[1] + (Math.random() > 0.5 ? 0.5 : -0.5),
        ],
      }))
    );
  };

  useEffect(() => {
    const interval = setInterval(updateOrderPositions, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Órdenes</h1>

      {/* Contenedor del Mapa */}
      <div className="relative bg-gray-200 rounded-lg shadow-md w-full max-w-3xl mx-auto h-72 overflow-hidden">
        {/* Mapa Simulado con Cuadrícula */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Fondo del mapa */}
          <rect width="200" height="100" fill="#E5E7EB" />

          {/* Líneas de la cuadrícula */}
          {[...Array(11)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 20}
              y1={0}
              x2={i * 20}
              y2={100}
              stroke="#D1D5DB"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * 20}
              x2={200}
              y2={i * 20}
              stroke="#D1D5DB"
              strokeWidth="0.5"
            />
          ))}

          {/* Marcadores de Órdenes */}
          {orders.map((order, index) => (
            <circle
              key={index}
              cx={order.coordinates[0]}
              cy={order.coordinates[1]}
              r="6"
              fill={
                order.status === "En camino"
                  ? "blue"
                  : order.status === "Pendiente"
                  ? "orange"
                  : "green"
              }
              stroke="black"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* Etiquetas de Órdenes */}
        {orders.map((order, index) => (
          <div
            key={index}
            className="absolute text-xs font-semibold bg-white shadow-md px-2 py-1 rounded-lg transition-all duration-500"
            style={{
              top: `${order.coordinates[1]}%`,
              left: `${order.coordinates[0]}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {order.city}
          </div>
        ))}
      </div>

      {/* Lista de Órdenes */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Órdenes Recientes
        </h2>
        <ul className="space-y-3">
          {orders.map((order, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md border border-gray-200"
            >
              <span className="font-medium">
                {order.id} - {order.city}
              </span>
              <span
                className={`px-3 py-1 rounded text-white ${
                  order.status === "En camino"
                    ? "bg-blue-500"
                    : order.status === "Pendiente"
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
              >
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersPage;
