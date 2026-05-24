import type { Producto } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  productos: Producto[];
}

export function ProductGrid({ productos }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  );
}
