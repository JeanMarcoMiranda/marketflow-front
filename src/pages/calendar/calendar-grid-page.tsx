
import React from 'react';
import { AlertCircle, CheckCircle, Clock, RefreshCw, TrendingUp } from 'lucide-react';
import CalendarGrid from '@/components/features/calendar/calendar-grid';
import CalendarHeader from '@/components/features/calendar/calendar-header';
import { useCalendar } from '@/hooks/use-calendar';
import { useOrders } from '@/hooks/use-orders';
import StatsCard from '@/components/features/calendar/calendar-stats-card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const CalendarGridPage: React.FC = () => {
  const { orders, loading, error, refreshOrders } = useOrders();
  const {
    currentDate,
    calendarDates,
    navigateMonth,
    goToToday,
    setMonth,
    setYear
  } = useCalendar(orders);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <CardTitle className="text-xl">Error al cargar datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={refreshOrders} className="w-full" size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-fit bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header del calendario */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <CalendarHeader
              currentDate={currentDate}
              onNavigateMonth={navigateMonth}
              onGoToToday={goToToday}
              onSetMonth={setMonth}
              onSetYear={setYear}
            />
          </CardContent>
        </Card>

        {/* Grid del calendario */}
        <Card className="border-0 shadow-md p-0">
          <CardContent className="p-0">
            <CalendarGrid
              calendarDates={calendarDates}
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Estadísticas mejoradas */}
        {!loading && orders.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              title="Total"
              value={orders.length}
              icon={<TrendingUp className="w-4 h-4" />}
              variant="default"
            />
            <StatsCard
              title="Pendientes"
              value={orders.filter(o => o.status === 'Pendiente').length}
              icon={<Clock className="w-4 h-4" />}
              variant="warning"
            />
            <StatsCard
              title="Enviadas"
              value={orders.filter(o => o.status === 'Enviado').length}
              icon={<RefreshCw className="w-4 h-4" />}
              variant="info"
            />
            <StatsCard
              title="Completadas"
              value={orders.filter(o => o.status === 'Recibido').length}
              icon={<CheckCircle className="w-4 h-4" />}
              variant="success"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarGridPage;