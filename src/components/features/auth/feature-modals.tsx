import {
  ShoppingCart,
  TrendingUp,
  Package,
  CreditCard,
  FileText,
  Check,
  BarChart3,
} from "lucide-react";

export function VentasModalContent() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <ShoppingCart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            Módulo de Ventas
          </h3>
          <p className="text-sm text-muted-foreground">
            Sistema completo de punto de venta
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">
              Procesamiento rápido de transacciones
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">Gestión eficiente de pedidos</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">
              Control de inventario en tiempo real
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">Impresión automática de recibos</span>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Pagos</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Inventario</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Recibos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReportesModalContent() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            Reportes y Analytics
          </h3>
          <p className="text-sm text-muted-foreground">
            Análisis completo de tu negocio
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">
              Reportes de ventas diarias, semanales y mensuales
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">Análisis de productos más vendidos</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">Gráficos interactivos y exportación</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">Alertas de stock bajo y tendencias</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Dashboard en tiempo real
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Visualiza el rendimiento de tu minimarket con métricas actualizadas
            al instante
          </p>
        </div>
      </div>
    </div>
  );
}
