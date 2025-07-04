// src/utils/dateUtils.ts

import { CalendarDate, Order } from "@/api/types/orders.types";

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

export const getMonthName = (month: number): string => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[month];
};

export const generateCalendarDates = (
  month: number,
  year: number,
  orders: Order[]
): CalendarDate[] => {
  const firstDay = getFirstDayOfMonth(month, year);
  const daysInMonth = getDaysInMonth(month, year);
  const daysInPrevMonth = getDaysInMonth(month - 1 < 0 ? 11 : month - 1, month - 1 < 0 ? year - 1 : year);

  const dates: CalendarDate[] = [];

  // Días del mes anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, daysInPrevMonth - i);
    dates.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      orders: getOrdersForDate(date, orders)
    });
  }

  // Días del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    dates.push({
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      orders: getOrdersForDate(date, orders)
    });
  }

  // Días del mes siguiente para completar la grilla
  const remainingDays = 42 - dates.length; // 6 semanas × 7 días
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, day);
    dates.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      orders: getOrdersForDate(date, orders)
    });
  }

  return dates;
};

export const getOrdersForDate = (date: Date, orders: Order[]): Order[] => {
  const dateStr = formatDate(date);
  return orders.filter(order =>
    order.request_date === dateStr || order.delivery_date === dateStr
  );
};

export const getOrderStatusColor = (status: Order['status']): string => {
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