import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PageWrapper } from "@/shared/layout/PageWrapper";
import HomePage from "@/features/catalog/pages/HomePage";
import ProductPage from "@/features/catalog/pages/ProductPage";
import CartPage from "@/features/cart/pages/CartPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos/:id" element={<ProductPage />} />
          <Route path="/pedidos" element={<OrdersPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
