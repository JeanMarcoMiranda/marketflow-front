import type { Product } from "@/api/types/response.types";
import { Button } from "@/components/ui/button";
import { useProductSearch } from "@/hooks/use-product-search";
import { mockProducts } from "@/lib/dummy-data/mock-products";
import { Search, Scan } from "lucide-react";

const ProductSearch = ({ onProductSelect, onBarcodeScan }: {
  onProductSelect: (product: Product) => void;
  onBarcodeScan: () => void;
}) => {
  const { searchTerm, setSearchTerm, suggestions, showSuggestions, setShowSuggestions } = useProductSearch(mockProducts);

  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay to allow click on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative">
      <div className="flex gap-3">
        {/* Input de búsqueda */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar productos por nombre o SKU..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />

          {/* Sugerencias */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-slate-600 truncate">
                        {product.description}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        SKU: {product.sku}
                      </p>
                    </div>
                    <div className="text-right ml-3">
                      <span className="font-medium text-slate-900">
                        S/. {product.unit_price.toFixed(2)}
                      </span>
                      <p className="text-xs text-slate-500">
                        {product.unit_of_measure}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón de escáner */}
        <Button
          onClick={onBarcodeScan}
          variant="outline"
          className="px-4 py-3 border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <Scan className="w-4 h-4 mr-2" />
          Escanear
        </Button>
      </div>
    </div>
  );
};

export default ProductSearch;