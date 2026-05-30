import { useState } from "react";
import { Search, UtensilsCrossed } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { CategoryFilter } from "../components/CategoryFilter";
import { ProductGrid } from "../components/ProductGrid";
import { Spinner } from "@/shared/ui/Spinner";
import { Input } from "@/shared/ui/Input";
import { useDebounce } from "../hooks/useDebounce";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: categoryData } = useCategories();
  const { data: productData, isLoading } = useProducts({
    categoria_id: selectedCategory ?? undefined,
    q: debouncedSearch || undefined,
    disponible: true,
  });

  const categories = categoryData?.items ?? [];
  const productos = productData?.items ?? [];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 md:p-8 text-white min-h-[180px] flex items-center">
        <div className="relative z-10 max-w-xs">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
            Deliciosa comida,<br />entregada rápido
          </h1>
          <p className="text-sm text-gray-300 mb-4">
            Pide tus platillos favoritos y disfrútalos en casa.
          </p>
          <button
            onClick={() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          >
            Ordenar ahora
          </button>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 select-none pointer-events-none">
          <UtensilsCrossed className="w-28 h-28 text-white" />
        </div>
      </div>

      {/* Search */}
      <Input
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search className="w-4 h-4 text-gray-400" />}
      />

      {/* Categorías */}
      {categories.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">Categorías</h2>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </section>
      )}

      {/* Productos */}
      <section id="productos">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          {selectedCategory ? "Productos" : "Populares"}
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : productos.length === 0 ? (
          <div className="py-12 text-center">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No se encontraron productos</p>
          </div>
        ) : (
          <ProductGrid productos={productos} />
        )}
      </section>
    </div>
  );
}
