import { CalendarDate } from '@/api/types/orders.types';
import React from 'react';
import CalendarDay from './calendar-day';
import LegendItem from './calendar-legend-items';

interface CalendarGridProps {
  calendarDates: CalendarDate[];
  loading: boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ calendarDates, loading }) => {
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-muted-foreground">Cargando órdenes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Encabezados de días de la semana */}
      <div className="grid grid-cols-7 border-b">
        {weekDays.map(day => (
          <div key={day} className="py-4 text-center text-sm font-medium text-muted-foreground">
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
      <div className="border-t bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Leyenda</h3>
          <div className="flex items-center space-x-4 text-xs">
            <LegendItem color="yellow" label="Pendiente" />
            <LegendItem color="blue" label="Enviado" />
            <LegendItem color="green" label="Recibido" />
            <LegendItem color="red" label="Cancelado" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default CalendarGrid;