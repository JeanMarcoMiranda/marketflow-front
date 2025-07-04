import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, RotateCcw } from 'lucide-react';
import { MonthYear } from '@/api/types/orders.types';

interface CalendarHeaderProps {
  currentDate: MonthYear;
  onNavigateMonth: (direction: 'prev' | 'next') => void;
  onGoToToday: () => void;
  onSetMonth: (month: number) => void;
  onSetYear: (year: number) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onNavigateMonth,
  onGoToToday,
  onSetMonth,
  onSetYear
}) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {/* Navegación de meses */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigateMonth('prev')}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          title="Mes anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2">
          {/* Selector de mes */}
          <select
            value={currentDate.month}
            onChange={(e) => onSetMonth(parseInt(e.target.value))}
            className="bg-transparent text-lg font-semibold border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>

          {/* Selector de año */}
          <select
            value={currentDate.year}
            onChange={(e) => onSetYear(parseInt(e.target.value))}
            className="bg-transparent text-lg font-semibold border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onNavigateMonth('next')}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          title="Mes siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Título y botón de hoy */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Calendario de Órdenes
        </h1>

        <button
          onClick={onGoToToday}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Hoy</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;