import { UtensilsCrossed, Home, ClipboardList, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCartStore } from "@/modules/cart/stores/useCartStore";
import { useCartDrawerStore } from "@/modules/cart/stores/useCartDrawerStore";
import { Badge } from "@/shared/ui/Badge";

export function Navbar() {
  const count = useCartStore((s) => s.count());
  const { toggle } = useCartDrawerStore();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
      isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex-col z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <UtensilsCrossed className="w-6 h-6 text-indigo-600" />
          <span className="text-lg font-bold text-gray-900">FoodStore</span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavLink to="/" end className={linkClass}>
          <Home className="w-5 h-5" />
          Inicio
        </NavLink>
        <NavLink to="/pedidos" className={linkClass}>
          <ClipboardList className="w-5 h-5" />
          Mis pedidos
        </NavLink>
        <button
          onClick={toggle}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          <span className="relative">
            <ShoppingCart className="w-5 h-5" />
            <Badge count={count} />
          </span>
          Carrito
          {count > 0 && (
            <span className="ml-auto bg-indigo-600 text-white text-xs font-bold rounded-full px-2 py-0.5 leading-none">
              {count}
            </span>
          )}
        </button>
      </nav>
    </aside>
  );
}
