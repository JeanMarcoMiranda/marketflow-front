import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, RotateCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonthYear } from '@/api/types/orders.types';
import { Button } from '@/components/ui/button';

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
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigateMonth('prev')}
          className="h-9 w-9"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center space-x-2">
          <Select value={currentDate.month.toString()} onValueChange={(value) => onSetMonth(parseInt(value))}>
            <SelectTrigger className="w-32 border-0 text-lg font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={currentDate.year.toString()} onValueChange={(value) => onSetYear(parseInt(value))}>
            <SelectTrigger className="w-20 border-0 text-lg font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigateMonth('next')}
          className="h-9 w-9"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <h1 className="text-lg font-semibold">Calendario de Órdenes</h1>
        </div>
        <Button variant="outline" onClick={onGoToToday} size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Hoy
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;