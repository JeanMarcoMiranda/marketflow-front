import { Order } from '@/api/types/orders.types';
import { formatDate } from '@/lib/date-utils';
import React from 'react';

interface OrderTooltipProps {
  orders: Order[];
  date: Date;
}

const OrderTooltip: React.FC<OrderTooltipProps> = ({ orders, date }) => {
  const dateStr = formatDate(date);

  const requestOrders = orders.filter(order => order.request_date === dateStr);
  const deliveryOrders = orders.filter(order => order.delivery_date === dateStr);

  if (orders.length === 0) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pendiente':
        return 'text-yellow-600';
      case 'Enviado':
        return 'text-blue-600';
      case 'Recibido':
        return 'text-green-600';
      case 'Cancelado':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-80 max-w-96">
      <h3 className="font-semibold text-gray-900 mb-3">
        Órdenes del {date.toLocaleDateString('es-PE')}
      </h3>

      <div className="space-y-3">
        {requestOrders.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              📋 Fechas de solicitud
            </h4>
            {requestOrders.map(order => (
              <div key={`req-${order.id}`} className="bg-blue-50 rounded-md p-2 mb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Orden #{order.id}</p>
                    <p className={`text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Cantidad: {order.total_quantity} | {formatCurrency(order.total_cost)}
                    </p>
                    {order.delivery_date && (
                      <p className="text-xs text-gray-500">
                        Entrega: {new Date(order.delivery_date).toLocaleDateString('es-PE')}
                      </p>
                    )}
                  </div>
                </div>
                {order.notes && (
                  <p className="text-xs text-gray-600 mt-1 italic">
                    {order.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {deliveryOrders.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              🚚 Fechas de entrega
            </h4>
            {deliveryOrders.map(order => (
              <div key={`del-${order.id}`} className="bg-green-50 rounded-md p-2 mb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Orden #{order.id}</p>
                    <p className={`text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Cantidad: {order.total_quantity} | {formatCurrency(order.total_cost)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Solicitado: {new Date(order.request_date).toLocaleDateString('es-PE')}
                    </p>
                  </div>
                </div>
                {order.notes && (
                  <p className="text-xs text-gray-600 mt-1 italic">
                    {order.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTooltip;