import { MonthYear, Order } from '@/api/types/orders.types';
import { generateCalendarDates } from '@/lib/date-utils';
import { useState, useMemo } from 'react';

export const useCalendar = (orders: Order[]) => {
  const [currentDate, setCurrentDate] = useState<MonthYear>(() => {
    const now = new Date();
    return {
      month: now.getMonth(),
      year: now.getFullYear()
    };
  });

  const calendarDates = useMemo(() => {
    return generateCalendarDates(currentDate.month, currentDate.year, orders);
  }, [currentDate.month, currentDate.year, orders]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      if (direction === 'prev') {
        return prev.month === 0
          ? { month: 11, year: prev.year - 1 }
          : { month: prev.month - 1, year: prev.year };
      } else {
        return prev.month === 11
          ? { month: 0, year: prev.year + 1 }
          : { month: prev.month + 1, year: prev.year };
      }
    });
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentDate({
      month: now.getMonth(),
      year: now.getFullYear()
    });
  };

  const setMonth = (month: number) => {
    setCurrentDate(prev => ({ ...prev, month }));
  };

  const setYear = (year: number) => {
    setCurrentDate(prev => ({ ...prev, year }));
  };

  return {
    currentDate,
    calendarDates,
    navigateMonth,
    goToToday,
    setMonth,
    setYear
  };
};