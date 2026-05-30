import { Home, ClipboardList, ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "@/modules/cart/stores/useCartStore";
import { Badge } from "@/shared/ui/Badge";

export function BottomNav() {
  const count = useCartStore((s) => s.count());
  const navigate = useNavigate();

  const base = "flex flex-col items-center gap-0.5 flex-1 py-2.5 text-xs font-medium transition";
  const active = "text-indigo-600";
  const inactive = "text-gray-500";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex md:hidden z-30">
      <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <Home className="w-6 h-6" />
        Inicio
      </NavLink>
      <NavLink
        to="/pedidos"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <ClipboardList className="w-6 h-6" />
        Mis pedidos
      </NavLink>
      <button
        onClick={() => navigate("/cart")}
        className={`${base} ${inactive} relative`}
      >
        <span className="relative">
          <ShoppingCart className="w-6 h-6" />
          <Badge count={count} />
        </span>
        Carrito
      </button>
    </nav>
  );
}
