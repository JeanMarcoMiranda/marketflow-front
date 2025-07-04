import { CalendarDate, Order } from '@/api/types/orders.types';
import { formatDate } from '@/lib/date-utils';
import React, { useState } from 'react';
import OrderTooltip from '../orders/order-tooltip';

interface CalendarDayProps {
  calendarDate: CalendarDate;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ calendarDate }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { date, isCurrentMonth, isToday, orders } = calendarDate;

  const dateStr = formatDate(date);
  const dayNumber = date.getDate();

  // Separar órdenes por tipo de fecha
  const requestOrders = orders.filter(order => order.request_date === dateStr);
  const deliveryOrders = orders.filter(order => order.delivery_date === dateStr);

  const hasOrders = orders.length > 0;

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-500';
      case 'Enviado':
        return 'bg-blue-500';
      case 'Recibido':
        return 'bg-green-500';
      case 'Cancelado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const dayClasses = [
    'relative h-24 border border-gray-200 p-1 cursor-pointer transition-all duration-200',
    isCurrentMonth ? 'bg-white' : 'bg-gray-50',
    isToday ? 'ring-2 ring-blue-500 ring-inset' : '',
    hasOrders ? 'hover:bg-gray-50' : '',
    !isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
  ].filter(Boolean).join(' ');

  return (
    <div className="relative">
      <div
        className={dayClasses}
        onMouseEnter={() => hasOrders && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Número del día */}
        <div className="flex justify-between items-start h-full">
          <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
            {dayNumber}
          </span>

          {/* Indicadores de órdenes */}
          <div className="flex flex-col gap-1">
            {requestOrders.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {requestOrders.map(order => (
                  <div
                    key={`req-${order.id}`}
                    className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}
                    title={`Solicitud: ${order.id}`}
                  />
                ))}
              </div>
            )}
            {deliveryOrders.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {deliveryOrders.map(order => (
                  <div
                    key={`del-${order.id}`}
                    className={`w-2 h-2 rounded-full ${getStatusColor(order.status)} ring-1 ring-white`}
                    title={`Entrega: ${order.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contador de órdenes */}
        {hasOrders && (
          <div className="absolute bottom-1 left-1">
            <span className="text-xs bg-gray-800 text-white px-1 rounded">
              {orders.length}
            </span>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && hasOrders && (
        <div className="absolute z-50 top-full left-0 mt-2 pointer-events-none">
          <OrderTooltip orders={orders} date={date} />
        </div>
      )}
    </div>
  );
};

export default CalendarDay;