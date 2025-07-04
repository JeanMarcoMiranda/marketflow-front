import { CalendarDate } from '@/api/types/orders.types';
import React from 'react';
import CalendarDay from './calendar-day';

interface CalendarGridProps {
  calendarDates: CalendarDate[];
  loading: boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ calendarDates, loading }) => {
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Cargando órdenes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Encabezados de días de la semana */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {weekDays.map(day => (
          <div key={day} className="py-3 text-center text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Grilla de días */}
      <div className="grid grid-cols-7 gap-0">
        {calendarDates.map((calendarDate, index) => (
          <CalendarDay
            key={`${calendarDate.date.toISOString()}-${index}`}
            calendarDate={calendarDate}
          />
        ))}
      </div>

      {/* Leyenda */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Leyenda:</h3>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Pendiente</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Enviado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Recibido</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Cancelado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Solicitud</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 ring-1 ring-white"></div>
            <span>Entrega</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CalendarGrid;