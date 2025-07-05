import type { Order } from '@/api/types/orders.types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/date-utils';
import { Separator } from '@radix-ui/react-separator';
import { CalendarDays, Package, Truck } from 'lucide-react';
import OrderTooltipDetailCard from './order-tooltip-detail-card';
import { Badge } from '@/components/ui/badge';

interface OrderTooltipProps {
  orders: Order[];
  date: Date;
}

const OrderTooltip: React.FC<OrderTooltipProps> = ({ orders, date }) => {
  const dateStr = formatDate(date);

  const requestOrders = orders.filter(order => order.request_date === dateStr);
  const deliveryOrders = orders.filter(order => order.delivery_date === dateStr);

  if (orders.length === 0) return null;

  return (
    <Card className="w-96 max-w-sm shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-blue-600" />
          Órdenes del {date.toLocaleDateString('es-PE')}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {requestOrders.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-sm text-gray-800">
                Fechas de solicitud
              </h4>
              <Badge variant="secondary" className="ml-auto">
                {requestOrders.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {requestOrders.map(order => (
                <OrderTooltipDetailCard key={`req-${order.id}`} order={order} type="request" />
              ))}
            </div>
          </div>
        )}

        {deliveryOrders.length > 0 && (
          <div>
            {requestOrders.length > 0 && <Separator className="my-4" />}
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-sm text-gray-800">
                Fechas de entrega
              </h4>
              <Badge variant="secondary" className="ml-auto">
                {deliveryOrders.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {deliveryOrders.map(order => (
                <OrderTooltipDetailCard key={`del-${order.id}`} order={order} type="delivery" />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTooltip;