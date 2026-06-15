import { UtensilsCrossed, Home, ClipboardList, ShoppingCart, LogIn, LogOut, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "@/modules/cart/stores/useCartStore";
import { useCartDrawerStore } from "@/modules/cart/stores/useCartDrawerStore";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { Badge } from "@/shared/ui/Badge";

export function Navbar() {
  const count = useCartStore((s) => s.count());
  const { toggle } = useCartDrawerStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
      isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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
        {isAuthenticated && (
          <NavLink to="/cuenta" className={linkClass}>
            <User className="w-5 h-5" />
            Mi cuenta
          </NavLink>
        )}
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

      {/* User section */}
      <div className="px-3 py-4 border-t border-gray-100">
        {isAuthenticated && user ? (
          <div className="space-y-2">
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-gray-900 truncate">
                {user.nombre} {user.apellido}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              Salir
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition"
          >
            <LogIn className="w-5 h-5" />
            Ingresar
          </NavLink>
        )}
      </div>
    </aside>
  );
}
