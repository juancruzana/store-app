import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { BottomNav } from "./BottomNav";
import { CartDrawer } from "@/modules/cart/components/CartDrawer";

export function PageWrapper() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="md:ml-64 px-4 py-5 md:px-8 pb-24 md:pb-8 max-w-5xl">
        <Outlet />
      </main>
      <BottomNav />
      <CartDrawer />
    </div>
  );
}
