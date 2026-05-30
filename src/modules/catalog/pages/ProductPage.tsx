import { useState } from "react";
import { ArrowLeft, Utensils, AlertTriangle, ShoppingCart } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct, useProducts } from "../hooks/useProducts";
import { useCartStore } from "@/modules/cart/stores/useCartStore";
import { useCartDrawerStore } from "@/modules/cart/stores/useCartDrawerStore";
import { formatPrice } from "@/utils/formatPrice";
import { Spinner } from "@/shared/ui/Spinner";
import { ProductCard } from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: producto, isLoading } = useProduct(Number(id));
  const { data: relatedData } = useProducts({ size: 5 });
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartDrawerStore((s) => s.open);
  const [cantidad, setCantidad] = useState(1);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="text-center py-20 text-gray-400">Producto no encontrado</div>
    );
  }

  const related = (relatedData?.items ?? [])
    .filter((p) => p.id !== producto.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(
      {
        producto_id: producto.id,
        nombre: producto.nombre,
        precio: parseFloat(producto.precio),
        imagen_url: producto.imagen_url,
      },
      cantidad
    );
    openCart();
  };

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square flex items-center justify-center">
          {producto.imagen_url ? (
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="h-full w-full object-cover"
            />
          ) : (
            <Utensils className="w-20 h-20 text-gray-300" />
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            {producto.categoria && (
              <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                {producto.categoria.nombre}
              </span>
            )}
            <h1 className="text-2xl font-bold text-gray-900">{producto.nombre}</h1>
            {producto.descripcion && (
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                {producto.descripcion}
              </p>
            )}
          </div>

          <p className="text-3xl font-bold text-indigo-600">{formatPrice(producto.precio)}</p>

          {/* Ingredientes */}
          {producto.ingredientes.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Ingredientes</h3>
              <div className="flex flex-wrap gap-1.5">
                {producto.ingredientes.map((ing) => (
                  <span
                    key={ing.ingrediente_id}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      ing.es_alergeno
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {ing.nombre}
                    {ing.es_alergeno && <AlertTriangle className="w-3 h-3 inline ml-1" />}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Cantidad</span>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center font-bold transition"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold text-gray-900">{cantidad}</span>
              <button
                onClick={() => setCantidad((c) => c + 1)}
                className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center font-bold transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Botón agregar */}
          <button
            disabled={!producto.disponible}
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar al carrito — {formatPrice(parseFloat(producto.precio) * cantidad)}
          </button>

          {!producto.disponible && (
            <p className="text-center text-sm text-red-500">No disponible en este momento</p>
          )}
        </div>
      </div>

      {/* También te puede gustar */}
      {related.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">También te puede gustar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
