import type { Order } from "@/api/types/orders.types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Package, Truck, MapPin, CalendarDays, Clock, Send, CheckCircle, XCircle } from "lucide-react";

const OrderTooltipDetailCard = ({ order, type }: { order: Order; type: 'request' | 'delivery' }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'Pendiente':
        return {
          variant: 'secondary' as const,
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: Clock,
          iconColor: 'text-amber-600'
        };
      case 'Enviado':
        return {
          variant: 'default' as const,
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Send,
          iconColor: 'text-blue-600'
        };
      case 'Recibido':
        return {
          variant: 'default' as const,
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: CheckCircle,
          iconColor: 'text-emerald-600'
        };
      case 'Cancelado':
        return {
          variant: 'destructive' as const,
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      default:
        return {
          variant: 'outline' as const,
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Package,
          iconColor: 'text-gray-600'
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const isRequest = type === 'request';
  const StatusIcon = statusConfig.icon;

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${isRequest
      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
      : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200'
      }`}>
      <CardContent className="px-4">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${isRequest ? 'bg-blue-100' : 'bg-emerald-100'}`}>
              {isRequest ? <Package className="h-4 w-4 text-blue-600" /> : <Truck className="h-4 w-4 text-emerald-600" />}
            </div>
            <div>
              <h5 className="font-semibold text-sm text-gray-900">
                Orden #{order.id}
              </h5>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={statusConfig.color}>
                  <StatusIcon className={`mr-1.5 h-3 w-3 ${statusConfig.iconColor}`} />
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Package className="h-3 w-3" />
              Cantidad:
            </span>
            <span className="font-medium text-gray-900">{order.total_quantity}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold text-gray-900">{formatCurrency(order.total_cost)}</span>
          </div>

          {isRequest && order.delivery_date && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Entrega:
              </span>
              <span className="text-gray-700">
                {new Date(order.delivery_date).toLocaleDateString('es-PE')}
              </span>
            </div>
          )}

          {!isRequest && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                Solicitado:
              </span>
              <span className="text-gray-700">
                {new Date(order.request_date).toLocaleDateString('es-PE')}
              </span>
            </div>
          )}
        </div>

        {order.notes && (
          <>
            <Separator className="my-3" />
            <div className="bg-white/60 rounded-md p-2 border border-gray-200">
              <p className="text-xs text-gray-600 italic leading-relaxed">
                💬 {order.notes}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTooltipDetailCard;