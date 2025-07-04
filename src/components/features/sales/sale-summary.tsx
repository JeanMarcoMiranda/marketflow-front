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
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Receipt className="w-5 h-5 text-slate-600" />
        <h3 className="font-medium text-slate-900">Resumen de venta</h3>
      </div>

      {/* Desglose de costos */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            Artículos ({summary.items_count})
          </span>
          <span className="text-slate-900">
            S/. {summary.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Impuestos (18%)</span>
          <span className="text-slate-900">
            S/. {summary.tax.toFixed(2)}
          </span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Descuentos</span>
            <span className="text-emerald-600">
              -S/. {summary.discount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="pt-3 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-900">Total</span>
            <span className="text-2xl font-semibold text-slate-900">
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
          className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-colors"
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
          className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Limpiar venta
        </Button>
      </div>

      {/* Mensaje de estado */}
      {!hasItems && (
        <p className="text-center text-xs text-slate-500 mt-4">
          Agrega productos para continuar
        </p>
      )}
    </div>
  );
};

export default SaleSummary;