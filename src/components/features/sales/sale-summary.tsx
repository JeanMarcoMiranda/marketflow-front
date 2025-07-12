import { Receipt, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Tipo para el resumen de venta
interface SaleSummary {
  items_count: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

const SaleSummary = ({ summary, onCompleteSale, onClearSale, isCompleting }: {
  summary: SaleSummary;
  onCompleteSale: () => void;
  onClearSale: () => void;
  isCompleting?: boolean;
}) => {
  const hasItems = summary.items_count > 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Receipt className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-foreground">Resumen de venta</h3>
      </div>

      {/* Desglose de costos */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Artículos ({summary.items_count})
          </span>
          <span className="text-foreground">
            S/. {summary.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Impuestos (18%)</span>
          <span className="text-foreground">
            S/. {summary.tax.toFixed(2)}
          </span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Descuentos</span>
            <span className="text-discount font-medium">
              -S/. {summary.discount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="font-medium text-foreground">Total</span>
            <span className="text-2xl font-semibold text-price">
              S/. {summary.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="space-y-3">
        {/* Completar venta */}
        <Button
          onClick={onCompleteSale}
          disabled={!hasItems || isCompleting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
        >
          {isCompleting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Receipt className="w-4 h-4 mr-2" />
              Completar venta
            </>
          )}
        </Button>

        {/* Limpiar venta */}
        <Button
          onClick={onClearSale}
          disabled={!hasItems || isCompleting}
          variant="outline"
          className="w-full border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Limpiar venta
        </Button>
      </div>

      {/* Mensaje de estado */}
      {!hasItems && (
        <p className="text-center text-xs text-muted-foreground mt-4">
          Agrega productos para continuar
        </p>
      )}
    </div>
  );
};

export default SaleSummary;