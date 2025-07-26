import { Receipt, Loader2, Trash2, Calculator, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface SaleSummary {
  items_count: number
  subtotal: number
  tax: number
  discount: number
  total: number
}

const SaleSummary = ({
  summary,
  onCompleteSale,
  onClearSale,
  isCompleting,
}: {
  summary: SaleSummary
  onCompleteSale: () => void
  onClearSale: () => void
  isCompleting?: boolean
}) => {
  const hasItems = summary.items_count > 0
  const taxPercentage = summary.subtotal > 0 ? (summary.tax / summary.subtotal) * 100 : 18

  return (
    <div className="bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">
      {/* Header mejorado */}
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-card to-card/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10 border border-success/20">
              <Receipt className="w-4 h-4 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Resumen de Venta</h3>
              <p className="text-xs text-muted-foreground">
                {hasItems ? `${summary.items_count} artículos` : "Sin productos"}
              </p>
            </div>
          </div>
          {hasItems && (
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              Activa
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Desglose de costos mejorado */}
        <div className="space-y-4 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Subtotal ({summary.items_count} {summary.items_count === 1 ? "artículo" : "artículos"})
                </span>
              </div>
              <span className="font-medium text-foreground">S/. {summary.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">IGV ({taxPercentage.toFixed(0)}%)</span>
                <Badge variant="outline" className="text-xs bg-info/10 text-info border-info/30">
                  Incluido
                </Badge>
              </div>
              <span className="font-medium text-foreground">S/. {summary.tax.toFixed(2)}</span>
            </div>

            {summary.discount > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Descuentos aplicados</span>
                <span className="font-semibold text-discount">-S/. {summary.discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <Separator className="bg-border/50" />

          {/* Total destacado */}
          <div className="bg-gradient-to-r from-success/5 to-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-foreground">Total a Pagar</span>
                <p className="text-xs text-muted-foreground mt-1">Incluye todos los impuestos</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-success">S/. {summary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción mejorados */}
        <div className="space-y-3">
          <Button
            onClick={onCompleteSale}
            disabled={!hasItems || isCompleting}
            className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-semibold transition-all duration-200 hover:shadow-md disabled:opacity-50"
          >
            {isCompleting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Procesando venta...
              </>
            ) : (
              <>
                <Receipt className="w-5 h-5 mr-2" />
                Completar Venta
              </>
            )}
          </Button>

          <Button
            onClick={onClearSale}
            disabled={!hasItems || isCompleting}
            variant="outline"
            className="w-full h-10 border-border/60 text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-border transition-all duration-200 bg-transparent"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpiar Carrito
          </Button>
        </div>

        {/* Mensaje de estado mejorado */}
        {!hasItems && (
          <div className="text-center mt-6 p-4 bg-muted/30 rounded-lg border border-dashed border-border/60">
            <p className="text-sm text-muted-foreground">Agrega productos para continuar con la venta</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SaleSummary
