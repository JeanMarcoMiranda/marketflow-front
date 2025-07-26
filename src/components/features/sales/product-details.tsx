import type { SaleItem } from "@/api/types/response.types"
import { Package, Info, Calendar, Hash, Ruler, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const ProductDetails = ({ selectedItem }: { selectedItem: SaleItem | null }) => {
  if (!selectedItem) {
    return (
      <div className="bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 bg-gradient-to-r from-card to-card/95">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-info/10 border border-info/20">
              <Info className="w-4 h-4 text-info" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Detalles del Producto</h3>
              <p className="text-xs text-muted-foreground">Información detallada</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/60 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm">
              <Package className="w-8 h-8 text-muted-foreground/60" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Sin producto seleccionado</h4>
            <p className="text-muted-foreground text-sm">
              Selecciona un producto del carrito para ver sus detalles completos
            </p>
          </div>
        </div>
      </div>
    )
  }

  const isExpiringSoon =
    selectedItem.product.expiration_date &&
    new Date(selectedItem.product.expiration_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  return (
    <div className="bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-card to-card/95">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-info/10 border border-info/20">
            <Info className="w-4 h-4 text-info" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Detalles del Producto</h3>
            <p className="text-xs text-muted-foreground">Información completa</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Información principal */}
        <div className="space-y-3">
          <div>
            <h4 className="text-lg font-semibold text-foreground leading-tight">{selectedItem.product.name}</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{selectedItem.product.description}</p>
          </div>

          {/* Badges de estado */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              En venta
            </Badge>
            {isExpiringSoon && (
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                Próximo a vencer
              </Badge>
            )}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Información técnica en grid mejorado */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 p-3 bg-muted/20 rounded-lg border border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">SKU</span>
            </div>
            <p className="font-mono text-sm font-semibold text-foreground">{selectedItem.product.sku}</p>
          </div>

          <div className="space-y-2 p-3 bg-muted/20 rounded-lg border border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ruler className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Unidad</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{selectedItem.product.unit_of_measure}</p>
          </div>

          <div className="space-y-2 p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="flex items-center gap-2 text-success">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Precio Unit.</span>
            </div>
            <p className="text-lg font-bold text-success">S/. {selectedItem.unit_price.toFixed(2)}</p>
          </div>

          <div className="space-y-2 p-3 bg-info/5 rounded-lg border border-info/20">
            <div className="flex items-center gap-2 text-info">
              <Package className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Cantidad</span>
            </div>
            <p className="text-lg font-bold text-info">{selectedItem.quantity}</p>
          </div>

          <div className="space-y-2 p-3 bg-muted/20 rounded-lg border border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Lote</span>
            </div>
            <p className="font-mono text-sm font-semibold text-foreground">
              {selectedItem.product.batch_number || "N/A"}
            </p>
          </div>

          <div className="space-y-2 p-3 bg-muted/20 rounded-lg border border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Vencimiento</span>
            </div>
            <p className={`text-sm font-semibold ${isExpiringSoon ? "text-warning" : "text-foreground"}`}>
              {selectedItem.product.expiration_date || "N/A"}
            </p>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Total destacado */}
        <div className="bg-gradient-to-r from-success/5 to-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-foreground">Total del Producto</span>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedItem.quantity} × S/. {selectedItem.unit_price.toFixed(2)}
              </p>
            </div>
            <span className="text-2xl font-bold text-success">S/. {selectedItem.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
