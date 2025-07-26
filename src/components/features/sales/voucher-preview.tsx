import type { SaleItem, SaleSummary } from "@/api/types/response.types"
import { X, Receipt, MapPin, Phone, Calendar, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const VoucherPreview = ({
  items,
  summary,
  onClose,
}: {
  items: SaleItem[]
  summary: SaleSummary
  onClose: () => void
}) => {
  const currentDate = new Date()
  const voucherNumber = `V${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, "0")}${String(currentDate.getDate()).padStart(2, "0")}-${Math.floor(
    Math.random() * 10000,
  )
    .toString()
    .padStart(4, "0")}`

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-card border border-border/60 rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header del comprobante */}
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-card to-card/95">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-success/10 border border-success/20">
                <Receipt className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Comprobante de Venta</h2>
                <p className="text-sm text-muted-foreground">Boleta de venta electrónica</p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 p-0 rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Información del negocio */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-primary">🏪 Mi Minimarket</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Av. Principal 123, Lima - Perú</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Tel: (01) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Información de la venta */}
            <div className="bg-muted/20 rounded-lg p-4 border border-border/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Hash className="w-4 h-4" />
                    <span className="font-medium">N° Comprobante</span>
                  </div>
                  <p className="font-mono font-semibold text-foreground">{voucherNumber}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Fecha</span>
                  </div>
                  <p className="font-semibold text-foreground">
                    {currentDate.toLocaleDateString("es-PE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de productos */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">Productos</h4>
                <Badge variant="secondary" className="bg-info/10 text-info border-info/20">
                  {items.length} {items.length === 1 ? "producto" : "productos"}
                </Badge>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={item.id} className="bg-muted/10 rounded-lg p-3 border border-border/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-foreground truncate leading-tight">{item.product.name}</h5>
                        <p className="text-xs text-muted-foreground mt-1">SKU: {item.product.sku}</p>
                      </div>
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20 ml-2">
                        #{index + 1}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity} × S/. {item.unit_price.toFixed(2)}
                      </span>
                      <span className="font-bold text-success">S/. {item.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Resumen de costos */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Resumen</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium text-foreground">S/. {summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IGV (18%):</span>
                  <span className="font-medium text-foreground">S/. {summary.tax.toFixed(2)}</span>
                </div>
                {summary.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Descuentos:</span>
                    <span className="font-semibold text-discount">-S/. {summary.discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Separator className="bg-border/50" />

              {/* Total final */}
              <div className="bg-gradient-to-r from-success/5 to-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">TOTAL A PAGAR:</span>
                  <span className="text-2xl font-bold text-success">S/. {summary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Mensaje de agradecimiento */}
            <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
              <h5 className="font-semibold text-primary mb-2">¡Gracias por su compra! 🎉</h5>
              <p className="text-sm text-muted-foreground">Esperamos verle pronto en nuestro minimarket</p>
              <p className="text-xs text-muted-foreground mt-2">Conserve este comprobante para cualquier reclamo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoucherPreview
